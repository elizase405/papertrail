import React, { useEffect } from 'react';
import { Clock, AlertTriangle, Calendar, TrendingUp } from 'lucide-react';
import { useDocuments } from '../context/DocumentContext';

const ExpiryTrackerPage: React.FC = () => {
  const { documents } = useDocuments();
  
  // Filter documents that are expiring soon (within 30 days)
  const expiringDocuments = documents
    .filter(doc => doc.status === 'expiring')
    .sort((a, b) => a.daysUntilExpiry - b.daysUntilExpiry);

  useEffect(() => {
    // Add scroll reveal effect
    const elements = document.querySelectorAll('.fade-in-section');
    elements.forEach((el, index) => {
      setTimeout(() => {
        el.classList.add('is-visible');
      }, index * 100);
    });
  }, []);

  const getPriorityColor = (daysLeft: number) => {
    if (daysLeft <= 7) {
      return 'text-red-600 bg-red-50 border-red-200 dark:text-red-400 dark:bg-red-900/20 dark:border-red-800/30';
    } else if (daysLeft <= 14) {
      return 'text-amber-600 bg-amber-50 border-amber-200 dark:text-amber-400 dark:bg-amber-900/20 dark:border-amber-800/30';
    } else {
      return 'text-blue-600 bg-blue-50 border-blue-200 dark:text-blue-400 dark:bg-blue-900/20 dark:border-blue-800/30';
    }
  };

  // Count documents by status
  const expiringThisMonth = documents.filter(doc => doc.status === 'expiring').length;
  const expiringNext3Months = documents.filter(doc => 
    doc.status === 'active' && doc.daysUntilExpiry <= 90
  ).length;
  const expiredCount = documents.filter(doc => doc.status === 'expired').length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="fade-in-section">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Expiry Tracker</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">Stay ahead of document expiration dates</p>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="fade-in-section">
          <div className="minimal-card p-6 border-l-4 border-red-500 dark:bg-gray-800">
            <div className="flex items-center">
              <div className="p-3 rounded-xl bg-red-50 dark:bg-red-900/20 mr-4">
                <AlertTriangle className="w-6 h-6 text-red-600 dark:text-red-400" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Expiring This Month</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{expiringThisMonth}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="fade-in-section">
          <div className="minimal-card p-6 border-l-4 border-amber-500 dark:bg-gray-800">
            <div className="flex items-center">
              <div className="p-3 rounded-xl bg-amber-50 dark:bg-amber-900/20 mr-4">
                <Clock className="w-6 h-6 text-amber-600 dark:text-amber-400" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Next 3 Months</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{expiringNext3Months}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="fade-in-section">
          <div className="minimal-card p-6 border-l-4 border-green-500 dark:bg-gray-800">
            <div className="flex items-center">
              <div className="p-3 rounded-xl bg-green-50 dark:bg-green-900/20 mr-4">
                <TrendingUp className="w-6 h-6 text-green-600 dark:text-green-400" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Expired Documents</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{expiredCount}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Expiring Documents */}
      <div className="fade-in-section">
        <div className="minimal-card p-6 dark:bg-gray-800">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Documents Expiring Soon</h2>
          
          <div className="space-y-4">
            {expiringDocuments.length > 0 ? (
              expiringDocuments.map((doc) => (
                <div key={doc.id} className={`p-4 rounded-xl border-2 ${getPriorityColor(doc.daysUntilExpiry)}`}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 bg-white dark:bg-gray-700 rounded-xl flex items-center justify-center shadow-sm">
                        <Calendar className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-900 dark:text-white">{doc.name}</h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400">{doc.type} • Expires {doc.expiryDate}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-bold text-gray-900 dark:text-white">{doc.daysUntilExpiry} days</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">remaining</p>
                    </div>
                  </div>
                  
                  <div className="mt-4 flex space-x-3">
                    <button className="minimal-button-primary text-sm">
                      Renew Now
                    </button>
                    <button className="minimal-button-secondary text-sm dark:bg-gray-700 dark:text-gray-300">
                      Set Reminder
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-8">
                <Clock className="w-12 h-12 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
                <p className="text-gray-500 dark:text-gray-400">No documents expiring soon</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExpiryTrackerPage;