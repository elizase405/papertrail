import React, { createContext, useState, useContext, useEffect } from 'react';

// Define document type
export interface Document {
  id: string;
  name: string;
  type: string;
  uploadDate: string;
  expiryDate: string;
  fileName?: string;
  status: 'active' | 'expiring' | 'expired';
  daysUntilExpiry: number;
  category?: string;
  userId: string;
}

// Define document context type
interface DocumentContextType {
  documents: Document[];
  addDocument: (document: Omit<Document, 'id' | 'status' | 'daysUntilExpiry'>) => void;
  getDocument: (id: string) => Document | undefined;
  updateDocument: (id: string, document: Partial<Document>) => void;
  deleteDocument: (id: string) => void;
  searchDocuments: (term: string) => Document[];
  filterDocuments: (filters: { type?: string; status?: string }) => Document[];
  sortDocuments: (sortBy: 'expiryDate' | 'uploadDate', order: 'asc' | 'desc') => Document[];
}

// Create context
const DocumentContext = createContext<DocumentContextType | undefined>(undefined);

// Storage key
const DOCUMENTS_STORAGE_KEY = 'papertrail_documents';

// Sample documents for testing
const sampleDocuments: Omit<Document, 'id' | 'status' | 'daysUntilExpiry'>[] = [
  {
    name: 'Business License',
    type: 'License',
    category: 'Legal',
    uploadDate: '2023-12-15',
    expiryDate: '2024-03-20',
    fileName: 'business_license_2024.pdf',
    userId: 'test@example.com'
  },
  {
    name: 'ISO 27001 Certificate',
    type: 'Certificate',
    category: 'Security',
    uploadDate: '2023-11-10',
    expiryDate: '2024-12-15',
    fileName: 'iso_27001_cert.pdf',
    userId: 'test@example.com'
  },
  {
    name: 'Fire Safety Certificate',
    type: 'Certificate',
    category: 'Safety',
    uploadDate: '2023-10-05',
    expiryDate: '2024-01-10',
    fileName: 'fire_safety_cert.pdf',
    userId: 'test@example.com'
  },
  {
    name: 'Data Protection Registration',
    type: 'Registration',
    category: 'Privacy',
    uploadDate: '2023-09-20',
    expiryDate: '2024-08-30',
    fileName: 'data_protection_reg.pdf',
    userId: 'test@example.com'
  },
  {
    name: 'Professional Indemnity Insurance',
    type: 'Insurance',
    category: 'Finance',
    uploadDate: '2023-12-01',
    expiryDate: '2024-02-28',
    fileName: 'indemnity_insurance.pdf',
    userId: 'test@example.com'
  },
  {
    name: 'Health & Safety Policy',
    type: 'Policy',
    category: 'Safety',
    uploadDate: '2023-11-15',
    expiryDate: '2024-05-15',
    fileName: 'health_safety_policy.pdf',
    userId: 'test@example.com'
  },
  {
    name: 'Employee Handbook',
    type: 'Policy',
    category: 'HR',
    uploadDate: '2023-10-10',
    expiryDate: '2024-10-10',
    fileName: 'employee_handbook.pdf',
    userId: 'test@example.com'
  },
  {
    name: 'Tax Compliance Certificate',
    type: 'Certificate',
    category: 'Finance',
    uploadDate: '2023-09-15',
    expiryDate: '2024-04-15',
    fileName: 'tax_compliance.pdf',
    userId: 'test@example.com'
  }
];

// Provider component
export const DocumentProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [documents, setDocuments] = useState<Document[]>([]);

  // Load documents from localStorage on mount
  useEffect(() => {
    const storedDocuments = localStorage.getItem(DOCUMENTS_STORAGE_KEY);
    if (storedDocuments) {
      const parsedDocuments = JSON.parse(storedDocuments);
      // Update status and daysUntilExpiry for each document
      const updatedDocuments = parsedDocuments.map((doc: Document) => {
        const { status, daysUntilExpiry } = calculateStatus(doc.expiryDate);
        return { ...doc, status, daysUntilExpiry };
      });
      setDocuments(updatedDocuments);
    } else {
      // Add sample documents if no documents exist
      const initialDocuments = sampleDocuments.map(doc => {
        const id = Date.now().toString() + Math.random().toString(36).substr(2, 5);
        const { status, daysUntilExpiry } = calculateStatus(doc.expiryDate);
        return { ...doc, id, status, daysUntilExpiry };
      });
      setDocuments(initialDocuments);
    }
  }, []);

  // Save documents to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem(DOCUMENTS_STORAGE_KEY, JSON.stringify(documents));
  }, [documents]);

  // Calculate status and days until expiry
  const calculateStatus = (expiryDate: string): { status: 'active' | 'expiring' | 'expired'; daysUntilExpiry: number } => {
    const today = new Date();
    const expiry = new Date(expiryDate);
    const diffTime = expiry.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays < 0) {
      return { status: 'expired', daysUntilExpiry: diffDays };
    } else if (diffDays <= 30) {
      return { status: 'expiring', daysUntilExpiry: diffDays };
    } else {
      return { status: 'active', daysUntilExpiry: diffDays };
    }
  };

  // Add document
  const addDocument = (document: Omit<Document, 'id' | 'status' | 'daysUntilExpiry'>) => {
    const id = Date.now().toString();
    const { status, daysUntilExpiry } = calculateStatus(document.expiryDate);
    const newDocument = { ...document, id, status, daysUntilExpiry };
    setDocuments([...documents, newDocument]);
  };

  // Get document by id
  const getDocument = (id: string) => {
    return documents.find(doc => doc.id === id);
  };

  // Update document
  const updateDocument = (id: string, updatedFields: Partial<Document>) => {
    setDocuments(documents.map(doc => {
      if (doc.id === id) {
        const updated = { ...doc, ...updatedFields };
        // Recalculate status if expiryDate was updated
        if (updatedFields.expiryDate) {
          const { status, daysUntilExpiry } = calculateStatus(updated.expiryDate);
          return { ...updated, status, daysUntilExpiry };
        }
        return updated;
      }
      return doc;
    }));
  };

  // Delete document
  const deleteDocument = (id: string) => {
    setDocuments(documents.filter(doc => doc.id !== id));
  };

  // Search documents
  const searchDocuments = (term: string) => {
    if (!term) return documents;
    const lowerTerm = term.toLowerCase();
    return documents.filter(doc => 
      doc.name.toLowerCase().includes(lowerTerm) || 
      doc.type.toLowerCase().includes(lowerTerm) ||
      (doc.category && doc.category.toLowerCase().includes(lowerTerm))
    );
  };

  // Filter documents
  const filterDocuments = (filters: { type?: string; status?: string }) => {
    return documents.filter(doc => {
      let match = true;
      if (filters.type && filters.type !== 'all') {
        match = match && doc.type === filters.type;
      }
      if (filters.status && filters.status !== 'all') {
        match = match && doc.status === filters.status;
      }
      return match;
    });
  };

  // Sort documents
  const sortDocuments = (sortBy: 'expiryDate' | 'uploadDate', order: 'asc' | 'desc') => {
    return [...documents].sort((a, b) => {
      const dateA = new Date(sortBy === 'expiryDate' ? a.expiryDate : a.uploadDate);
      const dateB = new Date(sortBy === 'expiryDate' ? b.expiryDate : b.uploadDate);
      
      return order === 'asc' 
        ? dateA.getTime() - dateB.getTime() 
        : dateB.getTime() - dateA.getTime();
    });
  };

  return (
    <DocumentContext.Provider value={{ 
      documents, 
      addDocument, 
      getDocument, 
      updateDocument, 
      deleteDocument,
      searchDocuments,
      filterDocuments,
      sortDocuments
    }}>
      {children}
    </DocumentContext.Provider>
  );
};

// Custom hook to use document context
export const useDocuments = () => {
  const context = useContext(DocumentContext);
  if (context === undefined) {
    throw new Error('useDocuments must be used within a DocumentProvider');
  }
  return context;
};