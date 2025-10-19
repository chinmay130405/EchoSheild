"""
FastAPI dependencies and utilities
"""

from typing import List
from datetime import datetime

def get_db():
    """
    Database session dependency
    """
    # In production, use actual DB connection
    pass

def log_request(method: str, path: str, timestamp: datetime = None):
    """
    Log API requests
    
    Args:
        method: HTTP method
        path: Request path
        timestamp: Request timestamp
    """
    ts = timestamp or datetime.now()
    print(f"[{ts}] {method} {path}")
