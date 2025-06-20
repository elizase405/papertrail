import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FileText, Calendar, AlertTriangle } from 'lucide-react';
import { Document } from '../../context/DocumentContext';

interface DocumentListProps {
  documents: Document[];
}

const DocumentList: React.FC<DocumentListProps> = ({ documents }) => {
  const navigate = useNavigate();

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium text-green-800 bg-green-100 dark:bg-green-900/20 dark:text-green-400">Active</span>;
      case 'expiring':
        return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium text-amber-800 bg-amber-100 dark:bg-amber-900/20 dark:text-amber-400">Expiring Soon</span>;
      case 'expired':
        return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium text-red-800 bg-red-100 dark:bg-red-900/20 dark:text-red-400">Expired</span>;
      default:
        return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium text-gray-800 bg-gray-100 dark:bg-gray-700 dark:text-gray-300">Unknown</span>;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'expired':
        return <AlertTriangle className="w-4 h-4 text-red-500 dark:text-red-400" />;
      case 'expiring':
        return <AlertTriangle className="w-4 h-4 text-amber-500 dark:text-amber-400" />;
      default:
        return <FileText className="w-4 h-4 text-gray-500 dark:text-gray-400" />;
    }
  };

  return (
    <div className="minimal-card overflow-hidden dark:bg-gray-800">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 dark:bg-gray-700">
            <tr>
              <th className="text-left py-4 px-6 font-medium text-gray-700 dark:text-gray-300">Document</th>
              <th className="text-left py-4 px-6 font-medium text-gray-700 dark:text-gray-300">Type</th>
              <th className="text-left py-4 px-6 font-medium text-gray-700 dark:text-gray-300">Category</th>
              <th className="text-left py-4 px-6 font-medium text-gray-700 dark:text-gray-300">Expiry Date</th>
              <th className="text-left py-4 px-6 font-medium text-gray-700 dark:text-gray-300">Status</th>
              <th className="text-left py-4 px-6 font-medium text-gray-700 dark:text-gray-300">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
            {documents.map((doc) => (
              <tr key={doc.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                <td className="py-4 px-6">
                  <div className="flex items-center space-x-3">
                    {getStatusIcon(doc.status)}
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">{doc.name}</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
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
                <td className="py-4 px-6 text-gray-600 dark:text-gray-400">{doc.type}</td>
                <td className="py-4 px-6">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium text-gray-800 bg-gray-100 dark:bg-gray-700 dark:text-gray-300">
                    {doc.category || 'Uncategorized'}
                  </span>
                </td>
                <td className="py-4 px-6">
                  <div className="flex items-center space-x-2">
                    <Calendar className="w-4 h-4 text-gray-400" />
                    <span className="text-gray-600 dark:text-gray-400">{doc.expiryDate}</span>
                  </div>
                </td>
                <td className="py-4 px-6">
                  {getStatusBadge(doc.status)}
                </td>
                <td className="py-4 px-6">
                  <div className="flex space-x-2">
                    <button 
                      onClick={() => navigate(`/documents/${doc.id}`)}
                      className="text-gray-900 hover:text-gray-700 dark:text-gray-300 dark:hover:text-white text-sm font-medium transition-colors"
                    >
                      View
                    </button>
                    <button 
                      onClick={() => navigate(`/documents/edit/${doc.id}`)}
                      className="text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200 text-sm font-medium transition-colors"
                    >
                      Edit
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {documents.length === 0 && (
        <div className="text-center py-12">
          <FileText className="w-12 h-12 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
          <p className="text-gray-500 dark:text-gray-400">No documents found matching your criteria.</p>
        </div>
      )}
    </div>
  );
};

export default DocumentList;