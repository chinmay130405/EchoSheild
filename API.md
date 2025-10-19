# 📄 EchoSheild - API Reference

## Base URL
```
http://localhost:8000
```

## Authentication
Currently using mock authentication (no API key required)

Production: Add Bearer token to headers
```
Authorization: Bearer <YOUR_API_KEY>
```

---

## Endpoints

### Health Check
```
GET /health

Response: 200 OK
{
  "status": "healthy",
  "service": "EchoSheild API",
  "version": "1.0.0"
}
```

### Claims Management

#### Get All Claims
```
GET /claims?skip=0&limit=10

Query Parameters:
- skip: Number of claims to skip (default: 0)
- limit: Max claims to return (default: 10, max: 100)

Response: 200 OK
[
  {
    "id": 1,
    "claim": "string",
    "source": "string",
    "timestamp": "2025-10-19T10:00:00",
    "trust_score": 8,
    "status": "MISINFORMATION",
    "category": "Health",
    "engagement": 15234
  }
]
```

#### Get Specific Claim
```
GET /claims/{claim_id}

Path Parameters:
- claim_id: Integer ID of the claim

Response: 200 OK
{
  "id": 1,
  "claim": "string",
  "source": "string",
  "timestamp": "2025-10-19T10:00:00",
  "trust_score": 8,
  "status": "MISINFORMATION",
  "category": "Health",
  "engagement": 15234
}

Error: 404 Not Found
{"detail": "Claim not found"}
```

#### Create New Claim
```
POST /claims

Body:
{
  "claim": "New claim text",
  "source": "Twitter",
  "category": "Health"
}

Response: 201 Created
{
  "id": 6,
  "claim": "New claim text",
  "source": "Twitter",
  "timestamp": "2025-10-19T10:05:00",
  "trust_score": 45,
  "status": "MISINFORMATION",
  "category": "Health",
  "engagement": 8234
}
```

### Verification

#### Verify Claim
```
POST /verify/{claim_id}

Path Parameters:
- claim_id: Integer ID of the claim

Body:
{
  "verification_method": "Cross-referenced with WHO",
  "details": "Detailed findings...",
  "verified_sources": ["WHO", "CDC"]
}

Response: 200 OK
{
  "claim_id": 1,
  "claim_text": "Claim text",
  "verification_method": "Cross-referenced with WHO",
  "details": "Detailed findings...",
  "verified_sources": ["WHO", "CDC"],
  "trust_score": 8,
  "status": "MISINFORMATION",
  "verified_at": "2025-10-19T10:10:00"
}
```

### Summaries

#### Get Summary
```
GET /summaries/{claim_id}?language=en

Path Parameters:
- claim_id: Integer ID of the claim

Query Parameters:
- language: Language code (en, es, fr, hi) - default: en

Response: 200 OK
{
  "claim_id": 1,
  "summary": "✅ VERIFIED: 'Claim text...' is accurate...",
  "language": "en",
  "created_at": "2025-10-19T10:12:00"
}
```

### Analytics

#### Get Trending Claims
```
GET /trends

Response: 200 OK
{
  "trending": [
    {
      "id": 3,
      "claim": "Trending claim...",
      "engagement": 42156,
      ...
    }
  ],
  "total_claims": 5,
  "timestamp": "2025-10-19T10:15:00"
}
```

#### Get Statistics
```
GET /stats

Response: 200 OK
{
  "total_claims": 5,
  "verified_true": 1,
  "misinformation": 3,
  "partially_true": 1,
  "average_trust_score": 44,
  "timestamp": "2025-10-19T10:16:00"
}
```

#### Get Verification Sources
```
GET /sources

Response: 200 OK
{
  "sources": [
    "World Health Organization (WHO)",
    "Centers for Disease Control (CDC)",
    "Reuters Fact-Check",
    "AP Fact-Check",
    "PolitiFact",
    "Snopes",
    "FactCheck.org",
    "Government Public Information Bureau"
  ],
  "total": 8
}
```

### Alerts

#### Create Alert
```
POST /alerts

Body:
{
  "title": "Viral Misinformation",
  "description": "A claim about vaccines is spreading...",
  "severity": "HIGH",
  "platform": "Twitter, Facebook"
}

Response: 201 Created
{
  "id": 104,
  "title": "Viral Misinformation",
  "description": "A claim about vaccines is spreading...",
  "severity": "HIGH",
  "platform": "Twitter, Facebook",
  "created_at": "2025-10-19T10:20:00",
  "status": "ACTIVE"
}
```

---

## Status Codes

| Code | Meaning |
|------|---------|
| 200 | OK - Request successful |
| 201 | Created - Resource created |
| 400 | Bad Request - Invalid parameters |
| 404 | Not Found - Resource not found |
| 500 | Internal Server Error |

---

## Error Handling

### Error Response Format
```json
{
  "detail": "Error message describing what went wrong"
}
```

### Example Errors
```
GET /claims/999
→ 404 Not Found
{"detail": "Claim not found"}

GET /claims?limit=1000
→ 400 Bad Request (implied - limit max is 100)

POST /verify/999
→ 404 Not Found
{"detail": "Claim not found"}
```

---

## Rate Limiting (Future)

```
Current: Unlimited
Future: 50 requests per minute per IP

Headers:
X-RateLimit-Limit: 50
X-RateLimit-Remaining: 45
X-RateLimit-Reset: 1697782200
```

---

## Webhooks (Future)

```
POST /webhooks/verify
→ Triggered when claim is verified
Payload: { claim_id, status, trust_score }

POST /webhooks/alert
→ Triggered when high-severity alert created
Payload: { alert_id, severity, claim_id }
```

---

## SDK Examples

### Python
```python
import requests

# Get all claims
response = requests.get('http://localhost:8000/claims')
claims = response.json()

# Verify a claim
response = requests.post(
    'http://localhost:8000/verify/1',
    json={
        'verification_method': 'Cross-checked with WHO',
        'details': 'Finding...',
        'verified_sources': ['WHO', 'CDC']
    }
)
verification = response.json()

# Get summary
response = requests.get('http://localhost:8000/summaries/1?language=es')
summary = response.json()
```

### JavaScript/React
```javascript
// Fetch claims
const response = await fetch('http://localhost:8000/claims');
const claims = await response.json();

// Verify claim
const verification = await fetch(`http://localhost:8000/verify/1`, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    verification_method: 'Cross-checked...',
    details: 'Finding...',
    verified_sources: ['WHO']
  })
});

// Get summary
const summary = await fetch('http://localhost:8000/summaries/1?language=es');
```

### cURL
```bash
# Get claims
curl http://localhost:8000/claims

# Verify claim
curl -X POST http://localhost:8000/verify/1 \
  -H "Content-Type: application/json" \
  -d '{
    "verification_method": "Cross-checked",
    "details": "Finding",
    "verified_sources": ["WHO"]
  }'

# Get summary in Spanish
curl http://localhost:8000/summaries/1?language=es

# Get stats
curl http://localhost:8000/stats
```

---

## Rate Limit Plan

| Plan | Rate Limit | Cost |
|------|-----------|------|
| Free | 50 req/min | $0 |
| Pro | 1000 req/min | $99/month |
| Enterprise | Unlimited | Custom |

---

## Changelog

### v1.0.0 (2025-10-19)
- ✅ Initial release
- ✅ Claims CRUD
- ✅ Verification endpoint
- ✅ Summaries with multilingual support
- ✅ Analytics endpoints
- ✅ Alert creation

### v1.1.0 (Planned)
- Real-time WebSocket updates
- Batch verification endpoint
- Advanced filtering and search
- Batch claim creation

### v2.0.0 (Planned)
- Authentication & authorization
- Subscription tiers
- Webhook system
- Rate limiting per API key

---

## Support

- 📧 Email: api-support@echosheild.dev
- 🐛 Issues: https://github.com/echosheild/api/issues
- 💬 Discord: https://discord.gg/echosheild

---

**API Reference Complete!**
