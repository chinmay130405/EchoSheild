import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Share2, Flag, CheckCircle, AlertCircle, XCircle } from 'lucide-react';
import { mockClaims } from '../mockData';
import { formatTimeAgo, getTrustScoreColor } from '../utils';

export default function ClaimDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const claim = mockClaims.find(c => c.id === parseInt(id));

  if (!claim) {
    return (
      <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
        <div className="text-center">
          <XCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h1 className="text-2xl font-bold mb-2">Claim Not Found</h1>
          <p className="text-gray-400 mb-6">The claim you're looking for doesn't exist.</p>
          <button
            onClick={() => navigate('/')}
            className="px-6 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg transition"
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case 'TRUE':
        return <CheckCircle className="w-6 h-6 text-green-500" />;
      case 'MISINFORMATION':
        return <XCircle className="w-6 h-6 text-red-500" />;
      case 'PARTIALLY_TRUE':
        return <AlertCircle className="w-6 h-6 text-yellow-500" />;
      default:
        return null;
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'TRUE':
        return 'bg-green-500/20 text-green-200 border-green-500/50';
      case 'MISINFORMATION':
        return 'bg-red-500/20 text-red-200 border-red-500/50';
      case 'PARTIALLY_TRUE':
        return 'bg-yellow-500/20 text-yellow-200 border-yellow-500/50';
      default:
        return 'bg-gray-500/20 text-gray-200 border-gray-500/50';
    }
  };

  const getTrustedSources = () => {
    return [
      'World Health Organization (WHO)',
      'Centers for Disease Control (CDC)',
      'Reuters Fact-Check',
      'AP Fact-Check',
      'PolitiFact',
      'Snopes',
      'FactCheck.org',
      'IPCC Climate Reports'
    ];
  };

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-900 to-blue-900 text-white py-8 px-4 sticky top-0 z-40">
        <div className="max-w-4xl mx-auto">
          <button
            onClick={() => navigate('/')}
            className="flex items-center gap-2 text-purple-200 hover:text-white mb-4 transition"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Dashboard
          </button>
          <h1 className="text-3xl font-bold">Claim Verification Details</h1>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        
        {/* Claim Card */}
        <div className="bg-gray-800 rounded-xl border border-gray-700 p-6 mb-6">
          <div className="flex items-start justify-between gap-4 mb-4">
            <div className="flex items-start gap-3 flex-1">
              {getStatusIcon(claim.status)}
              <div className="flex-1">
                <h2 className="text-2xl font-bold text-white mb-2">{claim.claim}</h2>
                <div className="flex items-center gap-3 flex-wrap">
                  <span className="text-sm text-gray-400">Source: {claim.source}</span>
                  <span className="text-xs text-gray-500">•</span>
                  <span className="text-sm text-gray-400">{formatTimeAgo(claim.timestamp)}</span>
                  <span className="text-xs text-gray-500">•</span>
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getTrustScoreColor(claim.trustScore)}`}>
                    {claim.category}
                  </span>
                </div>
              </div>
            </div>
            <button className="p-2 hover:bg-gray-700 rounded-lg transition">
              <Share2 className="w-5 h-5 text-purple-400" />
            </button>
          </div>

          {/* Status Badge */}
          <div className={`px-4 py-2 rounded-lg border inline-block ${getStatusBadge(claim.status)}`}>
            <span className="font-semibold text-sm">
              {claim.status === 'TRUE' && '✅ VERIFIED'}
              {claim.status === 'MISINFORMATION' && '❌ MISINFORMATION'}
              {claim.status === 'PARTIALLY_TRUE' && '⚠️ PARTIALLY TRUE'}
            </span>
          </div>
        </div>

        {/* Trust Score Section */}
        <div className="bg-gray-800 rounded-xl border border-gray-700 p-6 mb-6">
          <h3 className="text-xl font-bold text-white mb-4">Trust Score Analysis</h3>
          
          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-300">Confidence Level</span>
              <span className="text-2xl font-bold text-white">{claim.trustScore}%</span>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-4 overflow-hidden">
              <div
                className={`h-full transition-all ${getTrustScoreColor(claim.trustScore).split(' ')[0].replace('bg-', 'bg-')}`}
                style={{
                  width: `${claim.trustScore}%`,
                  backgroundColor: claim.trustScore >= 75 ? '#10b981' : claim.trustScore >= 50 ? '#eab308' : '#ef4444'
                }}
              ></div>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4 text-center">
            <div className="p-4 bg-gray-700 rounded-lg">
              <div className="text-2xl font-bold text-white">{claim.engagement.toLocaleString()}</div>
              <div className="text-xs text-gray-400 mt-1">Engagement</div>
            </div>
            <div className="p-4 bg-gray-700 rounded-lg">
              <div className="text-2xl font-bold text-white">{Math.ceil(claim.engagement / 100)}</div>
              <div className="text-xs text-gray-400 mt-1">Shares</div>
            </div>
            <div className="p-4 bg-gray-700 rounded-lg">
              <div className="text-2xl font-bold text-white">{Math.ceil(claim.engagement / 50)}</div>
              <div className="text-xs text-gray-400 mt-1">Comments</div>
            </div>
          </div>
        </div>

        {/* Verification Details */}
        <div className="bg-gray-800 rounded-xl border border-gray-700 p-6 mb-6">
          <h3 className="text-xl font-bold text-white mb-4">Verification Details</h3>
          
          <div className="space-y-4">
            <div>
              <h4 className="text-purple-400 font-semibold mb-2">Verification Method</h4>
              <p className="text-gray-300">{claim.verificationMethod}</p>
            </div>

            <div>
              <h4 className="text-purple-400 font-semibold mb-2">Findings</h4>
              <p className="text-gray-300">{claim.details}</p>
            </div>

            <div>
              <h4 className="text-purple-400 font-semibold mb-3">Sources Consulted</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {getTrustedSources().slice(0, 6).map((source, idx) => (
                  <div key={idx} className="flex items-center gap-2 p-3 bg-gray-700 rounded-lg hover:bg-gray-600 transition cursor-pointer">
                    <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                    <span className="text-sm text-gray-200">{source}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Related Info */}
        <div className="bg-gray-800 rounded-xl border border-gray-700 p-6 mb-6">
          <h3 className="text-xl font-bold text-white mb-4">Recommendation</h3>
          
          <div className="p-4 bg-gradient-to-r from-purple-500/10 to-blue-500/10 border border-purple-500/30 rounded-lg">
            <p className="text-gray-200">
              {claim.status === 'TRUE' && 
                "✅ This claim has been verified by multiple trusted sources. Share responsibly."}
              {claim.status === 'MISINFORMATION' && 
                "❌ This claim has been debunked. We recommend reporting it and providing fact-checked alternatives."}
              {claim.status === 'PARTIALLY_TRUE' && 
                "⚠️ This claim contains partial truths but lacks important context. Consider the full story before sharing."}
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 mb-8">
          <button className="px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition flex items-center gap-2">
            <Share2 className="w-5 h-5" />
            Share
          </button>
          <button className="px-6 py-3 bg-red-600/20 hover:bg-red-600/30 text-red-300 border border-red-500/50 rounded-lg transition flex items-center gap-2">
            <Flag className="w-5 h-5" />
            Report
          </button>
        </div>
      </div>
    </div>
  );
}
