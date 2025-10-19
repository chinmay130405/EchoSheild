"""
EchoSheild FastAPI Backend
Real-time misinformation detection and verification platform
"""

from fastapi import FastAPI, HTTPException, Query
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional
from datetime import datetime, timedelta
import random
import uvicorn
import sqlite3
from pathlib import Path

app = FastAPI(
    title="EchoSheild API",
    description="Misinformation Detection & Verification API",
    version="1.0.0"
)

# CORS Configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Database setup
DB_PATH = Path("echosheild.db")

def init_db():
    """Initialize SQLite database with tables"""
    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()
    
    # Claims table
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS claims (
            id INTEGER PRIMARY KEY,
            claim TEXT NOT NULL,
            source TEXT,
            timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
            trust_score INTEGER,
            status TEXT,
            category TEXT,
            engagement INTEGER
        )
    ''')
    
    # Verification results table
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS verifications (
            id INTEGER PRIMARY KEY,
            claim_id INTEGER,
            verification_method TEXT,
            details TEXT,
            verified_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY(claim_id) REFERENCES claims(id)
        )
    ''')
    
    # Summaries table
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS summaries (
            id INTEGER PRIMARY KEY,
            claim_id INTEGER,
            summary TEXT,
            language TEXT DEFAULT 'en',
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY(claim_id) REFERENCES claims(id)
        )
    ''')
    
    conn.commit()
    conn.close()

# Initialize DB on startup
init_db()

# Data Models
class Claim(BaseModel):
    """Claim model"""
    id: int
    claim: str
    source: str
    timestamp: str
    trust_score: int
    status: str
    category: str
    engagement: int
    verified: bool = True

class VerificationResult(BaseModel):
    """Verification result model"""
    claim_id: int
    verification_method: str
    details: str
    verified_sources: List[str]

class Summary(BaseModel):
    """Summary model"""
    claim_id: int
    summary: str
    language: str = "en"

class ClaimResponse(BaseModel):
    """Response model for claims"""
    id: int
    claim: str
    source: str
    timestamp: str
    trust_score: int
    status: str
    category: str
    engagement: int

# Mock data - simulates live claims stream
MOCK_CLAIMS = [
    {
        "id": 1,
        "claim": "A new vaccine causes autism spectrum disorders",
        "source": "Twitter",
        "timestamp": (datetime.now() - timedelta(minutes=10)).isoformat(),
        "trust_score": 8,
        "status": "MISINFORMATION",
        "category": "Health",
        "engagement": 15234
    },
    {
        "id": 2,
        "claim": "Renewable energy can meet 100% of global electricity demand by 2030",
        "source": "News Article",
        "timestamp": (datetime.now() - timedelta(minutes=25)).isoformat(),
        "trust_score": 62,
        "status": "PARTIALLY_TRUE",
        "category": "Environment",
        "engagement": 8923
    },
    {
        "id": 3,
        "claim": "5G technology causes COVID-19 infections",
        "source": "Facebook",
        "timestamp": (datetime.now() - timedelta(minutes=45)).isoformat(),
        "trust_score": 5,
        "status": "MISINFORMATION",
        "category": "Technology",
        "engagement": 42156
    },
    {
        "id": 4,
        "claim": "AI models can now pass medical licensing exams at expert level",
        "source": "Research Paper",
        "timestamp": (datetime.now() - timedelta(minutes=60)).isoformat(),
        "trust_score": 78,
        "status": "TRUE",
        "category": "Technology",
        "engagement": 3421
    },
]

VERIFICATION_SOURCES = [
    "World Health Organization (WHO)",
    "Centers for Disease Control (CDC)",
    "Reuters Fact-Check",
    "AP Fact-Check",
    "PolitiFact",
    "Snopes",
    "FactCheck.org",
    "Government Public Information Bureau"
]

# Routes

@app.get("/health")
async def health_check():
    """Health check endpoint"""
    return {"status": "healthy", "service": "EchoSheild API", "version": "1.0.0"}

@app.get("/claims", response_model=List[ClaimResponse])
async def get_claims(skip: int = Query(0, ge=0), limit: int = Query(10, ge=1, le=100)):
    """
    Get all claims with optional pagination
    
    Args:
        skip: Number of claims to skip
        limit: Maximum number of claims to return
    
    Returns:
        List of claims
    """
    return MOCK_CLAIMS[skip:skip + limit]

@app.get("/claims/{claim_id}", response_model=ClaimResponse)
async def get_claim(claim_id: int):
    """
    Get a specific claim by ID
    
    Args:
        claim_id: ID of the claim
    
    Returns:
        Claim details
    """
    for claim in MOCK_CLAIMS:
        if claim["id"] == claim_id:
            return claim
    raise HTTPException(status_code=404, detail="Claim not found")

@app.post("/claims")
async def create_claim(claim: dict):
    """
    Create a new claim (mock)
    
    Args:
        claim: Claim data
    
    Returns:
        Created claim with ID
    """
    new_id = max([c["id"] for c in MOCK_CLAIMS]) + 1
    new_claim = {
        "id": new_id,
        "claim": claim.get("claim", ""),
        "source": claim.get("source", "Unknown"),
        "timestamp": datetime.now().isoformat(),
        "trust_score": random.randint(20, 95),
        "status": random.choice(["TRUE", "MISINFORMATION", "PARTIALLY_TRUE"]),
        "category": claim.get("category", "Other"),
        "engagement": random.randint(100, 50000)
    }
    MOCK_CLAIMS.append(new_claim)
    return new_claim

@app.post("/verify/{claim_id}")
async def verify_claim(claim_id: int, verification: VerificationResult):
    """
    Verify a claim using multiple sources
    
    Args:
        claim_id: ID of the claim to verify
        verification: Verification data
    
    Returns:
        Verification result
    """
    claim = None
    for c in MOCK_CLAIMS:
        if c["id"] == claim_id:
            claim = c
            break
    
    if not claim:
        raise HTTPException(status_code=404, detail="Claim not found")
    
    return {
        "claim_id": claim_id,
        "claim_text": claim["claim"],
        "verification_method": verification.verification_method,
        "details": verification.details,
        "verified_sources": verification.verified_sources,
        "trust_score": claim["trust_score"],
        "status": claim["status"],
        "verified_at": datetime.now().isoformat()
    }

@app.get("/summaries/{claim_id}")
async def get_summary(claim_id: int, language: str = Query("en")):
    """
    Get AI-generated summary for a claim
    
    Args:
        claim_id: ID of the claim
        language: Language code for the summary
    
    Returns:
        Summary text
    """
    claim = None
    for c in MOCK_CLAIMS:
        if c["id"] == claim_id:
            claim = c
            break
    
    if not claim:
        raise HTTPException(status_code=404, detail="Claim not found")
    
    # Mock LLM summary generation
    summary_dict = {
        "en": f"Claim Analysis: The statement '{claim['claim']}' has been analyzed using multiple verification sources. Status: {claim['status']}. Trust Score: {claim['trust_score']}/100.",
        "es": f"Análisis de Reclamación: La declaración '{claim['claim']}' ha sido analizada usando múltiples fuentes de verificación. Estado: {claim['status']}.",
        "fr": f"Analyse de Réclamation: L'énoncé '{claim['claim']}' a été analysé à l'aide de plusieurs sources de vérification. Statut: {claim['status']}.",
        "hi": f"दावा विश्लेषण: कथन '{claim['claim']}' का विश्लेषण कई सत्यापन स्रोतों का उपयोग करके किया गया है। स्थिति: {claim['status']}।"
    }
    
    return {
        "claim_id": claim_id,
        "summary": summary_dict.get(language, summary_dict["en"]),
        "language": language,
        "created_at": datetime.now().isoformat()
    }

@app.get("/trends")
async def get_trending():
    """
    Get trending claims and topics
    
    Returns:
        List of trending claims sorted by engagement
    """
    sorted_claims = sorted(MOCK_CLAIMS, key=lambda x: x["engagement"], reverse=True)
    return {
        "trending": sorted_claims[:5],
        "total_claims": len(MOCK_CLAIMS),
        "timestamp": datetime.now().isoformat()
    }

@app.get("/stats")
async def get_stats():
    """
    Get platform statistics
    
    Returns:
        Statistics about claims, verification, and misinformation
    """
    total = len(MOCK_CLAIMS)
    verified = sum(1 for c in MOCK_CLAIMS if c["status"] == "TRUE")
    misinformation = sum(1 for c in MOCK_CLAIMS if c["status"] == "MISINFORMATION")
    partial = sum(1 for c in MOCK_CLAIMS if c["status"] == "PARTIALLY_TRUE")
    avg_trust = sum(c["trust_score"] for c in MOCK_CLAIMS) // total if total > 0 else 0
    
    return {
        "total_claims": total,
        "verified_true": verified,
        "misinformation": misinformation,
        "partially_true": partial,
        "average_trust_score": avg_trust,
        "timestamp": datetime.now().isoformat()
    }

@app.get("/sources")
async def get_verification_sources():
    """
    Get list of trusted verification sources
    
    Returns:
        List of verification sources
    """
    return {
        "sources": VERIFICATION_SOURCES,
        "total": len(VERIFICATION_SOURCES)
    }

@app.post("/alerts")
async def create_alert(alert_data: dict):
    """
    Create an alert for misinformation
    
    Args:
        alert_data: Alert information
    
    Returns:
        Created alert
    """
    return {
        "id": random.randint(1000, 9999),
        "title": alert_data.get("title", ""),
        "description": alert_data.get("description", ""),
        "severity": alert_data.get("severity", "MEDIUM"),
        "platform": alert_data.get("platform", "Unknown"),
        "created_at": datetime.now().isoformat(),
        "status": "ACTIVE"
    }

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
