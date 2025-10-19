# 🛡️ EchoSheild - Architecture & Technical Documentation

## System Architecture

### Layered Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                    PRESENTATION LAYER                           │
│              React Dashboard (Vite + TailwindCSS)               │
│                   http://localhost:3000                         │
│  • Home (Stats & Charts)                                        │
│  • Live Trends (Search & Filtering)                             │
│  • Fact-Check (Verification Details)                            │
│  • Alerts (Severity-based Feed)                                 │
└────────────────────────────┬────────────────────────────────────┘
                             │ HTTP REST API
                             ▼
┌─────────────────────────────────────────────────────────────────┐
│                     API LAYER                                   │
│                 FastAPI (Python)                                │
│                 http://localhost:8000                           │
│  • Route: /claims                                               │
│  • Route: /verify                                               │
│  • Route: /summaries                                            │
│  • Route: /trends                                               │
│  • Route: /stats                                                │
│  • Route: /alerts                                               │
└────────────────────────────┬────────────────────────────────────┘
                             │ Read/Write
                             ▼
┌─────────────────────────────────────────────────────────────────┐
│                   DATA LAYER                                    │
│               SQLite3 Database                                  │
│               (echosheild.db)                                   │
│  • Table: claims                                                │
│  • Table: verifications                                         │
│  • Table: summaries                                             │
│  • Table: alerts                                                │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│              AUTONOMOUS AGENT LAYER                             │
│                 Python Async Agent                              │
│  • Runs every 60 seconds                                        │
│  • Fetches claims from backend                                  │
│  • Detects misinformation patterns                              │
│  • Verifies against trusted sources                             │
│  • Generates summaries                                          │
│  • Updates dashboard                                            │
└─────────────────────────────────────────────────────────────────┘

Trusted Sources:
├─ World Health Organization (WHO)
├─ Centers for Disease Control (CDC)
├─ Reuters Fact-Check
├─ AP Fact-Check
├─ PolitiFact
├─ Snopes
├─ FactCheck.org
└─ Government PIB
```

---

## Data Flow

### Claim Verification Flow

```
1. DATA SOURCE
   └─ Mock Twitter/Reddit/News streams
   
2. BACKEND INGESTION
   └─ POST /claims → Store in database
   
3. AGENT PICKUP
   └─ GET /claims → Fetch from backend
   
4. MISINFORMATION DETECTION
   ├─ LLM analyzes claim text
   ├─ Checks against keyword database
   ├─ Calculates confidence score
   └─ Status: "MISINFORMATION" or "TRUE" or "PARTIAL"
   
5. MULTI-SOURCE VERIFICATION
   ├─ Cross-check with WHO
   ├─ Cross-check with CDC
   ├─ Cross-check with Reuters
   ├─ Calculate consensus score
   └─ Determine final trust score (0-100)
   
6. SUMMARY GENERATION
   ├─ LLM generates reasoning
   ├─ Creates human-readable text
   └─ Available in EN, ES, FR, HI
   
7. DASHBOARD UPDATE
   ├─ POST verification result
   ├─ Update database
   └─ Frontend auto-refreshes
   
8. ALERT CREATION
   ├─ If misinformation detected
   ├─ If high engagement
   └─ Create with severity level
   
9. FRONTEND DISPLAY
   ├─ Stats update
   ├─ Charts refresh
   ├─ Claims re-render
   └─ User sees real-time data
```

---

## Database Schema

### Claims Table
```sql
CREATE TABLE claims (
    id INTEGER PRIMARY KEY,
    claim TEXT NOT NULL,
    source TEXT,
    timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
    trust_score INTEGER,      -- 0-100
    status TEXT,              -- 'TRUE', 'MISINFORMATION', 'PARTIALLY_TRUE'
    category TEXT,            -- 'Health', 'Politics', 'Technology', etc.
    engagement INTEGER        -- Social media engagement count
);
```

### Verifications Table
```sql
CREATE TABLE verifications (
    id INTEGER PRIMARY KEY,
    claim_id INTEGER,
    verification_method TEXT,
    details TEXT,
    verified_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY(claim_id) REFERENCES claims(id)
);
```

### Summaries Table
```sql
CREATE TABLE summaries (
    id INTEGER PRIMARY KEY,
    claim_id INTEGER,
    summary TEXT,
    language TEXT DEFAULT 'en',  -- 'en', 'es', 'fr', 'hi'
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY(claim_id) REFERENCES claims(id)
);
```

---

## API Specifications

### Request/Response Examples

#### GET /claims
```bash
Request:
GET /claims?skip=0&limit=10

Response:
[
  {
    "id": 1,
    "claim": "A new vaccine causes autism spectrum disorders",
    "source": "Twitter",
    "timestamp": "2025-10-19T10:30:00",
    "trust_score": 8,
    "status": "MISINFORMATION",
    "category": "Health",
    "engagement": 15234
  },
  ...
]
```

#### POST /verify/{claim_id}
```bash
Request:
POST /verify/1
{
  "verification_method": "Cross-referenced with WHO and CDC",
  "details": "Multiple large-scale studies found no link between vaccines and autism",
  "verified_sources": ["WHO", "CDC", "Reuters"]
}

Response:
{
  "claim_id": 1,
  "claim_text": "A new vaccine causes autism spectrum disorders",
  "verification_method": "Cross-referenced with WHO and CDC",
  "details": "Multiple large-scale studies found no link...",
  "verified_sources": ["WHO", "CDC", "Reuters"],
  "trust_score": 8,
  "status": "MISINFORMATION",
  "verified_at": "2025-10-19T10:35:00"
}
```

#### GET /summaries/{claim_id}?language=es
```bash
Request:
GET /summaries/1?language=es

Response:
{
  "claim_id": 1,
  "summary": "Análisis de Reclamación: La declaración 'A new vaccine causes autism...' ha sido analizada usando múltiples fuentes de verificación.",
  "language": "es",
  "created_at": "2025-10-19T10:36:00"
}
```

#### GET /stats
```bash
Request:
GET /stats

Response:
{
  "total_claims": 5,
  "verified_true": 1,
  "misinformation": 3,
  "partially_true": 1,
  "average_trust_score": 44,
  "timestamp": "2025-10-19T10:37:00"
}
```

---

## LangChain Integration

### Mock LLM Functions

```python
# Claim Classification
def detect_misinformation(claim: str) -> Dict:
    # Input: Claim text
    # Output: {"is_misinformation": bool, "confidence": 0-100}
    
# Claim Clustering
def cluster_claims(claims: List[str]) -> Dict:
    # Input: List of claims
    # Output: {"topic_name": [claim1, claim2, ...]}
    
# Verification
def verify_claim(claim: str, sources: List[str]) -> Dict:
    # Input: Claim, list of sources
    # Output: {"truth_score": 0-100, "status": "TRUE/MISINFORMATION/PARTIAL"}
    
# Summary Generation
def generate_summary(claim: str, verification: Dict) -> str:
    # Input: Claim and verification result
    # Output: Human-readable summary in markdown
```

### Real LangChain Implementation (Future)

```python
from langchain.llms import OpenAI
from langchain.chains import LLMChain
from langchain.prompts import PromptTemplate

llm = OpenAI(model_name="gpt-4", temperature=0.7)

# Chain 1: Detect misinformation
detect_chain = LLMChain(
    llm=llm,
    prompt=PromptTemplate(
        input_variables=["claim"],
        template="Is this claim misinformation? {claim}"
    )
)

# Chain 2: Verify against sources
verify_chain = LLMChain(
    llm=llm,
    prompt=PromptTemplate(
        input_variables=["claim", "sources"],
        template="Verify this claim against these sources: {claim}. Sources: {sources}"
    )
)

# Chain 3: Generate summary
summary_chain = LLMChain(
    llm=llm,
    prompt=PromptTemplate(
        input_variables=["claim", "verification"],
        template="Summarize this verification: {verification} for claim: {claim}"
    )
)
```

---

## Performance Considerations

### Frontend Optimization
- ✅ Vite for fast build times (~500ms)
- ✅ React lazy loading for routes
- ✅ Recharts optimization (memoized components)
- ✅ TailwindCSS purging unused styles
- ✅ LocalStorage for UI state

### Backend Optimization
- ✅ FastAPI async handlers (non-blocking)
- ✅ SQLite connection pooling
- ✅ Response caching with ETags
- ✅ Pagination on list endpoints
- ✅ Index on frequently queried columns

### Agent Optimization
- ✅ Async operations with asyncio
- ✅ Batch verification (3 claims at once)
- ✅ LLM caching for repeated analyses
- ✅ Database transaction batching

### Scalability Path

```
Current (Single Machine)
└─ Frontend: Vite dev server
└─ Backend: Uvicorn single process
└─ Agent: Single async loop
└─ Database: SQLite

Phase 1 (Multi-process)
└─ Frontend: Nginx reverse proxy
└─ Backend: Gunicorn + 4 Uvicorn workers
└─ Agent: Multiple parallel agents
└─ Database: PostgreSQL

Phase 2 (Distributed)
└─ Frontend: CDN + S3
└─ Backend: Kubernetes cluster
└─ Agent: Lambda/Cloud Functions
└─ Database: RDS + Redis cache

Phase 3 (Enterprise)
└─ Frontend: Edge computing
└─ Backend: Microservices
└─ Agent: ML pipeline (Apache Spark)
└─ Database: Data warehouse (BigQuery)
```

---

## Security Considerations

### Current Implementation (Demo)
- ✅ CORS enabled for frontend
- ✅ No authentication (mock data)
- ✅ No rate limiting
- ✅ Local database only

### Production Security
- [ ] JWT authentication
- [ ] Rate limiting (50 req/min per IP)
- [ ] Input validation (Pydantic schemas)
- [ ] SQL injection prevention
- [ ] HTTPS/TLS encryption
- [ ] API key rotation
- [ ] Audit logging
- [ ] GDPR compliance

---

## Testing Strategy

### Unit Tests (Future)
```python
# Test LLM functions
def test_detect_misinformation():
    assert detect_misinformation("vaccine causes autism")["is_misinformation"]

def test_verify_claim():
    result = verify_claim("AI passes med exams", sources)
    assert result["truth_score"] > 50

# Test API endpoints
def test_get_claims():
    response = client.get("/claims")
    assert response.status_code == 200

def test_verify_endpoint():
    response = client.post("/verify/1", json={...})
    assert response.status_code == 200
```

### Integration Tests (Future)
```python
# Test full flow
def test_claim_to_verification():
    1. Create claim
    2. Agent fetches claim
    3. Agent verifies claim
    4. Check dashboard updated
    5. Check alert created
```

### E2E Tests (Future)
```
1. Start frontend on :3000
2. Start backend on :8000
3. Start agent
4. Navigate through app
5. Verify agent updates dashboard
6. Check all features work
```

---

## Deployment Guide

### Docker Containerization

```dockerfile
# Frontend
FROM node:18-alpine
WORKDIR /app
COPY frontend .
RUN npm install && npm run build
EXPOSE 3000

# Backend
FROM python:3.10-slim
WORKDIR /app
COPY backend .
RUN pip install -r requirements.txt
EXPOSE 8000

# Agent
FROM python:3.10-slim
WORKDIR /app
COPY agent .
RUN pip install -r requirements.txt
CMD ["python", "agent.py"]
```

### Docker Compose
```yaml
version: '3'
services:
  frontend:
    build: ./frontend
    ports:
      - "3000:3000"
  backend:
    build: ./backend
    ports:
      - "8000:8000"
    volumes:
      - db_volume:/app
  agent:
    build: ./agent
    depends_on:
      - backend
volumes:
  db_volume:
```

---

## Monitoring & Analytics (Future)

### Key Metrics to Track
- Claims processed per minute
- Average verification time
- Accuracy of misinformation detection
- API response time (p50, p95, p99)
- Frontend page load time
- User engagement with claims
- False positive rate
- Source reliability scores

### Alerting
- Backend response time > 500ms
- Agent verification failure
- Database disk usage > 80%
- API error rate > 1%
- Misinformation spread rate acceleration

---

## Roadmap

### v1.0 (Current)
- ✅ React dashboard
- ✅ FastAPI backend
- ✅ Autonomous agent
- ✅ Mock LLM
- ✅ SQLite database

### v1.1 (Next Month)
- Real Twitter API
- Real Reddit API
- Real fact-check API integration
- User authentication

### v1.5 (Q1)
- PostgreSQL migration
- Elasticsearch integration
- Redis caching
- Telegram bot

### v2.0 (Q2)
- Mobile iOS app
- Mobile Android app
- Browser extension
- Advanced analytics

---

**Technical Documentation Complete! 🚀**
