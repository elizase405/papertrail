import React from 'react';
import { Search, Filter, X } from 'lucide-react';

interface DocumentFiltersProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  filterType: string;
  setFilterType: (type: string) => void;
  filterStatus: string;
  setFilterStatus: (status: string) => void;
  sortBy: string;
  setSortBy: (sort: string) => void;
  clearFilters: () => void;
  hasActiveFilters: boolean;
}

const DocumentFilters: React.FC<DocumentFiltersProps> = ({
  searchTerm,
  setSearchTerm,
  filterType,
  setFilterType,
  filterStatus,
  setFilterStatus,
  sortBy,
  setSortBy,
  clearFilters,
  hasActiveFilters
}) => {
  return (
    <div className="minimal-card p-6 dark:bg-gray-800">
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search documents..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="minimal-input pl-10 dark:bg-gray-700 dark:text-white dark:border-gray-600"
            />
          </div>
        </div>
        <div className="flex flex-wrap gap-3">
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="minimal-input w-auto dark:bg-gray-700 dark:text-white dark:border-gray-600"
          >
            <option value="all">All Types</option>
            <option value="License">License</option>
            <option value="Certificate">Certificate</option>
            <option value="ID">ID</option>
            <option value="Policy">Policy</option>
            <option value="Registration">Registration</option>
            <option value="Insurance">Insurance</option>
          </select>
          
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="minimal-input w-auto dark:bg-gray-700 dark:text-white dark:border-gray-600"
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="expiring">Expiring Soon</option>
            <option value="expired">Expired</option>
          </select>
          
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="minimal-input w-auto dark:bg-gray-700 dark:text-white dark:border-gray-600"
          >
            <option value="expiryDate-asc">Expiry Date (Soonest First)</option>
            <option value="expiryDate-desc">Expiry Date (Latest First)</option>
            <option value="uploadDate-desc">Date Added (Newest First)</option>
            <option value="uploadDate-asc">Date Added (Oldest First)</option>
          </select>
        </div>
      </div>
      
      {/* Active filters */}
      {hasActiveFilters && (
        <div className="mt-4 flex flex-wrap items-center gap-2">
          <span className="text-sm text-gray-600 dark:text-gray-400 flex items-center">
            <Filter className="w-4 h-4 mr-1" />
            Active filters:
          </span>
          
          {filterType !== 'all' && (
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300">
              Type: {filterType}
              <button 
                onClick={() => setFilterType('all')}
                className="ml-1 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          )}
          
          {filterStatus !== 'all' && (
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300">
              Status: {filterStatus.charAt(0).toUpperCase() + filterStatus.slice(1)}
              <button 
                onClick={() => setFilterStatus('all')}
                className="ml-1 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          )}
          
          {searchTerm && (
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300">
              Search: "{searchTerm}"
              <button 
                onClick={() => setSearchTerm('')}
                className="ml-1 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          )}
          
          <button 
            onClick={clearFilters}
            className="text-sm text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white ml-2"
          >
            Clear all
          </button>
        </div>
      )}
    </div>
  );
};

export default DocumentFilters;