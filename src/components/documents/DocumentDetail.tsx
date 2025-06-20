import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDocuments } from '../../context/DocumentContext';
import { FileText, Calendar, Tag, Clock, ArrowLeft, Edit, Trash2, Download } from 'lucide-react';

const DocumentDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { getDocument, deleteDocument } = useDocuments();
  const navigate = useNavigate();
  
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

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this document?')) {
      deleteDocument(document.id);
      navigate('/documents');
    }
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
      <div className="minimal-card p-6 dark:bg-gray-800">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
          <div className="flex-1">
            <div className="flex items-center space-x-3 mb-4">
              <div className="p-3 rounded-xl bg-gray-100 dark:bg-gray-700">
                <FileText className="w-6 h-6 text-gray-700 dark:text-gray-300" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">{document.name}</h2>
                <p className="text-gray-500 dark:text-gray-400">{document.type}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div className="flex items-center space-x-2">
                <Calendar className="w-5 h-5 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Expiry Date</p>
                  <p className="font-medium text-gray-900 dark:text-white">{document.expiryDate}</p>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Clock className="w-5 h-5 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Days Remaining</p>
                  <p className="font-medium text-gray-900 dark:text-white">
                    {document.daysUntilExpiry > 0 
                      ? `${document.daysUntilExpiry} days` 
                      : `${Math.abs(document.daysUntilExpiry)} days overdue`}
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Tag className="w-5 h-5 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Category</p>
                  <p className="font-medium text-gray-900 dark:text-white">{document.category || 'Uncategorized'}</p>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Status</p>
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(document.status)}`}>
                    {document.status === 'active' ? 'Active' : document.status === 'expiring' ? 'Expiring Soon' : 'Expired'}
                  </span>
                </div>
              </div>
            </div>

            {document.fileName && (
              <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-xl mb-6">
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
            className="minimal-button-secondary bg-red-50 text-red-700 hover:bg-red-100 dark:bg-red-900/20 dark:text-red-400 dark:hover:bg-red-900/30"
          >
            <Trash2 className="w-4 h-4 mr-2" />
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DocumentDetail;