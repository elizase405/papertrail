import React, { useState, useEffect } from 'react';
import { Plus, Search, Filter, FileText, Calendar, AlertTriangle } from 'lucide-react';

const DocumentsPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  useEffect(() => {
    // Add scroll reveal effect
    const elements = document.querySelectorAll('.fade-in-section');
    elements.forEach((el, index) => {
      setTimeout(() => {
        el.classList.add('is-visible');
      }, index * 100);
    });
  }, []);

  const documents = [
    {
      id: 1,
      name: 'ISO 27001 Certificate',
      type: 'Certificate',
      category: 'Security',
      expiryDate: '2024-12-15',
      status: 'active',
      daysUntilExpiry: 320,
    },
    {
      id: 2,
      name: 'Business License',
      type: 'License',
      category: 'Legal',
      expiryDate: '2024-03-20',
      status: 'expiring',
      daysUntilExpiry: 25,
    },
    {
      id: 3,
      name: 'Fire Safety Certificate',
      type: 'Certificate',
      category: 'Safety',
      expiryDate: '2024-01-10',
      status: 'expired',
      daysUntilExpiry: -15,
    },
    {
      id: 4,
      name: 'Data Protection Registration',
      type: 'Registration',
      category: 'Privacy',
      expiryDate: '2024-08-30',
      status: 'active',
      daysUntilExpiry: 180,
    },
    {
      id: 5,
      name: 'Professional Indemnity Insurance',
      type: 'Insurance',
      category: 'Finance',
      expiryDate: '2024-02-28',
      status: 'expiring',
      daysUntilExpiry: 12,
    },
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium text-green-800 bg-green-100">Active</span>;
      case 'expiring':
        return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium text-amber-800 bg-amber-100">Expiring Soon</span>;
      case 'expired':
        return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium text-red-800 bg-red-100">Expired</span>;
      default:
        return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium text-gray-800 bg-gray-100">Unknown</span>;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'expired':
        return <AlertTriangle className="w-4 h-4 text-red-500" />;
      case 'expiring':
        return <AlertTriangle className="w-4 h-4 text-amber-500" />;
      default:
        return <FileText className="w-4 h-4 text-gray-500" />;
    }
  };

  const filteredDocuments = documents.filter(doc => {
    const matchesSearch = doc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         doc.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         doc.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || doc.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="fade-in-section flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Documents</h1>
          <p className="text-gray-600 mt-1">Manage and track all your compliance documents</p>
        </div>
        <button className="minimal-button-primary">
          <Plus className="w-4 h-4 mr-2" />
          Add Document
        </button>
      </div>

      {/* Filters */}
      <div className="fade-in-section">
        <div className="minimal-card p-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search documents..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="minimal-input pl-10"
                />
              </div>
            </div>
            <div className="flex gap-3">
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="minimal-input w-auto"
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="expiring">Expiring Soon</option>
                <option value="expired">Expired</option>
              </select>
              <button className="minimal-button-secondary">
                <Filter className="w-4 h-4 mr-2" />
                More Filters
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Documents List */}
      <div className="fade-in-section">
        <div className="minimal-card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="text-left py-4 px-6 font-medium text-gray-700">Document</th>
                  <th className="text-left py-4 px-6 font-medium text-gray-700">Type</th>
                  <th className="text-left py-4 px-6 font-medium text-gray-700">Category</th>
                  <th className="text-left py-4 px-6 font-medium text-gray-700">Expiry Date</th>
                  <th className="text-left py-4 px-6 font-medium text-gray-700">Status</th>
                  <th className="text-left py-4 px-6 font-medium text-gray-700">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredDocuments.map((doc) => (
                  <tr key={doc.id} className="hover:bg-gray-50 transition-colors">
                    <td className="py-4 px-6">
                      <div className="flex items-center space-x-3">
                        {getStatusIcon(doc.status)}
                        <div>
                          <p className="font-medium text-gray-900">{doc.name}</p>
                          <p className="text-sm text-gray-500">
                            {doc.status === 'expired' 
                              ? `Expired ${Math.abs(doc.daysUntilExpiry)} days ago`
                              : doc.status === 'expiring'
                              ? `Expires in ${doc.daysUntilExpiry} days`
                              : `${doc.daysUntilExpiry} days remaining`
                            }
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-6 text-gray-600">{doc.type}</td>
                    <td className="py-4 px-6">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium text-gray-800 bg-gray-100">
                        {doc.category}
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center space-x-2">
                        <Calendar className="w-4 h-4 text-gray-400" />
                        <span className="text-gray-600">{doc.expiryDate}</span>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      {getStatusBadge(doc.status)}
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex space-x-2">
                        <button className="text-gray-900 hover:text-gray-700 text-sm font-medium transition-colors">
                          View
                        </button>
                        <button className="text-gray-600 hover:text-gray-800 text-sm font-medium transition-colors">
                          Edit
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {filteredDocuments.length === 0 && (
            <div className="text-center py-12">
              <FileText className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500">No documents found matching your criteria.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DocumentsPage;