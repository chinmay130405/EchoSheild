/**
 * Alerts page - Alert feed and notifications
 */
import React, { useState } from 'react';
import { mockAlerts } from '../mockData';
import { getSeverityIcon } from '../utils';

export const Alerts = () => {
  const [filterSeverity, setFilterSeverity] = useState('ALL');

  const filteredAlerts = filterSeverity === 'ALL' 
    ? mockAlerts 
    : mockAlerts.filter(alert => alert.severity === filterSeverity);

  return (
    <div className="space-y-6 pb-8">
      {/* Alert Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="card p-6 bg-gradient-to-br from-red-900 to-red-800">
          <div className="text-gray-300 text-sm mb-2">🔴 Critical</div>
          <div className="text-3xl font-bold">{mockAlerts.filter(a => a.severity === 'CRITICAL').length}</div>
        </div>
        <div className="card p-6 bg-gradient-to-br from-orange-900 to-orange-800">
          <div className="text-gray-300 text-sm mb-2">🟠 High</div>
          <div className="text-3xl font-bold">{mockAlerts.filter(a => a.severity === 'HIGH').length}</div>
        </div>
        <div className="card p-6 bg-gradient-to-br from-yellow-900 to-yellow-800">
          <div className="text-gray-300 text-sm mb-2">🟡 Medium</div>
          <div className="text-3xl font-bold">{mockAlerts.filter(a => a.severity === 'MEDIUM').length}</div>
        </div>
        <div className="card p-6 bg-gradient-to-br from-green-900 to-green-800">
          <div className="text-gray-300 text-sm mb-2">🟢 Low</div>
          <div className="text-3xl font-bold">{mockAlerts.filter(a => a.severity === 'LOW').length}</div>
        </div>
      </div>

      {/* Filter */}
      <div className="card p-6">
        <h3 className="text-lg font-bold mb-4">🔎 Filter Alerts</h3>
        <div className="flex gap-2 flex-wrap">
          {['ALL', 'CRITICAL', 'HIGH', 'MEDIUM', 'LOW'].map((severity) => (
            <button
              key={severity}
              onClick={() => setFilterSeverity(severity)}
              className={`px-4 py-2 rounded-lg transition-all ${
                filterSeverity === severity
                  ? 'bg-gradient-primary text-white'
                  : 'bg-gray-800 text-gray-300 hover:text-white border border-gray-700'
              }`}
            >
              {severity}
            </button>
          ))}
        </div>
      </div>

      {/* Alerts Feed */}
      <div className="card p-6">
        <h3 className="text-lg font-bold mb-4">📢 Alert Feed</h3>
        <div className="space-y-4 max-h-96 overflow-y-auto scrollbar-hide">
          {filteredAlerts.length > 0 ? (
            filteredAlerts.map((alert) => (
              <div
                key={alert.id}
                className={`p-4 rounded-lg border transition-all cursor-pointer hover:shadow-lg ${
                  alert.severity === 'CRITICAL'
                    ? 'bg-red-900/30 border-red-700 hover:border-red-600'
                    : alert.severity === 'HIGH'
                    ? 'bg-orange-900/30 border-orange-700 hover:border-orange-600'
                    : alert.severity === 'MEDIUM'
                    ? 'bg-yellow-900/30 border-yellow-700 hover:border-yellow-600'
                    : 'bg-green-900/30 border-green-700 hover:border-green-600'
                }`}
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-start gap-3 flex-1">
                    <span className="text-2xl">{getSeverityIcon(alert.severity)}</span>
                    <div className="flex-1">
                      <h4 className="font-bold text-white">{alert.title}</h4>
                      <p className="text-sm text-gray-300 mt-1">{alert.description}</p>
                    </div>
                  </div>
                  <span className={`badge text-xs whitespace-nowrap ml-2 ${
                    alert.severity === 'CRITICAL' ? 'badge-danger' :
                    alert.severity === 'HIGH' ? 'bg-orange-900 text-orange-200' :
                    alert.severity === 'MEDIUM' ? 'badge-warning' :
                    'badge-success'
                  }`}>
                    {alert.severity}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2 text-sm text-gray-400 mb-3 ml-10">
                  <div>📱 Platform: {alert.platform}</div>
                  <div>🕐 {new Date(alert.timestamp).toLocaleTimeString()}</div>
                </div>

                <div className="ml-10 p-3 bg-gray-800/50 rounded-lg border border-gray-700">
                  <p className="text-sm text-gray-300">
                    <span className="font-semibold text-green-400">✓ Action Taken:</span> {alert.actionTaken}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-8 text-gray-400">
              No alerts found for selected severity level.
            </div>
          )}
        </div>
      </div>

      {/* Alert Settings */}
      <div className="card p-6">
        <h3 className="text-lg font-bold mb-4">⚙️ Alert Preferences</h3>
        <div className="space-y-3">
          <label className="flex items-center gap-3 cursor-pointer hover:opacity-80">
            <input type="checkbox" defaultChecked className="w-4 h-4" />
            <span>📧 Email notifications for Critical & High severity alerts</span>
          </label>
          <label className="flex items-center gap-3 cursor-pointer hover:opacity-80">
            <input type="checkbox" defaultChecked className="w-4 h-4" />
            <span>🔔 In-app notifications for all alerts</span>
          </label>
          <label className="flex items-center gap-3 cursor-pointer hover:opacity-80">
            <input type="checkbox" defaultChecked className="w-4 h-4" />
            <span>📱 Push notifications on mobile</span>
          </label>
          <label className="flex items-center gap-3 cursor-pointer hover:opacity-80">
            <input type="checkbox" className="w-4 h-4" />
            <span>💬 Telegram integration for real-time alerts</span>
          </label>
        </div>
        <button className="btn btn-primary mt-4 w-full">Save Preferences</button>
      </div>
    </div>
  );
};

export default Alerts;
