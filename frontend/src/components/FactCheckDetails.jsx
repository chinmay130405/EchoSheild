/**
 * Fact-Check Details page - Deep dive into verification
 */
import React, { useState } from 'react';
import { mockClaims, mockVerificationSources } from '../mockData';
import { formatTimeAgo } from '../utils';

export const FactCheckDetails = () => {
  const [selectedClaim, setSelectedClaim] = useState(mockClaims[0]);
  const [expandedId, setExpandedId] = useState(mockClaims[0].id);

  return (
    <div className="space-y-6 pb-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Claims List */}
        <div className="lg:col-span-1">
          <div className="card p-6">
            <h3 className="text-lg font-bold mb-4">📋 Claims List</h3>
            <div className="space-y-2 max-h-96 overflow-y-auto scrollbar-hide">
              {mockClaims.map((claim) => (
                <button
                  key={claim.id}
                  onClick={() => {
                    setSelectedClaim(claim);
                    setExpandedId(claim.id);
                  }}
                  className={`w-full p-3 rounded-lg text-left transition-all ${
                    selectedClaim.id === claim.id
                      ? 'bg-gradient-primary border border-indigo-400'
                      : 'bg-gray-800 border border-gray-700 hover:border-gray-600'
                  }`}
                >
                  <div className="text-sm font-semibold truncate">{claim.claim}</div>
                  <div className={`text-xs mt-1 ${
                    claim.trustScore >= 70 ? 'text-green-400' :
                    claim.trustScore >= 50 ? 'text-yellow-400' :
                    'text-red-400'
                  }`}>
                    Score: {claim.trustScore}/100
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Detailed View */}
        <div className="lg:col-span-2 space-y-6">
          {/* Claim Header */}
          <div className="card p-6">
            <div className="flex items-start justify-between mb-4">
              <h2 className="text-2xl font-bold">{selectedClaim.claim}</h2>
              <span className={`badge ${
                selectedClaim.status === 'TRUE' ? 'badge-success' :
                selectedClaim.status === 'MISINFORMATION' ? 'badge-danger' :
                'badge-warning'
              }`}>
                {selectedClaim.status.replace('_', ' ')}
              </span>
            </div>
            
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <p className="text-gray-400 text-sm">Source</p>
                <p className="font-semibold">📱 {selectedClaim.source}</p>
              </div>
              <div>
                <p className="text-gray-400 text-sm">Category</p>
                <p className="font-semibold">📂 {selectedClaim.category}</p>
              </div>
              <div>
                <p className="text-gray-400 text-sm">Posted</p>
                <p className="font-semibold">🕐 {formatTimeAgo(selectedClaim.timestamp)}</p>
              </div>
              <div>
                <p className="text-gray-400 text-sm">Engagement</p>
                <p className="font-semibold">👥 {selectedClaim.engagement.toLocaleString()}</p>
              </div>
            </div>
          </div>

          {/* Trust Score */}
          <div className="card p-6">
            <h3 className="text-lg font-bold mb-4">📊 Trust Score Analysis</h3>
            <div className="flex items-center gap-4">
              <div className={`text-6xl font-bold ${
                selectedClaim.trustScore >= 75 ? 'text-green-400' :
                selectedClaim.trustScore >= 50 ? 'text-yellow-400' :
                'text-red-400'
              }`}>
                {selectedClaim.trustScore}%
              </div>
              <div className="flex-1">
                <div className={`h-4 bg-gray-700 rounded-full overflow-hidden`}>
                  <div
                    className={`h-full transition-all ${
                      selectedClaim.trustScore >= 75 ? 'bg-green-500' :
                      selectedClaim.trustScore >= 50 ? 'bg-yellow-500' :
                      'bg-red-500'
                    }`}
                    style={{ width: `${selectedClaim.trustScore}%` }}
                  />
                </div>
                <p className="text-sm text-gray-400 mt-2">
                  {selectedClaim.trustScore >= 75 ? '✅ Highly Trustworthy' :
                   selectedClaim.trustScore >= 50 ? '⚠️ Partially Verified' :
                   '❌ Likely Misinformation'}
                </p>
              </div>
            </div>
          </div>

          {/* Verification Details */}
          <div className="card p-6">
            <h3 className="text-lg font-bold mb-4">🔍 Verification Details</h3>
            <div className="space-y-4">
              <div>
                <p className="text-gray-400 text-sm mb-2">Verification Method</p>
                <p className="bg-gray-800 p-3 rounded-lg">{selectedClaim.verificationMethod}</p>
              </div>
              <div>
                <p className="text-gray-400 text-sm mb-2">Detailed Finding</p>
                <p className="bg-gray-800 p-3 rounded-lg text-sm leading-relaxed">{selectedClaim.details}</p>
              </div>
            </div>
          </div>

          {/* Verification Sources */}
          <div className="card p-6">
            <h3 className="text-lg font-bold mb-4">📚 Verification Sources Used</h3>
            <div className="grid grid-cols-1 gap-2">
              {mockVerificationSources.map((source, idx) => (
                <div key={idx} className="bg-gray-800 p-3 rounded-lg flex items-center gap-2">
                  <span className="text-lg">✓</span>
                  <span>{source}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FactCheckDetails;
