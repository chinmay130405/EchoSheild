# ⚡ EchoSheild - Quick Reference

## 🚀 One-Line Start (Windows PowerShell)

### Terminal 1: Frontend
```powershell
cd frontend; npm install; npm run dev
```

### Terminal 2: Backend
```powershell
cd backend; pip install -r requirements.txt; python main.py
```

### Terminal 3: Agent
```powershell
cd agent; pip install -r requirements.txt; python agent.py
```

---

## 🌐 Access Points

| Service | URL | Purpose |
|---------|-----|---------|
| Dashboard | http://localhost:3000 | Frontend UI |
| API Docs | http://localhost:8000/docs | Interactive API |
| ReDoc | http://localhost:8000/redoc | API Reference |
| Health | http://localhost:8000/health | API Status |

---

## 🧪 Quick Tests

### Check Frontend
```bash
curl http://localhost:3000
# Opens in browser or shows HTML
```

### Check Backend
```bash
curl http://localhost:8000/health
# Returns: {"status":"healthy","service":"EchoSheild API","version":"1.0.0"}
```

### Get Claims
```bash
curl http://localhost:8000/claims
# Returns JSON array of claims
```

### Get Stats
```bash
curl http://localhost:8000/stats
# Returns statistics
```

### Get Summary (Spanish)
```bash
curl http://localhost:8000/summaries/1?language=es
# Returns Spanish summary
```

---

## 📊 Demo Flow (5 mins)

1. **Open Frontend** → http://localhost:3000
2. **Show Home Tab** → Stats & Charts
3. **Show Live Trends** → Search bar works
4. **Show Fact-Check** → Click claim, see details
5. **Show Alerts** → Alert feed
6. **Show Agent Terminal** → Verification running
7. **Refresh Frontend** → See updated stats

---

## 🛠️ Troubleshooting

### Port Already in Use
```powershell
# Check what's using port 3000
Get-NetTCPConnection -LocalPort 3000

# Kill process
Stop-Process -Id <PID> -Force
```

### Module Not Found Error
```bash
# Frontend
npm install

# Backend
pip install -r requirements.txt

# Agent
pip install -r requirements.txt
```

### CORS Error
- Check backend is running on :8000
- Check frontend is on :3000
- CORS is auto-configured

### Database Error
```bash
# Delete database and restart backend
rm backend/echosheild.db
python main.py
# DB recreates automatically
```

---

## 📁 Important Files

| File | Purpose |
|------|---------|
| `frontend/src/App.jsx` | Main routing |
| `backend/main.py` | All API endpoints |
| `agent/agent.py` | Verification agent |
| `frontend/src/mockData.js` | 5 sample claims |
| `README.md` | Full documentation |

---

## 🎨 Customization Quick Tips

### Change Colors
```javascript
// frontend/tailwind.config.js
colors: {
  primary: '#6366f1',  // Your color
}
```

### Change API Port
```python
# backend/main.py
if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8001)  # Change port
```

### Change Agent Interval
```python
# agent/agent.py
agent = MisinformationAgent(update_interval=30)  # 30 seconds
```

---

## 📸 Screenshot Locations

For Devfolio, capture these pages (1920×1080):

1. **Home** → http://localhost:3000
2. **Live Trends** → http://localhost:3000 + click "Live Trends"
3. **Fact-Check** → Click "Fact-Check" tab
4. **Alerts** → Click "Alerts" tab
5. **API Docs** → http://localhost:8000/docs
6. **Agent Terminal** → Terminal 3 output

---

## 🎬 Demo Script (Condensed)

```
1. "This is EchoSheild - AI misinformation detection"
2. "Problem: False claims spread faster than truth"
3. "Solution: Autonomous agent + transparent verification"

[Show Frontend]
4. "Real-time dashboard with stats and charts"
5. "Search for claims, see trending topics"
6. "Click any claim to see HOW it was verified"
7. "Alert system tracks high-severity misinformation"

[Show Agent Terminal]
8. "Agent runs every 60 seconds, verifying claims"
9. "Uses AI to detect patterns, checks trusted sources"
10. "Updates dashboard automatically"

[Show Live Update]
11. "Refresh dashboard - stats update in real-time"
12. "Scalable to millions of claims with right infrastructure"

Questions?
```

---

## 📊 API Endpoints Cheat Sheet

```bash
# List claims
GET /claims

# Get one claim
GET /claims/1

# Create claim
POST /claims
-H "Content-Type: application/json"
-d '{"claim":"text","source":"Twitter","category":"Health"}'

# Verify claim
POST /verify/1
-d '{"verification_method":"...","details":"...","verified_sources":["WHO"]}'

# Get summary
GET /summaries/1?language=en

# Get stats
GET /stats

# Get trends
GET /trends

# Get sources
GET /sources

# Create alert
POST /alerts
-d '{"title":"...","description":"...","severity":"HIGH"}'
```

---

## 🚀 Build for Production

```bash
# Frontend
cd frontend
npm run build
# Creates dist/ folder, ready to deploy

# Backend
pip install gunicorn
gunicorn -w 4 -k uvicorn.workers.UvicornWorker main:app
```

---

## 📚 Documentation Index

1. **README.md** - Project overview & features
2. **SETUP.md** - Installation & testing
3. **DEMO.md** - Demo script & walkthrough
4. **ARCHITECTURE.md** - Technical details
5. **API.md** - API reference
6. **PROJECT_SUMMARY.md** - Completion summary
7. **CONTRIBUTING.md** - How to contribute

---

## ✅ Pre-Demo Checklist

- [ ] All dependencies installed
- [ ] Frontend runs without errors
- [ ] Backend API responding
- [ ] Agent fetching and verifying
- [ ] Database created (echosheild.db)
- [ ] Screenshots captured
- [ ] Demo script prepared
- [ ] Familiar with all tabs
- [ ] Can explain the flow
- [ ] Have backup slides

---

## 🎯 Devfolio Submission

### What to Include:
1. Project title: "EchoSheild - AI Misinformation Detection"
2. Tagline: "Truth at Scale, Speed at Light"
3. Description: (From README.md)
4. Demo video: (30-60 seconds)
5. Screenshots: (5-7 images)
6. GitHub link: (If public)
7. Team: (List members)

### Description Template:
```
EchoSheild is an autonomous AI platform that detects and verifies 
misinformation in real-time. Our agent continuously monitors claims,
uses LLM-powered analysis, and verifies against trusted sources
(WHO, CDC, Reuters). The beautiful React dashboard shows trending
misinformation with transparent verification reasoning.

Built with: React 18, FastAPI, Python, TailwindCSS, Recharts
```

---

## 💡 Pro Tips

1. **Start fresh for each demo** → Clear db, restart all components
2. **Have screenshots ready** → In case live demo fails
3. **Practice the flow** → Know where to click
4. **Explain clearly** → Non-technical judges too
5. **Show the agent** → Most impressive part
6. **Emphasize uniqueness** → Autonomous, transparent, scalable

---

## 🎁 Bonus Features (Future)

- Real Twitter API
- Real fact-check APIs
- Production LLM (GPT-4)
- User authentication
- PostgreSQL database
- Telegram bot
- Browser extension
- Mobile app

---

## 🏆 Success Metrics

- ✅ Zero console errors
- ✅ Agent runs continuously
- ✅ Dashboard updates live
- ✅ Professional UI
- ✅ Clear documentation
- ✅ Ready to scale
- ✅ Unique approach

---

**Good luck at Mumbai Hacks! 🚀**

**Remember: "Truth at Scale, Speed at Light"** ⚡

---

*Last Updated: October 19, 2025*
*EchoSheild v1.0.0*
