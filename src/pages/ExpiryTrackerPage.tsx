import React, { useEffect, useState } from 'react';
import { Clock, AlertTriangle, Calendar, TrendingUp, Filter, ChevronDown, ChevronUp, Info } from 'lucide-react';
import { useDocuments } from '../context/DocumentContext';
import { motion } from 'framer-motion';

const ExpiryTrackerPage: React.FC = () => {
  const { documents } = useDocuments();
  const [timeFilter, setTimeFilter] = useState<'all' | '30' | '60' | '90'>('all');
  const [showDetails, setShowDetails] = useState<Record<string, boolean>>({});
  
  // Filter documents based on time range
  const filteredDocuments = documents.filter(doc => {
    if (timeFilter === 'all') return true;
    const days = parseInt(timeFilter);
    return doc.daysUntilExpiry <= days && doc.daysUntilExpiry > 0;
  });
  
  // Filter documents that are expiring soon (within 30 days)
  const expiringDocuments = filteredDocuments
    .filter(doc => doc.status === 'expiring')
    .sort((a, b) => a.daysUntilExpiry - b.daysUntilExpiry);

  // Filter expired documents
  const expiredDocuments = documents
    .filter(doc => doc.status === 'expired')
    .sort((a, b) => b.daysUntilExpiry - a.daysUntilExpiry); // Sort by most recently expired

  useEffect(() => {
    // Add scroll reveal effect
    const elements = document.querySelectorAll('.fade-in-section');
    elements.forEach((el, index) => {
      setTimeout(() => {
        el.classList.add('is-visible');
      }, index * 100);
    });
  }, []);

  const toggleDetails = (id: string) => {
    setShowDetails(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

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
          <div className="minimal-card p-6 border-l-4 border-red-700 dark:bg-gray-800">
            <div className="flex items-center">
              <div className="p-3 rounded-xl bg-red-50 dark:bg-red-900/20 mr-4">
                <TrendingUp className="w-6 h-6 text-red-600 dark:text-red-400" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Expired Documents</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{expiredCount}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Filter Controls */}
      <div className="fade-in-section">
        <div className="minimal-card p-4 dark:bg-gray-800">
          <div className="flex items-center space-x-2">
            <Filter className="w-5 h-5 text-gray-500 dark:text-gray-400" />
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Filter by time range:</span>
            <div className="flex space-x-2">
              <button 
                onClick={() => setTimeFilter('all')}
                className={`px-3 py-1 text-sm rounded-lg ${
                  timeFilter === 'all' 
                    ? 'bg-gray-900 text-white dark:bg-gray-700' 
                    : 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300'
                }`}
              >
                All
              </button>
              <button 
                onClick={() => setTimeFilter('30')}
                className={`px-3 py-1 text-sm rounded-lg ${
                  timeFilter === '30' 
                    ? 'bg-gray-900 text-white dark:bg-gray-700' 
                    : 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300'
                }`}
              >
                30 Days
              </button>
              <button 
                onClick={() => setTimeFilter('60')}
                className={`px-3 py-1 text-sm rounded-lg ${
                  timeFilter === '60' 
                    ? 'bg-gray-900 text-white dark:bg-gray-700' 
                    : 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300'
                }`}
              >
                60 Days
              </button>
              <button 
                onClick={() => setTimeFilter('90')}
                className={`px-3 py-1 text-sm rounded-lg ${
                  timeFilter === '90' 
                    ? 'bg-gray-900 text-white dark:bg-gray-700' 
                    : 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300'
                }`}
              >
                90 Days
              </button>
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
                <motion.div 
                  key={doc.id} 
                  className={`p-4 rounded-xl border-2 ${getPriorityColor(doc.daysUntilExpiry)}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 bg-white dark:bg-gray-700 rounded-xl flex items-center justify-center shadow-sm">
                        <Calendar className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-900 dark:text-white">{doc.name}</h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          {doc.type} • Expires {new Date(doc.expiryDate).toLocaleDateString('en-US', { 
                            year: 'numeric', 
                            month: 'short', 
                            day: 'numeric' 
                          })}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-bold text-gray-900 dark:text-white">{doc.daysUntilExpiry} days</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">remaining</p>
                    </div>
                  </div>
                  
                  <div className="mt-4 flex flex-wrap gap-3">
                    <button className="minimal-button-primary text-sm">
                      Renew Now
                    </button>
                    <button className="minimal-button-secondary text-sm dark:bg-gray-700 dark:text-gray-300">
                      Set Reminder
                    </button>
                    <button 
                      onClick={() => toggleDetails(doc.id)}
                      className="minimal-button-secondary text-sm dark:bg-gray-700 dark:text-gray-300 ml-auto"
                    >
                      {showDetails[doc.id] ? (
                        <>
                          <ChevronUp className="w-4 h-4 mr-1" />
                          Hide Details
                        </>
                      ) : (
                        <>
                          <ChevronDown className="w-4 h-4 mr-1" />
                          Show Details
                        </>
                      )}
                    </button>
                  </div>

                  {/* Expanded details */}
                  {showDetails[doc.id] && (
                    <motion.div 
                      className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-700 grid grid-cols-1 md:grid-cols-2 gap-4"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      transition={{ duration: 0.3 }}
                    >
                      {doc.organization && (
                        <div>
                          <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Organization</p>
                          <p className="text-sm text-gray-600 dark:text-gray-400">{doc.organization}</p>
                        </div>
                      )}
                      
                      {doc.renewalContact && (
                        <div>
                          <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Renewal Contact</p>
                          <p className="text-sm text-gray-600 dark:text-gray-400">{doc.renewalContact}</p>
                        </div>
                      )}
                      
                      {doc.notes && (
                        <div className="md:col-span-2">
                          <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Notes</p>
                          <p className="text-sm text-gray-600 dark:text-gray-400">{doc.notes}</p>
                        </div>
                      )}
                      
                      <div className="md:col-span-2">
                        <p className="text-sm font-medium text-gray-700 dark:text-gray-300">File</p>
                        <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
                          <FileText className="w-4 h-4" />
                          <span>{doc.fileName || 'No file attached'}</span>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </motion.div>
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

      {/* Expired Documents */}
      <div className="fade-in-section">
        <div className="minimal-card p-6 dark:bg-gray-800">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
            <AlertTriangle className="w-5 h-5 text-red-500 mr-2" />
            Expired Documents
          </h2>
          
          <div className="space-y-4">
            {expiredDocuments.length > 0 ? (
              expiredDocuments.map((doc) => (
                <motion.div 
                  key={doc.id} 
                  className="p-4 rounded-xl border-2 border-red-200 bg-red-50 text-red-800 dark:bg-red-900/10 dark:border-red-800/30 dark:text-red-400"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 bg-white dark:bg-gray-700 rounded-xl flex items-center justify-center shadow-sm">
                        <AlertTriangle className="w-5 h-5 text-red-600 dark:text-red-400" />
                      </div>
                      <div>
                        <h3 className="font-medium">{doc.name}</h3>
                        <p className="text-sm text-red-700 dark:text-red-300">
                          {doc.type} • Expired {Math.abs(doc.daysUntilExpiry)} days ago
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-bold">{Math.abs(doc.daysUntilExpiry)} days</p>
                      <p className="text-sm text-red-700 dark:text-red-300">overdue</p>
                    </div>
                  </div>
                  
                  <div className="mt-4 flex flex-wrap gap-3">
                    <button className="minimal-button-primary text-sm bg-red-600 hover:bg-red-700 dark:bg-red-700 dark:hover:bg-red-600">
                      Renew Urgently
                    </button>
                    <button 
                      onClick={() => toggleDetails(doc.id)}
                      className="minimal-button-secondary text-sm dark:bg-gray-700 dark:text-gray-300 ml-auto"
                    >
                      {showDetails[doc.id] ? (
                        <>
                          <ChevronUp className="w-4 h-4 mr-1" />
                          Hide Details
                        </>
                      ) : (
                        <>
                          <ChevronDown className="w-4 h-4 mr-1" />
                          Show Details
                        </>
                      )}
                    </button>
                  </div>

                  {/* Expanded details */}
                  {showDetails[doc.id] && (
                    <motion.div 
                      className="mt-4 pt-4 border-t border-red-200 dark:border-red-800/30 grid grid-cols-1 md:grid-cols-2 gap-4"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      transition={{ duration: 0.3 }}
                    >
                      {doc.organization && (
                        <div>
                          <p className="text-sm font-medium text-red-800 dark:text-red-300">Organization</p>
                          <p className="text-sm text-red-700 dark:text-red-400">{doc.organization}</p>
                        </div>
                      )}
                      
                      {doc.renewalContact && (
                        <div>
                          <p className="text-sm font-medium text-red-800 dark:text-red-300">Renewal Contact</p>
                          <p className="text-sm text-red-700 dark:text-red-400">{doc.renewalContact}</p>
                        </div>
                      )}
                      
                      {doc.notes && (
                        <div className="md:col-span-2">
                          <p className="text-sm font-medium text-red-800 dark:text-red-300">Notes</p>
                          <p className="text-sm text-red-700 dark:text-red-400">{doc.notes}</p>
                        </div>
                      )}
                    </motion.div>
                  )}
                </motion.div>
              ))
            ) : (
              <div className="text-center py-8">
                <CheckCircle className="w-12 h-12 text-green-500 dark:text-green-400 mx-auto mb-4" />
                <p className="text-gray-500 dark:text-gray-400">No expired documents</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Renewal Tips */}
      <div className="fade-in-section">
        <div className="minimal-card p-6 dark:bg-gray-800">
          <div className="flex items-center space-x-2 mb-4">
            <Info className="w-5 h-5 text-blue-500" />
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">Renewal Tips</h2>
          </div>
          
          <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-xl">
            <ul className="space-y-2 text-sm text-blue-800 dark:text-blue-300">
              <li className="flex items-start">
                <span className="inline-block w-4 h-4 rounded-full bg-blue-200 dark:bg-blue-700 mr-2 mt-1"></span>
                <span>Start renewal processes at least 30 days before expiration</span>
              </li>
              <li className="flex items-start">
                <span className="inline-block w-4 h-4 rounded-full bg-blue-200 dark:bg-blue-700 mr-2 mt-1"></span>
                <span>Set calendar reminders for important document deadlines</span>
              </li>
              <li className="flex items-start">
                <span className="inline-block w-4 h-4 rounded-full bg-blue-200 dark:bg-blue-700 mr-2 mt-1"></span>
                <span>Keep contact information for renewal authorities up to date</span>
              </li>
              <li className="flex items-start">
                <span className="inline-block w-4 h-4 rounded-full bg-blue-200 dark:bg-blue-700 mr-2 mt-1"></span>
                <span>Consider auto-renewal options for recurring documents</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

// Helper component for FileText icon
const FileText = ({ className }: { className?: string }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width="24" 
    height="24" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
    <polyline points="14 2 14 8 20 8"></polyline>
    <line x1="16" y1="13" x2="8" y2="13"></line>
    <line x1="16" y1="17" x2="8" y2="17"></line>
    <polyline points="10 9 9 9 8 9"></polyline>
  </svg>
);

// Helper component for CheckCircle icon
const CheckCircle = ({ className }: { className?: string }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width="24" 
    height="24" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
    <polyline points="22 4 12 14.01 9 11.01"></polyline>
  </svg>
);

export default ExpiryTrackerPage;