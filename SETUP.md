# 🎯 EchoSheild - Quick Start Guide

## Installation & Setup

### 🖥️ Windows PowerShell

```powershell
# 1. Navigate to project directory
cd "C:\Users\ambre\OneDrive\Desktop\fsd\mumbai hacks\EchoSheild"

# Terminal 1: Frontend
cd frontend
npm install
npm run dev
# Frontend runs on http://localhost:3000

# Terminal 2: Backend (in new PowerShell)
cd backend
pip install -r requirements.txt
python main.py
# API runs on http://localhost:8000

# Terminal 3: Agent (in new PowerShell)
cd agent
pip install -r requirements.txt
python agent.py
# Agent starts fetching and verifying claims
```

### 🐧 Linux/Mac

```bash
# 1. Navigate to project directory
cd ~/Desktop/fsd/mumbai\ hacks/EchoSheild

# Terminal 1: Frontend
cd frontend
npm install
npm run dev

# Terminal 2: Backend
cd backend
pip install -r requirements.txt
python main.py

# Terminal 3: Agent
cd agent
pip install -r requirements.txt
python agent.py
```

---

## 🌐 Access Points

| Component | URL | Purpose |
|-----------|-----|---------|
| **Frontend** | http://localhost:3000 | Dashboard UI |
| **API Docs** | http://localhost:8000/docs | Interactive API |
| **ReDoc** | http://localhost:8000/redoc | API Documentation |
| **Health Check** | http://localhost:8000/health | API Status |

---

## 🧪 Testing the System

### 1. Check API is Working
```bash
curl http://localhost:8000/health
# Expected: {"status":"healthy","service":"EchoSheild API","version":"1.0.0"}
```

### 2. Fetch Claims
```bash
curl http://localhost:8000/claims
# Returns list of 5 mock claims
```

### 3. Get Statistics
```bash
curl http://localhost:8000/stats
# Returns verified, misinformation counts and average trust score
```

### 4. View Frontend
- Open http://localhost:3000
- Navigate through Home, Live Trends, Fact-Check, Alerts tabs
- See agent updates in real-time

### 5. Watch Agent Running
- Check Terminal 3 for agent output
- New verification cycles every 60 seconds
- See detected misinformation and trust scores

---

## 🚀 Build for Production

### Frontend Build
```bash
cd frontend
npm run build
# Creates optimized dist/ folder
```

### Backend Deployment
```bash
cd backend
# Set environment variables
$env:PORT="8000"
$env:DEBUG="false"

# Run with Gunicorn (production)
pip install gunicorn
gunicorn -w 4 -k uvicorn.workers.UvicornWorker main:app
```

---

## 📊 Demo Flows

### Scenario 1: View Dashboard
1. Open http://localhost:3000/
2. See stats cards: Total Claims, Verified, Misinformation, Avg Trust
3. See 24-hour trends chart
4. See recent claims with trust scores

### Scenario 2: Search for Claims
1. Go to "Live Trends"
2. Type "vaccine" in search bar
3. See filtered results
4. Click any claim to view details

### Scenario 3: View Verification Details
1. Go to "Fact-Check" tab
2. Click a claim from the left list
3. See:
   - Trust score with visual bar
   - Verification method used
   - Detailed findings
   - Sources consulted

### Scenario 4: Check Alerts
1. Go to "Alerts" tab
2. See alert statistics (Critical, High, Medium, Low)
3. Filter by severity level
4. See action taken for each alert

---

## 🔧 Troubleshooting

### Port Already in Use
```bash
# Kill process on port 3000 (Frontend)
Get-Process | Where-Object {$_.Port -eq 3000} | Stop-Process

# Or specify different port in vite.config.js
```

### Backend Connection Error
- Ensure backend is running: `python main.py`
- Check http://localhost:8000/docs is accessible
- Verify no firewall blocking port 8000

### Agent Not Updating Dashboard
- Agent runs every 60 seconds in terminal
- Check for Python errors in agent terminal
- Ensure backend is responding

### Database Error
- Delete `echosheild.db` if corrupted
- Backend will recreate on restart
- All data is mock, safe to reset

---

## 📱 Mobile/Responsive Testing

Open frontend in different screen sizes:
- Desktop: 1920×1080
- Tablet: 768×1024
- Mobile: 375×667

Dashboard adapts with TailwindCSS responsive classes.

---

## 🎨 Customization

### Change Colors
Edit `frontend/tailwind.config.js`:
```javascript
colors: {
  primary: '#6366f1',     // Change this
  secondary: '#8b5cf6',   // Or this
}
```

### Change Update Interval
Edit `backend/config.py`:
```python
AGENT_UPDATE_INTERVAL = 300  # 5 minutes instead of 60 seconds
```

### Add More Mock Claims
Edit `backend/main.py` and add to `MOCK_CLAIMS` list.

---

## 📸 Screenshot Instructions

For Devfolio submission:

1. **Home Tab**
   - Full screen capture (1920×1080)
   - Shows stats cards and charts

2. **Live Trends Tab**
   - Capture trending topics section
   - Capture search functionality

3. **Fact-Check Tab**
   - Show claim list and detailed verification

4. **Alerts Tab**
   - Show alert feed with severity colors

5. **Agent Terminal**
   - Capture agent running with verification output

---

## 💡 Tips for Demo Day

1. **Start Components in Order**
   - Frontend first (shows loading state)
   - Backend next (processes requests)
   - Agent last (starts verifying)

2. **Pre-populate Data**
   - Run agent for 2-3 cycles before demo
   - Charts will show data points
   - More claims verified

3. **Have Backup Screenshots**
   - Save screenshots of each tab
   - In case live demo has issues
   - Use for Devfolio if needed

4. **Explain the Flow**
   - Show agent terminal running
   - Refresh dashboard to see updates
   - Explain verification sources

---

**🎉 Ready to Demo! Good luck at Mumbai Hacks!**
