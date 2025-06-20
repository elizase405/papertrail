import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDocuments } from '../../context/DocumentContext';
import { FileText, Calendar, Tag, Clock, ArrowLeft, Edit, Trash2, Download, Building, Mail, AlertTriangle, CheckCircle, Users, Link, ExternalLink } from 'lucide-react';
import { motion } from 'framer-motion';

const DocumentDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { getDocument, deleteDocument } = useDocuments();
  const navigate = useNavigate();
  const [isDeleting, setIsDeleting] = useState(false);
  
  const document = getDocument(id || '');
  
  if (!document) {
    return (
      <div className="text-center py-12">
        <FileText className="w-12 h-12 text-gray-300 mx-auto mb-4" />
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Document Not Found</h2>
        <p className="text-gray-500 dark:text-gray-400 mb-6">The document you're looking for doesn't exist or has been removed.</p>
        <button 
          onClick={() => navigate('/documents')}
          className="minimal-button-primary"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Documents
        </button>
      </div>
    );
  }

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

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active':
        return <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400" />;
      case 'expiring':
        return <Clock className="w-5 h-5 text-amber-600 dark:text-amber-400" />;
      case 'expired':
        return <AlertTriangle className="w-5 h-5 text-red-600 dark:text-red-400" />;
      default:
        return <FileText className="w-5 h-5 text-gray-600 dark:text-gray-400" />;
    }
  };

  const handleDelete = () => {
    setIsDeleting(true);
    setTimeout(() => {
      deleteDocument(document.id);
      navigate('/documents');
    }, 500);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="space-y-6">
      {/* Header with back button */}
      <div className="flex items-center space-x-4">
        <button 
          onClick={() => navigate('/documents')}
          className="p-2 rounded-xl text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Document Details</h1>
      </div>

      {/* Document card */}
      <motion.div 
        className="minimal-card p-6 dark:bg-gray-800"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.3 }}
      >
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
          <div className="flex-1">
            <div className="flex items-center space-x-3 mb-4">
              <div className="p-3 rounded-xl bg-gray-100 dark:bg-gray-700">
                <FileText className="w-6 h-6 text-gray-700 dark:text-gray-300" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">{document.name}</h2>
                <div className="flex items-center mt-1">
                  <span className="text-gray-500 dark:text-gray-400 text-sm">{document.type}</span>
                  <span className={`ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(document.status)}`}>
                    {document.status === 'active' ? 'Active' : document.status === 'expiring' ? 'Expiring Soon' : 'Expired'}
                  </span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-xl">
                <div className="flex items-center space-x-2 mb-3">
                  <Calendar className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                  <h3 className="font-medium text-gray-900 dark:text-white">Dates</h3>
                </div>
                <div className="space-y-2">
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Upload Date</p>
                    <p className="font-medium text-gray-900 dark:text-white">{formatDate(document.uploadDate)}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Expiry Date</p>
                    <p className="font-medium text-gray-900 dark:text-white">{formatDate(document.expiryDate)}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Status</p>
                    <div className="flex items-center space-x-2">
                      {getStatusIcon(document.status)}
                      <p className="font-medium text-gray-900 dark:text-white">
                        {document.daysUntilExpiry > 0 
                          ? `${document.daysUntilExpiry} days remaining` 
                          : `${Math.abs(document.daysUntilExpiry)} days overdue`}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-xl">
                <div className="flex items-center space-x-2 mb-3">
                  <Building className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                  <h3 className="font-medium text-gray-900 dark:text-white">Organization</h3>
                </div>
                <div className="space-y-2">
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Issuing Organization</p>
                    <p className="font-medium text-gray-900 dark:text-white">{document.organization || 'Not specified'}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Category</p>
                    <p className="font-medium text-gray-900 dark:text-white">{document.category || 'Uncategorized'}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Renewal Contact</p>
                    <div className="flex items-center space-x-2">
                      <Mail className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                      <p className="font-medium text-gray-900 dark:text-white">{document.renewalContact || 'Not specified'}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {document.notes && (
              <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-xl mb-6">
                <h3 className="font-medium text-gray-900 dark:text-white mb-2">Notes</h3>
                <p className="text-gray-600 dark:text-gray-400">{document.notes}</p>
              </div>
            )}

            {document.fileName && (
              <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-xl mb-6">
                <h3 className="font-medium text-gray-900 dark:text-white mb-2">Attached File</h3>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <FileText className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                    <span className="text-gray-700 dark:text-gray-300">{document.fileName}</span>
                  </div>
                  <button className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white">
                    <Download className="w-5 h-5" />
                  </button>
                </div>
              </div>
            )}
            
            {/* Additional Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-xl">
                <div className="flex items-center space-x-2 mb-3">
                  <Users className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                  <h3 className="font-medium text-gray-900 dark:text-white">Access & Sharing</h3>
                </div>
                <div className="space-y-2">
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Shared With</p>
                    <p className="font-medium text-gray-900 dark:text-white">Only you</p>
                  </div>
                  <div>
                    <button className="text-sm text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 flex items-center">
                      <Link className="w-4 h-4 mr-1" />
                      Share document
                    </button>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-xl">
                <div className="flex items-center space-x-2 mb-3">
                  <ExternalLink className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                  <h3 className="font-medium text-gray-900 dark:text-white">Related Resources</h3>
                </div>
                <div className="space-y-2">
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Renewal Website</p>
                    <a href="#" className="font-medium text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300">
                      Visit renewal portal
                    </a>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Related Documents</p>
                    <p className="font-medium text-gray-900 dark:text-white">None linked</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap gap-3 mt-6 pt-6 border-t border-gray-100 dark:border-gray-700">
          <button 
            onClick={() => navigate(`/documents/edit/${document.id}`)}
            className="minimal-button-primary"
          >
            <Edit className="w-4 h-4 mr-2" />
            Edit Document
          </button>
          <button 
            onClick={handleDelete}
            disabled={isDeleting}
            className="minimal-button-secondary bg-red-50 text-red-700 hover:bg-red-100 dark:bg-red-900/20 dark:text-red-400 dark:hover:bg-red-900/30"
          >
            <Trash2 className="w-4 h-4 mr-2" />
            {isDeleting ? 'Deleting...' : 'Delete'}
          </button>
        </div>
      </motion.div>

      {/* Renewal Timeline */}
      {document.status !== 'expired' && (
        <div className="minimal-card p-6 dark:bg-gray-800">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Renewal Timeline</h2>
          
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-0 top-0 bottom-0 w-1 bg-gray-200 dark:bg-gray-700"></div>
            
            <div className="space-y-8 ml-6">
              {/* Upload date */}
              <div className="relative">
                <div className="absolute -left-6 w-4 h-4 rounded-full bg-green-500 border-2 border-white dark:border-gray-800"></div>
                <p className="text-sm font-medium text-gray-900 dark:text-white">Document Uploaded</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">{formatDate(document.uploadDate)}</p>
              </div>
              
              {/* 30 days before expiry */}
              <div className="relative">
                <div className={`absolute -left-6 w-4 h-4 rounded-full ${document.daysUntilExpiry <= 30 ? 'bg-amber-500' : 'bg-gray-300 dark:bg-gray-600'} border-2 border-white dark:border-gray-800`}></div>
                <p className="text-sm font-medium text-gray-900 dark:text-white">30 Days Before Expiry</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {new Date(new Date(document.expiryDate).getTime() - 30 * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </p>
                <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                  {document.daysUntilExpiry <= 30 
                    ? 'Start renewal process' 
                    : 'Reminder will be sent'}
                </p>
              </div>
              
              {/* 7 days before expiry */}
              <div className="relative">
                <div className={`absolute -left-6 w-4 h-4 rounded-full ${document.daysUntilExpiry <= 7 ? 'bg-red-500' : 'bg-gray-300 dark:bg-gray-600'} border-2 border-white dark:border-gray-800`}></div>
                <p className="text-sm font-medium text-gray-900 dark:text-white">7 Days Before Expiry</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {new Date(new Date(document.expiryDate).getTime() - 7 * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </p>
                <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                  {document.daysUntilExpiry <= 7 
                    ? 'Urgent renewal required' 
                    : 'Final reminder will be sent'}
                </p>
              </div>
              
              {/* Expiry date */}
              <div className="relative">
                <div className={`absolute -left-6 w-4 h-4 rounded-full ${document.status === 'expired' ? 'bg-red-600' : 'bg-gray-300 dark:bg-gray-600'} border-2 border-white dark:border-gray-800`}></div>
                <p className="text-sm font-medium text-gray-900 dark:text-white">Expiry Date</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">{formatDate(document.expiryDate)}</p>
              </div>
              
              {/* Renewal Process */}
              <div className="relative">
                <div className="absolute -left-6 w-4 h-4 rounded-full bg-blue-500 border-2 border-white dark:border-gray-800"></div>
                <p className="text-sm font-medium text-gray-900 dark:text-white">Renewal Process</p>
                <div className="mt-2 space-y-2">
                  <div className="flex items-center">
                    <div className="w-5 h-5 rounded-full bg-gray-200 dark:bg-gray-600 flex items-center justify-center text-xs mr-2">1</div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Contact renewal authority</p>
                  </div>
                  <div className="flex items-center">
                    <div className="w-5 h-5 rounded-full bg-gray-200 dark:bg-gray-600 flex items-center justify-center text-xs mr-2">2</div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Submit renewal application</p>
                  </div>
                  <div className="flex items-center">
                    <div className="w-5 h-5 rounded-full bg-gray-200 dark:bg-gray-600 flex items-center justify-center text-xs mr-2">3</div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Pay renewal fees</p>
                  </div>
                  <div className="flex items-center">
                    <div className="w-5 h-5 rounded-full bg-gray-200 dark:bg-gray-600 flex items-center justify-center text-xs mr-2">4</div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Upload new document to PaperTrail</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DocumentDetail;