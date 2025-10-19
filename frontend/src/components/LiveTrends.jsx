/**
 * Live Trends page - Display trending claims and topics
 */
import React, { useState } from 'react';
import { mockTrendingClaims, mockClaims } from '../mockData';
import { TrendingUp, TrendingDown } from 'lucide-react';

export const LiveTrends = () => {
  const [searchQuery, setSearchQuery] = useState('');
  
  const filteredClaims = mockClaims.filter(claim => 
    claim.claim.toLowerCase().includes(searchQuery.toLowerCase()) ||
    claim.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6 pb-8">
      {/* Search Bar */}
      <div className="card p-6">
        <h3 className="text-lg font-bold mb-4">🔍 Search Claims</h3>
        <input
          type="text"
          placeholder="Search by claim text or category..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
        />
      </div>

      {/* Trending Topics */}
      <div className="card p-6">
        <h3 className="text-lg font-bold mb-4">📊 Trending Topics</h3>
        <div className="space-y-3">
          {mockTrendingClaims.map((trend, idx) => (
            <div key={idx} className="bg-gray-800 p-4 rounded-lg border border-gray-700 hover:border-indigo-600 transition-all">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <h4 className="font-semibold text-white">{trend.topic}</h4>
                  <p className="text-sm text-gray-400 mt-1">
                    💬 {trend.mentions.toLocaleString()} mentions
                  </p>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <div className={`flex items-center gap-1 ${
                      trend.trustScore >= 70 ? 'text-green-400' : 
                      trend.trustScore >= 50 ? 'text-yellow-400' : 
                      'text-red-400'
                    }`}>
                      Trust: <span className="font-bold">{trend.trustScore}%</span>
                    </div>
                  </div>
                  <div className={`text-2xl ${
                    trend.trendDirection === 'up' ? 'text-red-400 animate-bounce' :
                    trend.trendDirection === 'down' ? 'text-green-400' :
                    'text-gray-400'
                  }`}>
                    {trend.trendDirection === 'up' ? '📈' : 
                     trend.trendDirection === 'down' ? '📉' : 
                     '➡️'}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Search Results */}
      {searchQuery && (
        <div className="card p-6">
          <h3 className="text-lg font-bold mb-4">🎯 Search Results ({filteredClaims.length})</h3>
          <div className="space-y-3 max-h-96 overflow-y-auto scrollbar-hide">
            {filteredClaims.length > 0 ? (
              filteredClaims.map((claim) => (
                <div key={claim.id} className="bg-gray-800 p-4 rounded-lg border border-gray-700">
                  <div className="flex items-start justify-between mb-2">
                    <p className="font-semibold flex-1">{claim.claim}</p>
                    <span className={`badge ${
                      claim.status === 'TRUE' ? 'badge-success' :
                      claim.status === 'MISINFORMATION' ? 'badge-danger' :
                      'badge-warning'
                    }`}>
                      {claim.status}
                    </span>
                  </div>
                  <p className="text-sm text-gray-400 mb-2">{claim.details}</p>
                  <div className="text-xs text-gray-500">
                    📂 {claim.category} • 🌐 {claim.source} • 👥 {claim.engagement.toLocaleString()} engagements
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-8 text-gray-400">
                No claims found matching your search.
              </div>
            )}
          </div>
        </div>
      )}

      {/* All Trending Claims */}
      <div className="card p-6">
        <h3 className="text-lg font-bold mb-4">🔥 All Trending Claims</h3>
        <div className="space-y-3 max-h-96 overflow-y-auto scrollbar-hide">
          {mockClaims.map((claim) => (
            <div key={claim.id} className="bg-gray-800 p-4 rounded-lg border border-gray-700 hover:border-indigo-600 transition-all cursor-pointer">
              <div className="flex items-start justify-between mb-2">
                <p className="font-semibold text-sm flex-1">{claim.claim}</p>
                <span className={`badge ${
                  claim.status === 'TRUE' ? 'badge-success' :
                  claim.status === 'MISINFORMATION' ? 'badge-danger' :
                  'badge-warning'
                } ml-2`}>
                  {claim.status.replace('_', ' ')}
                </span>
              </div>
              <div className="grid grid-cols-2 gap-2 text-xs text-gray-400">
                <div>📱 {claim.source}</div>
                <div className={claim.trustScore >= 70 ? 'text-green-400' : 
                              claim.trustScore >= 50 ? 'text-yellow-400' : 
                              'text-red-400'}>
                  Trust: {claim.trustScore}/100
                </div>
                <div>👥 {claim.engagement.toLocaleString()} engagements</div>
                <div>📂 {claim.category}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LiveTrends;
