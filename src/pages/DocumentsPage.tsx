import React, { useState, useEffect } from 'react';
import { Plus, FileText } from 'lucide-react';
import { useDocuments } from '../context/DocumentContext';
import DocumentFilters from '../components/documents/DocumentFilters';
import DocumentList from '../components/documents/DocumentList';
import AddDocumentModal from '../components/documents/AddDocumentModal';

const DocumentsPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [sortBy, setSortBy] = useState('expiryDate-asc');
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const { documents, searchDocuments, filterDocuments, sortDocuments } = useDocuments();
  const [filteredDocuments, setFilteredDocuments] = useState(documents);

  // Update filtered documents when filters change
  useEffect(() => {
    let result = documents;
    
    // Apply search
    if (searchTerm) {
      result = searchDocuments(searchTerm);
    }
    
    // Apply filters
    result = filterDocuments({
      type: filterType === 'all' ? undefined : filterType,
      status: filterStatus === 'all' ? undefined : filterStatus
    });
    
    // Apply sorting
    const [sortField, sortOrder] = sortBy.split('-') as ['expiryDate' | 'uploadDate', 'asc' | 'desc'];
    result = sortDocuments(sortField, sortOrder);
    
    setFilteredDocuments(result);
  }, [documents, searchTerm, filterType, filterStatus, sortBy, searchDocuments, filterDocuments, sortDocuments]);

  // Add scroll reveal effect
  useEffect(() => {
    const elements = document.querySelectorAll('.fade-in-section');
    elements.forEach((el, index) => {
      setTimeout(() => {
        el.classList.add('is-visible');
      }, index * 100);
    });
  }, []);

  const clearFilters = () => {
    setSearchTerm('');
    setFilterType('all');
    setFilterStatus('all');
    setSortBy('expiryDate-asc');
  };

  const hasActiveFilters = searchTerm !== '' || filterType !== 'all' || filterStatus !== 'all';

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="fade-in-section flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Documents</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">Manage and track all your compliance documents</p>
        </div>
        <button 
          className="minimal-button-primary"
          onClick={() => setIsModalOpen(true)}
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Document
        </button>
      </div>

      {/* Filters */}
      <div className="fade-in-section">
        <DocumentFilters 
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          filterType={filterType}
          setFilterType={setFilterType}
          filterStatus={filterStatus}
          setFilterStatus={setFilterStatus}
          sortBy={sortBy}
          setSortBy={setSortBy}
          clearFilters={clearFilters}
          hasActiveFilters={hasActiveFilters}
        />
      </div>

      {/* Documents List */}
      <div className="fade-in-section">
        <DocumentList documents={filteredDocuments} />
      </div>

      {/* Add Document Modal */}
      <AddDocumentModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
};

export default DocumentsPage;