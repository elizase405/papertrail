import React, { useEffect, useState } from 'react';
import { FileText, Clock, CheckCircle, AlertTriangle, TrendingUp, Plus, BarChart } from 'lucide-react';
import { useDocuments } from '../context/DocumentContext';
import { useAuth } from '../context/AuthContext';
import AddDocumentModal from '../components/documents/AddDocumentModal';
import ExpiryTimeline from '../components/dashboard/ExpiryTimeline';
import DocumentChart from '../components/dashboard/DocumentChart';

const HomePage: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { documents } = useDocuments();
  const { user } = useAuth();

  useEffect(() => {
    // Add scroll reveal classes to elements
    const elements = document.querySelectorAll('.scroll-reveal, .scroll-reveal-left, .scroll-reveal-right');
    elements.forEach((el, index) => {
      setTimeout(() => {
        el.classList.add('revealed');
      }, index * 100);
    });
  }, []);

  // Calculate document stats
  const activeDocuments = documents.filter(doc => doc.status === 'active');
  const expiringDocuments = documents.filter(doc => doc.status === 'expiring');
  const expiredDocuments = documents.filter(doc => doc.status === 'expired');

  const stats = [
    {
      label: 'Total Documents',
      value: documents.length.toString(),
      icon: FileText,
      trend: '+12%',
      color: 'text-blue-600',
      bgColor: 'bg-blue-50 dark:bg-blue-900/20',
    },
    {
      label: 'Expiring Soon',
      value: expiringDocuments.length.toString(),
      icon: Clock,
      trend: expiringDocuments.length > 0 ? `+${expiringDocuments.length}` : '0',
      color: 'text-amber-600 dark:text-amber-500',
      bgColor: 'bg-amber-50 dark:bg-amber-900/20',
    },
    {
      label: 'Up to Date',
      value: activeDocuments.length.toString(),
      icon: CheckCircle,
      trend: '+5%',
      color: 'text-green-600 dark:text-green-500',
      bgColor: 'bg-green-50 dark:bg-green-900/20',
    },
    {
      label: 'Overdue',
      value: expiredDocuments.length.toString(),
      icon: AlertTriangle,
      trend: expiredDocuments.length > 0 ? `+${expiredDocuments.length}` : '0',
      color: 'text-red-600 dark:text-red-500',
      bgColor: 'bg-red-50 dark:bg-red-900/20',
    },
  ];

  // Get recent documents (up to 4)
  const recentDocuments = [...documents]
    .sort((a, b) => new Date(b.uploadDate).getTime() - new Date(a.uploadDate).getTime())
    .slice(0, 4);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'text-green-600 bg-green-50 dark:bg-green-900/20 dark:text-green-400';
      case 'expiring':
        return 'text-amber-600 bg-amber-50 dark:bg-amber-900/20 dark:text-amber-400';
      case 'expired':
        return 'text-red-600 bg-red-50 dark:bg-red-900/20 dark:text-red-400';
      default:
        return 'text-gray-600 bg-gray-50 dark:bg-gray-700 dark:text-gray-400';
    }
  };

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="fade-in-section dashboard-overview">
        <div className="minimal-card p-8 bg-gradient-to-br from-gray-900 to-gray-800 text-white dark:from-gray-800 dark:to-gray-900">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-2">Welcome back, {user?.name || 'User'}</h1>
              <p className="text-gray-300 text-lg">
                Keep your compliance on track with PaperTrail
              </p>
            </div>
            <div className="hidden md:block">
              <div className="w-20 h-20 bg-white/10 rounded-2xl flex items-center justify-center">
                <FileText className="w-10 h-10 text-white/80" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div key={index} className={`fade-in-section stagger-delay-${index + 1}`}>
            <div className="minimal-card p-6 hover:scale-105 transition-all duration-300 dark:bg-gray-800">
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-xl ${stat.bgColor}`}>
                  <stat.icon className={`w-6 h-6 ${stat.color}`} />
                </div>
                <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                  <TrendingUp className="w-4 h-4 mr-1" />
                  {stat.trend}
                </div>
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900 dark:text-white mb-1">{stat.value}</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">{stat.label}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Expiry Timeline and Document Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Expiry Timeline */}
        <div className="fade-in-section">
          <div className="minimal-card p-6 dark:bg-gray-800">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">Expiry Timeline</h2>
              <a href="/expiry-tracker" className="text-sm text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors">
                View all
              </a>
            </div>
            
            <ExpiryTimeline documents={documents} />
          </div>
        </div>

        {/* Document Chart */}
        <div className="fade-in-section">
          <div className="minimal-card p-6 dark:bg-gray-800">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">Document Overview</h2>
              <div className="flex items-center space-x-2">
                <BarChart className="w-5 h-5 text-gray-500 dark:text-gray-400" />
              </div>
            </div>
            
            <DocumentChart 
              active={activeDocuments.length} 
              expiring={expiringDocuments.length} 
              expired={expiredDocuments.length} 
            />
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Documents */}
        <div className="lg:col-span-2 fade-in-section">
          <div className="minimal-card p-6 dark:bg-gray-800">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">Recent Documents</h2>
              <a href="/documents" className="text-sm text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors">
                View all
              </a>
            </div>
            
            <div className="space-y-4">
              {recentDocuments.length > 0 ? (
                recentDocuments.map((doc) => (
                  <div key={doc.id} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 bg-white dark:bg-gray-800 rounded-xl flex items-center justify-center shadow-sm">
                        <FileText className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-900 dark:text-white">{doc.name}</h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400">{doc.type} • Expires {doc.expiryDate}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(doc.status)}`}>
                        {doc.status === 'active' ? 'Active' : doc.status === 'expiring' ? 'Expiring' : 'Expired'}
                      </span>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                        {doc.daysUntilExpiry > 0 ? `${doc.daysUntilExpiry} days left` : `${Math.abs(doc.daysUntilExpiry)} days overdue`}
                      </p>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-8">
                  <FileText className="w-12 h-12 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
                  <p className="text-gray-500 dark:text-gray-400 mb-4">No documents yet</p>
                  <button 
                    onClick={() => setIsModalOpen(true)}
                    className="minimal-button-primary add-document-button"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Add Your First Document
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="space-y-6 fade-in-section">
          <div className="minimal-card p-6 dark:bg-gray-800">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Quick Actions</h3>
            <div className="space-y-3">
              <button 
                className="minimal-button-primary w-full add-document-button"
                onClick={() => setIsModalOpen(true)}
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Document
              </button>
              <a href="/expiry-tracker" className="minimal-button-secondary w-full inline-flex items-center justify-center expiry-tracker-link">
                <Clock className="w-4 h-4 mr-2" />
                Check Expiries
              </a>
              <a href="/documents" className="minimal-button-secondary w-full inline-flex items-center justify-center documents-link">
                <TrendingUp className="w-4 h-4 mr-2" />
                View All Documents
              </a>
            </div>
          </div>

          <div className="minimal-card p-6 bg-gradient-to-br from-green-50 to-emerald-50 border-green-200 dark:from-green-900/20 dark:to-emerald-900/20 dark:border-green-900/30">
            <div className="text-center">
              <CheckCircle className="w-12 h-12 text-green-600 dark:text-green-500 mx-auto mb-3" />
              <h3 className="text-lg font-bold text-green-900 dark:text-green-400 mb-2">All Set!</h3>
              <p className="text-sm text-green-700 dark:text-green-300">
                Your compliance score is excellent. Keep up the great work!
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Add Document Modal */}
      <AddDocumentModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
};

export default HomePage;