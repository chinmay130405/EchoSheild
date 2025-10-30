/**
 * Home page - Dashboard overview
 */
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { mockClaims, mockAlerts } from '../mockData';
import { formatTimeAgo, getTrustScoreColor, getTrustScoreBg, getStatusBadgeColor } from '../utils';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { mockTimeSeriesData } from '../mockData';

export const Home = () => {
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    totalClaims: 0,
    verified: 0,
    misinformation: 0,
    avgTrustScore: 0
  });

  useEffect(() => {
    // Calculate stats from mock data
    const verified = mockClaims.filter(c => c.status === 'TRUE').length;
    const misinformation = mockClaims.filter(c => c.status === 'MISINFORMATION').length;
    const avgTrust = Math.round(mockClaims.reduce((sum, c) => sum + c.trustScore, 0) / mockClaims.length);

    setStats({
      totalClaims: mockClaims.length,
      verified,
      misinformation,
      avgTrustScore: avgTrust
    });
  }, []);

  const handleClaimClick = (claimId) => {
    navigate(`/claim/${claimId}`);
  };

  return (
    <div className="space-y-6 pb-8">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="card p-6 bg-gradient-to-br from-blue-900 to-blue-800">
          <div className="text-gray-300 text-sm mb-2">📊 Total Claims</div>
          <div className="text-4xl font-bold">{stats.totalClaims}</div>
          <div className="text-gray-400 text-xs mt-2">Analyzed today</div>
        </div>

        <div className="card p-6 bg-gradient-to-br from-green-900 to-green-800">
          <div className="text-gray-300 text-sm mb-2">✅ Verified True</div>
          <div className="text-4xl font-bold">{stats.verified}</div>
          <div className="text-gray-400 text-xs mt-2">+2 this hour</div>
        </div>

        <div className="card p-6 bg-gradient-to-br from-red-900 to-red-800">
          <div className="text-gray-300 text-sm mb-2">❌ Misinformation</div>
          <div className="text-4xl font-bold">{stats.misinformation}</div>
          <div className="text-gray-400 text-xs mt-2">-1 from prev hour</div>
        </div>

        <div className="card p-6 bg-gradient-to-br from-purple-900 to-purple-800">
          <div className="text-gray-300 text-sm mb-2">📈 Avg Trust Score</div>
          <div className="text-4xl font-bold">{stats.avgTrustScore}%</div>
          <div className="text-gray-400 text-xs mt-2">Overall reliability</div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Claim Trend Chart */}
        <div className="card p-6">
          <h3 className="text-lg font-bold mb-4">📈 Claims Over Time</h3>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={mockTimeSeriesData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#444" />
              <XAxis dataKey="time" stroke="#999" />
              <YAxis stroke="#999" />
              <Tooltip 
                contentStyle={{ backgroundColor: '#1f2937', border: '1px solid #444', borderRadius: '8px' }}
                labelStyle={{ color: '#fff' }}
              />
              <Legend />
              <Line type="monotone" dataKey="verified" stroke="#10b981" strokeWidth={2} />
              <Line type="monotone" dataKey="misinformation" stroke="#ef4444" strokeWidth={2} />
              <Line type="monotone" dataKey="pending" stroke="#f59e0b" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Verification Status Chart */}
        <div className="card p-6">
          <h3 className="text-lg font-bold mb-4">🔍 Verification Status</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={mockTimeSeriesData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#444" />
              <XAxis dataKey="time" stroke="#999" />
              <YAxis stroke="#999" />
              <Tooltip 
                contentStyle={{ backgroundColor: '#1f2937', border: '1px solid #444', borderRadius: '8px' }}
                labelStyle={{ color: '#fff' }}
              />
              <Legend />
              <Bar dataKey="verified" fill="#10b981" />
              <Bar dataKey="misinformation" fill="#ef4444" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Recent Claims */}
      <div className="card p-6">
        <h3 className="text-lg font-bold mb-4">🔔 Recent Claims</h3>
        <div className="space-y-3 max-h-96 overflow-y-auto scrollbar-hide">
          {mockClaims.slice(0, 5).map((claim) => (
            <div 
              key={claim.id} 
              onClick={() => handleClaimClick(claim.id)}
              className="bg-gray-800 p-4 rounded-lg border border-gray-700 hover:border-indigo-600 hover:bg-gray-750 transition-all cursor-pointer group"
            >
              <div className="flex items-start justify-between mb-2">
                <p className="font-semibold text-sm flex-1 group-hover:text-indigo-400 transition">{claim.claim}</p>
                <span className={`badge ${getStatusBadgeColor(claim.status)} ml-2 flex-shrink-0`}>
                  {claim.status.replace('_', ' ')}
                </span>
              </div>
              <div className="flex items-center justify-between text-xs text-gray-400">
                <span>📱 {claim.source} • {formatTimeAgo(claim.timestamp)}</span>
                <span className={getTrustScoreColor(claim.trustScore)}>
                  Trust Score: {claim.trustScore}/100
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
