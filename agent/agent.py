"""
EchoSheild Autonomous Agent
Continuously monitors, detects misinformation, and verifies claims
"""

import asyncio
import random
from datetime import datetime, timedelta
import requests
import json
from typing import List, Dict, Optional

# Mock LLM responses (simulates LangChain integration)
class MockLLM:
    """Mock LLM for claim clustering, verification, and summarization"""
    
    def __init__(self):
        self.name = "MockLLM (GPT-4 Simulator)"
        self.responses = [
            "This claim contradicts recent peer-reviewed studies.",
            "Multiple trusted sources confirm this information.",
            "While partially accurate, this claim lacks important context.",
            "This appears to be a misinterpretation of scientific data.",
            "Fact-checkers have debunked this claim multiple times.",
        ]
    
    def detect_misinformation(self, claim: str) -> Dict:
        """
        Detect if a claim is misinformation
        
        Args:
            claim: Claim text to analyze
        
        Returns:
            Detection result with confidence score
        """
        keywords_misinformation = ["causes", "cancer", "vaccine", "5G", "microchip", "hoax"]
        confidence = 0
        
        for keyword in keywords_misinformation:
            if keyword.lower() in claim.lower():
                confidence = random.randint(60, 95)
                break
        
        if confidence == 0:
            confidence = random.randint(20, 70)
        
        return {
            "is_misinformation": confidence > 50,
            "confidence": confidence,
            "reasoning": self.responses[random.randint(0, len(self.responses) - 1)]
        }
    
    def cluster_claims(self, claims: List[str]) -> Dict:
        """
        Cluster similar claims together
        
        Args:
            claims: List of claim texts
        
        Returns:
            Clustered claims with relationships
        """
        clusters = {}
        for i, claim in enumerate(claims):
            topic = "health" if "vaccine" in claim.lower() or "health" in claim.lower() else \
                   "technology" if "5G" in claim.lower() or "AI" in claim.lower() else \
                   "politics" if "election" in claim.lower() else \
                   "environment" if "climate" in claim.lower() or "renewable" in claim.lower() else \
                   "other"
            
            if topic not in clusters:
                clusters[topic] = []
            clusters[topic].append(claim)
        
        return clusters
    
    def verify_claim(self, claim: str, sources: List[str]) -> Dict:
        """
        Verify claim against trusted sources
        
        Args:
            claim: Claim to verify
            sources: Trusted sources to check against
        
        Returns:
            Verification result
        """
        verification_methods = [
            "Cross-referenced with WHO guidelines",
            "Compared against CDC publications",
            "Fact-checked by Reuters and AP",
            "Analyzed peer-reviewed research",
            "Cross-verified with government sources"
        ]
        
        truth_score = random.randint(5, 95)
        
        return {
            "claim": claim,
            "verification_method": verification_methods[random.randint(0, len(verification_methods) - 1)],
            "sources_consulted": random.sample(sources, k=min(3, len(sources))),
            "truth_score": truth_score,
            "status": "TRUE" if truth_score >= 75 else "PARTIALLY_TRUE" if truth_score >= 50 else "MISINFORMATION"
        }
    
    def generate_summary(self, claim: str, verification: Dict) -> str:
        """
        Generate human-readable summary
        
        Args:
            claim: Original claim
            verification: Verification result
        
        Returns:
            Human-readable summary
        """
        status = verification.get("status", "UNKNOWN")
        score = verification.get("truth_score", 0)
        method = verification.get("verification_method", "")
        
        summaries = {
            "TRUE": f"✅ VERIFIED: '{claim}' is accurate. Verified through {method}. Trust score: {score}%",
            "PARTIALLY_TRUE": f"⚠️ MIXED: '{claim}' contains partial truths. Some context may be missing. Trust score: {score}%",
            "MISINFORMATION": f"❌ DEBUNKED: '{claim}' is misinformation. Multiple sources contradict this claim. Trust score: {score}%"
        }
        
        return summaries.get(status, f"Analysis pending for: {claim}")


class MisinformationAgent:
    """
    Autonomous agent for misinformation detection and verification
    Continuously monitors, analyzes, and responds to false claims
    """
    
    def __init__(self, backend_url: str = "http://localhost:8000", update_interval: int = 60):
        """
        Initialize the agent
        
        Args:
            backend_url: URL of the backend API
            update_interval: Seconds between update cycles
        """
        self.backend_url = backend_url
        self.update_interval = update_interval
        self.llm = MockLLM()
        self.is_running = False
        self.processed_claims = set()
        self.trusted_sources = [
            "World Health Organization (WHO)",
            "Centers for Disease Control (CDC)",
            "Reuters Fact-Check",
            "AP Fact-Check",
            "PolitiFact",
            "Snopes",
            "FactCheck.org",
        ]
    
    def fetch_claims(self) -> List[Dict]:
        """
        Fetch unverified claims from the backend
        
        Returns:
            List of claims
        """
        try:
            response = requests.get(f"{self.backend_url}/claims")
            return response.json()
        except Exception as e:
            print(f"❌ Error fetching claims: {e}")
            return []
    
    def detect_misinformation_trends(self, claims: List[Dict]) -> Dict:
        """
        Detect emerging misinformation trends
        
        Args:
            claims: List of claims to analyze
        
        Returns:
            Trends analysis
        """
        print("\n🔍 Detecting misinformation trends...")
        
        trends = {
            "total_claims": len(claims),
            "detected_misinformation": 0,
            "high_engagement_false": [],
            "emerging_topics": [],
            "timestamp": datetime.now().isoformat()
        }
        
        for claim in claims:
            detection = self.llm.detect_misinformation(claim.get("claim", ""))
            
            if detection["is_misinformation"]:
                trends["detected_misinformation"] += 1
                
                if claim.get("engagement", 0) > 5000:
                    trends["high_engagement_false"].append({
                        "claim": claim.get("claim"),
                        "engagement": claim.get("engagement"),
                        "confidence": detection["confidence"]
                    })
        
        # Cluster similar claims
        claim_texts = [c.get("claim") for c in claims]
        clusters = self.llm.cluster_claims(claim_texts)
        trends["emerging_topics"] = list(clusters.keys())
        
        return trends
    
    def verify_claims_batch(self, claims: List[Dict]) -> List[Dict]:
        """
        Verify multiple claims in batch
        
        Args:
            claims: List of claims to verify
        
        Returns:
            List of verification results
        """
        print("\n✅ Verifying claims batch...")
        
        verified_results = []
        for claim in claims[:3]:  # Verify top 3 for demo
            if claim.get("id") not in self.processed_claims:
                verification = self.llm.verify_claim(
                    claim.get("claim"),
                    self.trusted_sources
                )
                
                # Generate summary
                summary = self.llm.generate_summary(
                    claim.get("claim"),
                    verification
                )
                
                verified_results.append({
                    "claim_id": claim.get("id"),
                    "claim_text": claim.get("claim"),
                    "verification": verification,
                    "summary": summary
                })
                
                self.processed_claims.add(claim.get("id"))
        
        return verified_results
    
    def generate_dashboard_update(self, verification_results: List[Dict]) -> Dict:
        """
        Generate dashboard update from verification results
        
        Args:
            verification_results: List of verification results
        
        Returns:
            Dashboard update data
        """
        print("\n📊 Generating dashboard update...")
        
        misinformation_count = sum(
            1 for r in verification_results 
            if r["verification"]["status"] == "MISINFORMATION"
        )
        
        verified_count = sum(
            1 for r in verification_results 
            if r["verification"]["status"] == "TRUE"
        )
        
        avg_trust = sum(
            r["verification"]["truth_score"] 
            for r in verification_results
        ) / len(verification_results) if verification_results else 0
        
        return {
            "timestamp": datetime.now().isoformat(),
            "verification_results": verification_results,
            "stats": {
                "verified_true": verified_count,
                "misinformation_detected": misinformation_count,
                "average_trust_score": round(avg_trust, 2),
                "total_processed": len(verification_results)
            },
            "alerts": [
                {
                    "severity": "HIGH" if r["verification"]["truth_score"] < 25 else "MEDIUM",
                    "title": f"{'Misinformation' if r['verification']['status'] == 'MISINFORMATION' else 'Claim'} Detected",
                    "description": r["summary"],
                    "claim_id": r["claim_id"]
                }
                for r in verification_results
                if r["verification"]["status"] != "TRUE"
            ]
        }
    
    async def run_verification_cycle(self):
        """
        Execute one verification cycle
        Fetches claims → detects misinformation → verifies → generates summary
        """
        print(f"\n⚡ Starting verification cycle at {datetime.now()}")
        
        # Step 1: Fetch claims
        claims = self.fetch_claims()
        print(f"   ✓ Fetched {len(claims)} claims")
        
        if not claims:
            print("   ⚠️ No claims to process")
            return
        
        # Step 2: Detect misinformation trends
        trends = self.detect_misinformation_trends(claims)
        print(f"   ✓ Detected {trends['detected_misinformation']} misinformation claims")
        print(f"   ✓ Identified topics: {', '.join(trends['emerging_topics'])}")
        
        # Step 3: Verify claims
        verified_results = self.verify_claims_batch(claims)
        print(f"   ✓ Verified {len(verified_results)} claims")
        
        # Step 4: Generate dashboard update
        dashboard_update = self.generate_dashboard_update(verified_results)
        
        # Step 5: Send update to backend
        try:
            response = requests.post(
                f"{self.backend_url}/dashboard-update",
                json=dashboard_update
            )
            print(f"   ✓ Dashboard update sent successfully")
        except:
            print(f"   ⚠️ Could not send dashboard update (backend may not have this endpoint)")
        
        # Print verification summaries
        print("\n📝 Verification Summaries:")
        for result in verified_results:
            print(f"   • {result['summary']}")
        
        print(f"\n✨ Verification cycle complete at {datetime.now()}\n")
    
    async def start(self):
        """
        Start the autonomous agent
        Runs continuously, executing verification cycles at intervals
        """
        self.is_running = True
        print(f"\n🚀 EchoSheild Agent Started")
        print(f"   Backend URL: {self.backend_url}")
        print(f"   Update Interval: {self.update_interval} seconds")
        print(f"   LLM: {self.llm.name}\n")
        
        try:
            while self.is_running:
                await self.run_verification_cycle()
                await asyncio.sleep(self.update_interval)
        except KeyboardInterrupt:
            print("\n⛔ Agent stopped by user")
        finally:
            self.stop()
    
    def stop(self):
        """Stop the agent"""
        self.is_running = False
        print("🛑 EchoSheild Agent stopped")


async def main():
    """Main entry point for the agent"""
    agent = MisinformationAgent(
        backend_url="http://localhost:8000",
        update_interval=60  # Run every 60 seconds
    )
    
    await agent.start()


if __name__ == "__main__":
    print("=" * 60)
    print("🛡️  EchoSheild - Autonomous Misinformation Detection Agent")
    print("=" * 60)
    print("\n⏳ Initializing agent and connecting to backend...")
    print("   Make sure the FastAPI backend is running on http://localhost:8000")
    print("\n   Press Ctrl+C to stop the agent\n")
    
    asyncio.run(main())
