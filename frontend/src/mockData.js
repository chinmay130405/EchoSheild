/**
 * Mock data for EchoSheild dashboard
 * Simulates live claim streams, verification results, and trending data
 */

export const mockClaims = [
  {
    id: 1,
    claim: "A new vaccine causes autism spectrum disorders",
    source: "Twitter",
    timestamp: new Date(Date.now() - 10 * 60000),
    trustScore: 8,
    status: "MISINFORMATION",
    verificationMethod: "Cross-referenced with WHO, CDC, and peer-reviewed studies",
    details: "Multiple large-scale studies involving millions of children have found no link between vaccines and autism.",
    category: "Health",
    engagement: 15234,
    verified: true
  },
  {
    id: 2,
    claim: "Renewable energy can meet 100% of global electricity demand by 2030",
    source: "News Article",
    timestamp: new Date(Date.now() - 25 * 60000),
    trustScore: 62,
    status: "PARTIALLY_TRUE",
    verificationMethod: "Fact-check against IEA reports and energy experts",
    details: "Technically feasible but requires massive infrastructure investment and policy changes. Currently infeasible by 2030.",
    category: "Environment",
    engagement: 8923,
    verified: true
  },
  {
    id: 3,
    claim: "5G technology causes COVID-19 infections",
    source: "Facebook",
    timestamp: new Date(Date.now() - 45 * 60000),
    trustScore: 5,
    status: "MISINFORMATION",
    verificationMethod: "Checked against scientific literature and expert opinions",
    details: "COVID-19 spread in countries without 5G. Viruses cannot travel via radio waves.",
    category: "Technology",
    engagement: 42156,
    verified: true
  },
  {
    id: 4,
    claim: "AI models can now pass medical licensing exams at expert level",
    source: "Research Paper",
    timestamp: new Date(Date.now() - 60 * 60000),
    trustScore: 78,
    status: "TRUE",
    verificationMethod: "Verified through peer-reviewed publications",
    details: "Recent studies show GPT-4 and specialized medical AI pass USMLE and other medical exams.",
    category: "Technology",
    engagement: 3421,
    verified: true
  },
  {
    id: 5,
    claim: "Climate change is primarily caused by solar cycles, not human activity",
    source: "Reddit",
    timestamp: new Date(Date.now() - 90 * 60000),
    trustScore: 12,
    status: "MISINFORMATION",
    verificationMethod: "Cross-checked with IPCC reports and climate science consensus",
    details: "Solar irradiance has decreased while global temperatures increased. 97% of climate scientists agree on human causation.",
    category: "Environment",
    engagement: 12543,
    verified: true
  }
];

export const mockTrendingClaims = [
  { topic: "Election Results", mentions: 1250, trendDirection: "up", trustScore: 45 },
  { topic: "Health Warnings", mentions: 980, trendDirection: "down", trustScore: 72 },
  { topic: "AI Capabilities", mentions: 876, trendDirection: "up", trustScore: 68 },
  { topic: "Economic Predictions", mentions: 654, trendDirection: "up", trustScore: 38 },
  { topic: "Medical Breakthroughs", mentions: 523, trendDirection: "stable", trustScore: 81 }
];

export const mockAlerts = [
  {
    id: 101,
    title: "Viral Misinformation Detected",
    description: "A claim about vaccine side effects is spreading rapidly on multiple platforms.",
    severity: "HIGH",
    timestamp: new Date(Date.now() - 5 * 60000),
    platform: "Twitter, Facebook",
    actionTaken: "Fact-check published and distributed to social media partners"
  },
  {
    id: 102,
    title: "Trending Unverified Claim",
    description: "New health claim gaining traction, verification in progress.",
    severity: "MEDIUM",
    timestamp: new Date(Date.now() - 20 * 60000),
    platform: "TikTok",
    actionTaken: "Expert review initiated"
  },
  {
    id: 103,
    title: "Coordinated Misinformation Campaign",
    description: "Multiple accounts posting similar false claims simultaneously.",
    severity: "CRITICAL",
    timestamp: new Date(Date.now() - 35 * 60000),
    platform: "Twitter, Instagram",
    actionTaken: "Report submitted to platform authorities"
  }
];

export const mockTimeSeriesData = [
  { time: "00:00", misinformation: 45, verified: 120, pending: 30 },
  { time: "04:00", misinformation: 52, verified: 135, pending: 28 },
  { time: "08:00", misinformation: 38, verified: 150, pending: 35 },
  { time: "12:00", misinformation: 61, verified: 165, pending: 42 },
  { time: "16:00", misinformation: 55, verified: 180, pending: 38 },
  { time: "20:00", misinformation: 73, verified: 195, pending: 50 },
  { time: "24:00", misinformation: 68, verified: 210, pending: 45 }
];

export const mockCategoryData = [
  { name: "Health", value: 35, color: "#ef4444" },
  { name: "Politics", value: 28, color: "#3b82f6" },
  { name: "Technology", value: 22, color: "#10b981" },
  { name: "Environment", value: 12, color: "#f59e0b" },
  { name: "Other", value: 3, color: "#8b5cf6" }
];

export const mockVerificationSources = [
  "World Health Organization (WHO)",
  "Centers for Disease Control (CDC)",
  "Reuters Fact-Check",
  "AP Fact-Check",
  "PolitiFact",
  "Snopes",
  "FactCheck.org",
  "Government Public Information Bureau"
];
