import React, { useEffect } from 'react';
import { FileText, Clock, CheckCircle, AlertTriangle, TrendingUp, Plus } from 'lucide-react';

const HomePage: React.FC = () => {
  useEffect(() => {
    // Add scroll reveal classes to elements
    const elements = document.querySelectorAll('.scroll-reveal, .scroll-reveal-left, .scroll-reveal-right');
    elements.forEach((el, index) => {
      setTimeout(() => {
        el.classList.add('revealed');
      }, index * 100);
    });
  }, []);

  const stats = [
    {
      label: 'Total Documents',
      value: '247',
      icon: FileText,
      trend: '+12%',
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
    },
    {
      label: 'Expiring Soon',
      value: '8',
      icon: Clock,
      trend: '-3%',
      color: 'text-amber-600',
      bgColor: 'bg-amber-50',
    },
    {
      label: 'Up to Date',
      value: '231',
      icon: CheckCircle,
      trend: '+5%',
      color: 'text-green-600',
      bgColor: 'bg-green-50',
    },
    {
      label: 'Overdue',
      value: '8',
      icon: AlertTriangle,
      trend: '+2',
      color: 'text-red-600',
      bgColor: 'bg-red-50',
    },
  ];

  const recentDocuments = [
    {
      name: 'ISO 27001 Certificate',
      type: 'Certificate',
      expiryDate: '2024-12-15',
      status: 'active',
      daysLeft: 320,
    },
    {
      name: 'Business License',
      type: 'License',
      expiryDate: '2024-03-20',
      status: 'expiring',
      daysLeft: 25,
    },
    {
      name: 'Fire Safety Certificate',
      type: 'Certificate',
      expiryDate: '2024-01-10',
      status: 'expired',
      daysLeft: -15,
    },
    {
      name: 'Data Protection Registration',
      type: 'Registration',
      expiryDate: '2024-08-30',
      status: 'active',
      daysLeft: 180,
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'text-green-600 bg-green-50';
      case 'expiring':
        return 'text-amber-600 bg-amber-50';
      case 'expired':
        return 'text-red-600 bg-red-50';
      default:
        return 'text-gray-600 bg-gray-50';
    }
  };

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="fade-in-section">
        <div className="minimal-card p-8 bg-gradient-to-br from-gray-900 to-gray-800 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-2">Welcome back, John</h1>
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
            <div className="minimal-card p-6 hover:scale-105 transition-all duration-300">
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-xl ${stat.bgColor}`}>
                  <stat.icon className={`w-6 h-6 ${stat.color}`} />
                </div>
                <div className="flex items-center text-sm text-gray-500">
                  <TrendingUp className="w-4 h-4 mr-1" />
                  {stat.trend}
                </div>
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</p>
                <p className="text-sm text-gray-600">{stat.label}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Documents */}
        <div className="lg:col-span-2 fade-in-section">
          <div className="minimal-card p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900">Recent Documents</h2>
              <button className="text-sm text-gray-600 hover:text-gray-900 transition-colors">
                View all
              </button>
            </div>
            
            <div className="space-y-4">
              {recentDocuments.map((doc, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-sm">
                      <FileText className="w-5 h-5 text-gray-600" />
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900">{doc.name}</h3>
                      <p className="text-sm text-gray-500">{doc.type} • Expires {doc.expiryDate}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(doc.status)}`}>
                      {doc.status === 'active' ? 'Active' : doc.status === 'expiring' ? 'Expiring' : 'Expired'}
                    </span>
                    <p className="text-xs text-gray-500 mt-1">
                      {doc.daysLeft > 0 ? `${doc.daysLeft} days left` : `${Math.abs(doc.daysLeft)} days overdue`}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="space-y-6 fade-in-section">
          <div className="minimal-card p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Quick Actions</h3>
            <div className="space-y-3">
              <button className="minimal-button-primary w-full">
                <Plus className="w-4 h-4 mr-2" />
                Add Document
              </button>
              <button className="minimal-button-secondary w-full">
                <Clock className="w-4 h-4 mr-2" />
                Check Expiries
              </button>
              <button className="minimal-button-secondary w-full">
                <TrendingUp className="w-4 h-4 mr-2" />
                View Reports
              </button>
            </div>
          </div>

          <div className="minimal-card p-6 bg-gradient-to-br from-green-50 to-emerald-50 border-green-200">
            <div className="text-center">
              <CheckCircle className="w-12 h-12 text-green-600 mx-auto mb-3" />
              <h3 className="text-lg font-bold text-green-900 mb-2">All Set!</h3>
              <p className="text-sm text-green-700">
                Your compliance score is excellent. Keep up the great work!
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;