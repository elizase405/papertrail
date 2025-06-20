import React, { useState } from 'react';
import { X, FileText, Calendar, Upload } from 'lucide-react';
import { useDocuments } from '../../context/DocumentContext';
import { useAuth } from '../../context/AuthContext';

interface AddDocumentModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AddDocumentModal: React.FC<AddDocumentModalProps> = ({ isOpen, onClose }) => {
  const [name, setName] = useState('');
  const [type, setType] = useState('');
  const [category, setCategory] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [fileName, setFileName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const { addDocument } = useDocuments();
  const { user } = useAuth();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFileName(e.target.files[0].name);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) return;
    
    setIsSubmitting(true);
    
    // Create new document
    addDocument({
      name,
      type,
      category,
      expiryDate,
      fileName,
      uploadDate: new Date().toISOString(),
      userId: user.id
    });
    
    // Reset form and close modal
    setName('');
    setType('');
    setCategory('');
    setExpiryDate('');
    setFileName('');
    setIsSubmitting(false);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
          <div className="absolute inset-0 bg-gray-500 opacity-75 dark:bg-gray-900 dark:opacity-90"></div>
        </div>

        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

        <div 
          className="inline-block align-bottom bg-white dark:bg-gray-800 rounded-xl text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
          role="dialog" 
          aria-modal="true" 
          aria-labelledby="modal-headline"
        >
          <div className="absolute top-0 right-0 pt-4 pr-4">
            <button
              type="button"
              onClick={onClose}
              className="bg-white dark:bg-gray-800 rounded-xl text-gray-400 hover:text-gray-500 dark:hover:text-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
            >
              <span className="sr-only">Close</span>
              <X className="h-6 w-6" />
            </button>
          </div>
          
          <div className="px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div className="sm:flex sm:items-start">
              <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white" id="modal-headline">
                  Add New Document
                </h3>
                <div className="mt-6">
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Document Name
                      </label>
                      <div className="mt-1 relative rounded-xl shadow-sm">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <FileText className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                          type="text"
                          id="name"
                          required
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          className="minimal-input pl-10 dark:bg-gray-700 dark:text-white dark:border-gray-600"
                          placeholder="e.g. Business License"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="type" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                          Document Type
                        </label>
                        <select
                          id="type"
                          required
                          value={type}
                          onChange={(e) => setType(e.target.value)}
                          className="minimal-input dark:bg-gray-700 dark:text-white dark:border-gray-600"
                        >
                          <option value="" disabled>Select type</option>
                          <option value="License">License</option>
                          <option value="Certificate">Certificate</option>
                          <option value="ID">ID</option>
                          <option value="Policy">Policy</option>
                          <option value="Registration">Registration</option>
                          <option value="Insurance">Insurance</option>
                          <option value="Other">Other</option>
                        </select>
                      </div>

                      <div>
                        <label htmlFor="category" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                          Category
                        </label>
                        <select
                          id="category"
                          value={category}
                          onChange={(e) => setCategory(e.target.value)}
                          className="minimal-input dark:bg-gray-700 dark:text-white dark:border-gray-600"
                        >
                          <option value="" disabled>Select category</option>
                          <option value="Legal">Legal</option>
                          <option value="Finance">Finance</option>
                          <option value="HR">HR</option>
                          <option value="Security">Security</option>
                          <option value="Safety">Safety</option>
                          <option value="Privacy">Privacy</option>
                          <option value="Other">Other</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label htmlFor="expiryDate" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Expiry Date
                      </label>
                      <div className="mt-1 relative rounded-xl shadow-sm">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <Calendar className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                          type="date"
                          id="expiryDate"
                          required
                          value={expiryDate}
                          onChange={(e) => setExpiryDate(e.target.value)}
                          className="minimal-input pl-10 dark:bg-gray-700 dark:text-white dark:border-gray-600"
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="file" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Upload Document
                      </label>
                      <div className="mt-1">
                        <div className="flex items-center justify-center w-full">
                          <label className="flex flex-col w-full h-32 border-2 border-gray-300 border-dashed rounded-xl cursor-pointer hover:bg-gray-50 dark:border-gray-600 dark:hover:bg-gray-700">
                            <div className="flex flex-col items-center justify-center pt-7">
                              <Upload className="w-8 h-8 text-gray-400" />
                              <p className="pt-1 text-sm text-gray-600 dark:text-gray-400">
                                {fileName ? fileName : "Drag & drop a file or click to browse"}
                              </p>
                            </div>
                            <input 
                              type="file" 
                              className="hidden" 
                              onChange={handleFileChange}
                            />
                          </label>
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-gray-50 dark:bg-gray-700 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            <button
              type="button"
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="minimal-button-primary w-full sm:w-auto sm:ml-3"
            >
              {isSubmitting ? 'Adding...' : 'Add Document'}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="minimal-button-secondary w-full sm:w-auto mt-3 sm:mt-0"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddDocumentModal;