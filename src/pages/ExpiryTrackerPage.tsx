import React, { useEffect } from 'react';
import { Clock, AlertTriangle, Calendar, TrendingUp } from 'lucide-react';

const ExpiryTrackerPage: React.FC = () => {
  useEffect(() => {
    // Add scroll reveal effect
    const elements = document.querySelectorAll('.fade-in-section');
    elements.forEach((el, index) => {
      setTimeout(() => {
        el.classList.add('is-visible');
      }, index * 100);
    });
  }, []);

  const expiringDocuments = [
    {
      name: 'Business License',
      type: 'License',
      expiryDate: '2024-02-28',
      daysLeft: 12,
      priority: 'high',
    },
    {
      name: 'Professional Indemnity Insurance',
      type: 'Insurance',
      expiryDate: '2024-03-15',
      daysLeft: 28,
      priority: 'medium',
    },
    {
      name: 'Health & Safety Certificate',
      type: 'Certificate',
      expiryDate: '2024-04-10',
      daysLeft: 54,
      priority: 'low',
    },
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'text-red-600 bg-red-50 border-red-200';
      case 'medium':
        return 'text-amber-600 bg-amber-50 border-amber-200';
      case 'low':
        return 'text-blue-600 bg-blue-50 border-blue-200';
      default:
        return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="fade-in-section">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Expiry Tracker</h1>
          <p className="text-gray-600 mt-1">Stay ahead of document expiration dates</p>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="fade-in-section">
          <div className="minimal-card p-6 border-l-4 border-red-500">
            <div className="flex items-center">
              <div className="p-3 rounded-xl bg-red-50 mr-4">
                <AlertTriangle className="w-6 h-6 text-red-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Expiring This Month</p>
                <p className="text-2xl font-bold text-gray-900">8</p>
              </div>
            </div>
          </div>
        </div>

        <div className="fade-in-section">
          <div className="minimal-card p-6 border-l-4 border-amber-500">
            <div className="flex items-center">
              <div className="p-3 rounded-xl bg-amber-50 mr-4">
                <Clock className="w-6 h-6 text-amber-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Next 3 Months</p>
                <p className="text-2xl font-bold text-gray-900">15</p>
              </div>
            </div>
          </div>
        </div>

        <div className="fade-in-section">
          <div className="minimal-card p-6 border-l-4 border-green-500">
            <div className="flex items-center">
              <div className="p-3 rounded-xl bg-green-50 mr-4">
                <TrendingUp className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Renewal Rate</p>
                <p className="text-2xl font-bold text-gray-900">94%</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Expiring Documents */}
      <div className="fade-in-section">
        <div className="minimal-card p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Documents Expiring Soon</h2>
          
          <div className="space-y-4">
            {expiringDocuments.map((doc, index) => (
              <div key={index} className={`p-4 rounded-xl border-2 ${getPriorityColor(doc.priority)}`}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-sm">
                      <Calendar className="w-5 h-5 text-gray-600" />
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900">{doc.name}</h3>
                      <p className="text-sm text-gray-500">{doc.type} • Expires {doc.expiryDate}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold text-gray-900">{doc.daysLeft} days</p>
                    <p className="text-sm text-gray-500">remaining</p>
                  </div>
                </div>
                
                <div className="mt-4 flex space-x-3">
                  <button className="minimal-button-primary text-sm">
                    Renew Now
                  </button>
                  <button className="minimal-button-secondary text-sm">
                    Set Reminder
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Timeline View */}
      <div className="fade-in-section">
        <div className="minimal-card p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Expiry Timeline</h2>
          <div className="h-64 bg-gray-50 rounded-xl flex items-center justify-center">
            <p className="text-gray-500">Timeline visualization will be implemented here</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExpiryTrackerPage;