# ⚡ EchoSheild - Agentic AI Misinformation Detection Platform

**Real-time Detection • AI-Powered Verification • Live Dashboard**

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Python 3.10+](https://img.shields.io/badge/Python-3.10+-blue.svg)](https://www.python.org/)
[![React 18+](https://img.shields.io/badge/React-18+-61DAFB.svg)](https://reactjs.org/)
[![FastAPI](https://img.shields.io/badge/FastAPI-0.104+-009688.svg)](https://fastapi.tiangolo.com/)

---

## 🎯 Problem Statement

In today's digital age, misinformation spreads faster than truth. False claims about health, politics, and technology can cause real harm to society. Current fact-checking is reactive and slow. What we need is:

- **Real-time Detection**: Identify false claims as they emerge across social media, news, and forums
- **Autonomous Verification**: Use AI to cross-check claims against trusted sources automatically
- **Transparent Communication**: Show users *how* we verified each claim with reasoning traces
- **Actionable Insights**: Surface trending misinformation and alert communities instantly

**EchoSheild** solves this with an autonomous AI agent that continuously monitors, detects, and verifies misinformation in real time.

---

## 🚀 Solution Overview

EchoSheild is a full-stack platform combining:

1. **Frontend Dashboard** (React + Tailwind + Recharts)
   - Live claim feed with trust scores
   - Trending topics and misinformation trends
   - Detailed fact-check verification traces
   - Real-time alert system

2. **Backend API** (FastAPI)
   - RESTful endpoints for claims, verification, and summaries
   - SQLite database for persistent storage
   - Mock data simulation for live news/social media
   - Multilingual support

3. **Autonomous Agent** (Python + LangChain)
   - Runs continuously every 60 seconds
   - Fetches and analyzes claims
   - Uses LLM for claim clustering and reasoning
   - Verifies against trusted sources (WHO, CDC, Reuters, etc.)
   - Auto-publishes updates to dashboard

---

## 📊 Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                     EchoSheild System Architecture              │
└─────────────────────────────────────────────────────────────────┘

                         FRONTEND (React)
                    ┌─────────────────────────┐
                    │  Dashboard UI Layer     │
                    │ • Home (Stats & Trends) │
                    │ • Live Trends (Search)  │
                    │ • Fact-Check (Details)  │
                    │ • Alerts (Feed)         │
                    └──────────────┬──────────┘
                                   │ HTTP
                                   ▼
                    ┌─────────────────────────┐
         BACKEND    │   FastAPI Server        │
         (Python)   │  (0.0.0.0:8000)         │
                    │                         │
                    │ Routes:                 │
                    │ • /claims               │
                    │ • /verify               │
                    │ • /summaries            │
                    │ • /trends               │
                    │ • /stats                │
                    └──────────────┬──────────┘
                                   │ Read/Write
                                   ▼
                    ┌─────────────────────────┐
                    │   SQLite Database       │
                    │ • Claims Table          │
                    │ • Verifications Table   │
                    │ • Summaries Table       │
                    └─────────────────────────┘

                  AUTONOMOUS AGENT (Python)
              ┌──────────────────────────────────┐
              │  LLM-Powered Detection Agent     │
              │                                  │
              │  1. Fetch Claims (every 60s)    │
              │  2. Detect Misinformation       │
              │  3. Cluster Similar Claims      │
              │  4. Verify Against Sources      │
              │  5. Generate Summaries          │
              │  6. Send Dashboard Updates      │
              │                                  │
              │  Trusted Sources:                │
              │  • WHO, CDC, Reuters            │
              │  • AP, PolitiFact, Snopes       │
              │  • Government PIB               │
              └──────────────────────────────────┘
```

---

## ✨ Key Features

### 📈 Real-Time Dashboard
- **Live Stats**: Total claims, verified true, misinformation detected, average trust score
- **Interactive Charts**: Line chart for claim trends, bar chart for verification status
- **Card-Based Layout**: Modern, gradient UI with smooth transitions
- **Search & Filter**: Find claims by text or category

### 🔍 Misinformation Detection
- **Autonomous Monitoring**: Agent runs every 60 seconds
- **LLM-Powered Analysis**: Uses mock LangChain + GPT-4 simulation
- **Claim Clustering**: Groups similar claims by topic
- **Trend Detection**: Identifies emerging misinformation patterns

### ✅ Fact-Check Verification
- **Multi-Source Verification**: Cross-checks against 8+ trusted sources
- **Trust Score (0-100%)**: Visual progress bar and color coding
- **Verification Reasoning**: Shows *how* each claim was verified
- **Source Attribution**: Lists exact sources consulted

### 🚨 Alert System
- **Severity Levels**: Critical 🔴 → High 🟠 → Medium 🟡 → Low 🟢
- **Real-Time Feed**: New misinformation surfaced immediately
- **Proof of Action**: Shows what action was taken (fact-check published, etc.)
- **Alert Preferences**: Customize notifications by severity

### 🌐 Multilingual Support
- **Mock Translations**: Summaries available in EN, ES, FR, HI
- **Extensible**: Easy to add real translation APIs

---

## 📁 Project Structure

```
EchoSheild/
├── frontend/                      # React Dashboard
│   ├── public/                    # Static assets
│   ├── src/
│   │   ├── components/
│   │   │   ├── Header.jsx        # Navigation & branding
│   │   │   ├── Home.jsx          # Dashboard overview
│   │   │   ├── LiveTrends.jsx    # Trending claims & search
│   │   │   ├── FactCheckDetails.jsx  # Verification details
│   │   │   └── Alerts.jsx        # Alert feed
│   │   ├── App.jsx               # Main routing
│   │   ├── main.jsx              # React entry point
│   │   ├── index.css             # Global styles
│   │   ├── mockData.js           # Mock claims & trends
│   │   └── utils.js              # Helper functions
│   ├── index.html                # HTML template
│   ├── package.json              # Dependencies
│   ├── vite.config.js            # Build config
│   ├── tailwind.config.js        # Tailwind config
│   └── postcss.config.js         # PostCSS config
│
├── backend/                       # FastAPI Server
│   ├── main.py                   # API routes & models
│   ├── config.py                 # Configuration
│   ├── dependencies.py           # DB & middleware
│   ├── requirements.txt          # Python dependencies
│   └── echosheild.db             # SQLite database
│
├── agent/                         # Autonomous Agent
│   ├── agent.py                  # Main agent logic
│   ├── langchain_utils.py        # LangChain simulation
│   ├── requirements.txt          # Python dependencies
│   └── README.md                 # Agent documentation
│
├── assets/                        # Logos & Icons
│   ├── logo.svg                  # Main logo
│   ├── logo-text.svg             # Logo with text
│   └── icons/                    # UI icons
│
├── README.md                      # Project documentation
├── SETUP.md                       # Installation guide
├── DEMO.md                        # Demo walkthrough
└── LICENSE                        # MIT License
```

---

## 🛠️ Installation & Setup

### Prerequisites
- Node.js 16+ (for frontend)
- Python 3.10+ (for backend & agent)
- npm or yarn (frontend package manager)
- Git

### Step 1: Clone Repository
```bash
git clone https://github.com/your-username/EchoSheild.git
cd EchoSheild
```

### Step 2: Setup Frontend

```bash
cd frontend
npm install
# or
yarn install

# Start development server (port 3000)
npm run dev
```

Visit `http://localhost:3000` in your browser.

### Step 3: Setup Backend

```bash
cd backend
pip install -r requirements.txt

# Start FastAPI server (port 8000)
python main.py
```

The API will be available at `http://localhost:8000`
- API Docs: `http://localhost:8000/docs`
- ReDoc: `http://localhost:8000/redoc`

### Step 4: Setup Agent

```bash
cd agent
pip install -r requirements.txt

# Start the autonomous agent
python agent.py
```

The agent will start fetching and verifying claims every 60 seconds.

---

## 🚀 Quick Start (All Components)

Run all three components in separate terminals:

**Terminal 1: Frontend**
```bash
cd frontend
npm run dev
```

**Terminal 2: Backend**
```bash
cd backend
python main.py
```

**Terminal 3: Agent**
```bash
cd agent
python agent.py
```

Then open `http://localhost:3000` to see the dashboard.

---

## 📊 API Endpoints

### Claims
```
GET  /claims                    # Get all claims
GET  /claims/{claim_id}         # Get specific claim
POST /claims                    # Create new claim
```

### Verification
```
POST /verify/{claim_id}         # Verify a claim
GET  /summaries/{claim_id}      # Get AI summary
GET  /summaries/{claim_id}?language=es  # Multilingual
```

### Analytics
```
GET  /trends                    # Get trending claims
GET  /stats                     # Get platform statistics
GET  /sources                   # List verification sources
```

### Alerts
```
POST /alerts                    # Create alert
```

---

## 🎨 UI/UX Features

### Design System
- **Dark Theme**: Gray-900 background with accent colors
- **Gradient Headers**: Purple-to-indigo gradients
- **Status Colors**: 
  - ✅ Green for verified true
  - ❌ Red for misinformation
  - ⚠️ Yellow for partially true
- **Smooth Animations**: Fade-in on page load, hover effects
- **Responsive Grid**: Mobile-first, adapts to all screens

### Key UI Components
- **Stats Cards**: Large numbers with gradient backgrounds
- **Chart Visualizations**: Recharts line and bar charts
- **Alert Cards**: Severity-based coloring and icons
- **Modal Details**: Expandable claim verification
- **Search Bar**: Real-time filtering with debounce

---

## 🤖 Agent Workflow

```
1. INITIALIZATION
   └─ Connect to backend API
   └─ Load LLM simulator
   └─ Initialize trusted sources

2. VERIFICATION CYCLE (Every 60 seconds)
   ├─ Fetch new claims from backend
   ├─ Detect misinformation patterns
   │  ├─ Use LLM to analyze claim text
   │  ├─ Check against keywords database
   │  └─ Calculate confidence score
   ├─ Cluster similar claims by topic
   ├─ Verify against trusted sources
   │  ├─ Cross-check with 3-5 sources
   │  ├─ Calculate truth score
   │  └─ Determine status (TRUE/MISINFORMATION/PARTIAL)
   ├─ Generate human-readable summary
   └─ Send dashboard update to backend

3. ALERT CREATION
   └─ Identify high-engagement misinformation
   └─ Create CRITICAL/HIGH severity alerts
   └─ Publish to dashboard

4. CONTINUOUS MONITORING
   └─ Repeat cycle every 60 seconds
```

---

## 📈 Mock Data

The system simulates live data with:
- **5 sample claims** with varying trust scores
- **5 trending topics** with engagement metrics
- **3 active alerts** with different severity levels
- **7-point time series data** for charts
- **24-hour data generation** on-the-fly

To connect real data sources:
1. Replace `MOCK_CLAIMS` in `backend/main.py` with API calls to Twitter, news APIs, etc.
2. Integrate with real fact-check APIs (Fact-Checked.io, PolitiFact API, etc.)
3. Configure OpenAI API key in `backend/config.py` for real LLM

---

## 🌍 Multilingual Support

Summaries are available in:
- **English** (en)
- **Spanish** (es)
- **French** (fr)
- **Hindi** (hi)

Usage:
```bash
curl http://localhost:8000/summaries/1?language=es
```

---

## 🔐 Data Privacy & Security

- ✅ No personal data collection
- ✅ SQLite for local-only storage
- ✅ CORS enabled for frontend
- ✅ Fact-checks are public information
- ✅ No ads or tracking

---

## 🎓 How to Use for Demos

### Screenshot Capture
1. Start frontend: `npm run dev`
2. Navigate to each page and capture:
   - Home: Dashboard with stats
   - Live Trends: Search and trending topics
   - Fact-Check: Detailed verification view
   - Alerts: Alert feed with actions

### Live Demo
1. Start all three components
2. Show agent running in terminal (fetching & verifying)
3. Show dashboard updating with new claims
4. Click into a claim to show verification reasoning
5. Filter by trust score or category

### Devfolio Screenshots
- Recommended resolution: 1920×1080
- Show full dashboard with data
- Capture the agent terminal output
- Include API documentation page

---

## 🚀 Future Improvements

- [ ] **Real Social Media APIs**: Twitter, Reddit, TikTok stream integration
- [ ] **Real Fact-Check APIs**: Fact-Checked.io, PolitiFact, FactCheck.org
- [ ] **Production LLM**: Replace mock LLM with real OpenAI GPT-4 API
- [ ] **Telegram Bot Integration**: Real-time alerts via Telegram
- [ ] **Database Scaling**: Migrate from SQLite to PostgreSQL
- [ ] **Elasticsearch**: Full-text search for claims
- [ ] **User Authentication**: Login, saved fact-checks, subscriptions
- [ ] **Advanced Analytics**: Predict misinformation spread, impact analysis
- [ ] **Browser Extension**: Check claims while browsing
- [ ] **Mobile App**: iOS/Android native apps
- [ ] **Community Ratings**: Users can upvote/downvote fact-checks
- [ ] **API Rate Limiting**: Production-grade API security
- [ ] **Webhook System**: Alert subscriptions for platforms
- [ ] **Docker Containers**: One-command deployment

---

## 💡 Use Cases

### For News Organizations
- Real-time fact-check assistant for journalists
- Identify false claims in stories before publication

### For Social Media Platforms
- Detect and flag misinformation at scale
- Auto-label false claims with fact-checks

### For Fact-Checkers
- Prioritize claims by engagement and severity
- Automate routine verification tasks

### For General Public
- Check claims while browsing
- Understand verification reasoning

---

## 📚 Technologies Used

| Layer | Technology | Purpose |
|-------|-----------|---------|
| **Frontend** | React 18 | UI components |
| **Styling** | Tailwind CSS | Responsive design |
| **Charts** | Recharts | Data visualization |
| **Backend** | FastAPI | REST API |
| **Database** | SQLite | Data persistence |
| **Agent** | Python 3.10 | Autonomous logic |
| **LLM** | LangChain (mock) | Claim analysis |
| **Server** | Uvicorn | ASGI server |

---

## 📝 License

MIT License - See LICENSE file for details

---

## 👥 Team

Built for **Mumbai Hacks** by a team of full-stack engineers passionate about fighting misinformation.

---

## 📧 Support & Feedback

- 📧 Email: support@echosheild.dev
- 🐛 Issues: GitHub Issues
- 💬 Discussions: GitHub Discussions
- 🌐 Website: (Coming soon)

---

## 🙏 Acknowledgments

- WHO, CDC, Reuters, AP Fact-Check for trusted sources
- OpenAI for LLM capabilities
- React, FastAPI, TailwindCSS communities

---

**Made with ⚡ by the EchoSheild Team**

**"Truth at Scale, Speed at Light"**
