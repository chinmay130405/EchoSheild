"""
EchoSheild Configuration Module
"""

import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# API Configuration
API_TITLE = "EchoSheild - Misinformation Detection API"
API_VERSION = "1.0.0"
API_DESCRIPTION = "Real-time detection and verification of misinformation claims"

# Server Configuration
HOST = os.getenv("HOST", "0.0.0.0")
PORT = int(os.getenv("PORT", 8000))
DEBUG = os.getenv("DEBUG", "True").lower() == "true"

# Database Configuration
DATABASE_URL = os.getenv("DATABASE_URL", "sqlite:///echosheild.db")
DB_PATH = os.getenv("DB_PATH", "echosheild.db")

# LLM Configuration
OPENAI_API_KEY = os.getenv("OPENAI_API_KEY", "")
LLM_MODEL = os.getenv("LLM_MODEL", "gpt-4")

# Agent Configuration
AGENT_UPDATE_INTERVAL = int(os.getenv("AGENT_UPDATE_INTERVAL", 300))  # 5 minutes
CLAIM_FETCH_INTERVAL = int(os.getenv("CLAIM_FETCH_INTERVAL", 60))     # 1 minute

# Frontend Configuration
FRONTEND_URL = os.getenv("FRONTEND_URL", "http://localhost:3000")

# Verification Settings
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

# Trust Score Thresholds
TRUST_SCORE_HIGH = 75
TRUST_SCORE_MEDIUM = 50
TRUST_SCORE_LOW = 0
