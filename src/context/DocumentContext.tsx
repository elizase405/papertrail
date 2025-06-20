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
  notes?: string;
  organization?: string;
  renewalContact?: string;
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
    userId: 'test@example.com',
    notes: 'Annual renewal required. Contact city business office 30 days before expiry.',
    organization: 'City Business Office',
    renewalContact: 'licensing@citybusiness.gov'
  },
  {
    name: 'ISO 27001 Certificate',
    type: 'Certificate',
    category: 'Security',
    uploadDate: '2023-11-10',
    expiryDate: '2024-12-15',
    fileName: 'iso_27001_cert.pdf',
    userId: 'test@example.com',
    notes: 'Requires annual audit and recertification every 3 years.',
    organization: 'International Standards Organization',
    renewalContact: 'certifications@iso.org'
  },
  {
    name: 'Fire Safety Certificate',
    type: 'Certificate',
    category: 'Safety',
    uploadDate: '2023-10-05',
    expiryDate: '2024-01-10',
    fileName: 'fire_safety_cert.pdf',
    userId: 'test@example.com',
    notes: 'Inspection required before renewal. Schedule at least 2 weeks in advance.',
    organization: 'Fire Department',
    renewalContact: 'inspections@firedept.gov'
  },
  {
    name: 'Data Protection Registration',
    type: 'Registration',
    category: 'Privacy',
    uploadDate: '2023-09-20',
    expiryDate: '2024-08-30',
    fileName: 'data_protection_reg.pdf',
    userId: 'test@example.com',
    notes: 'Annual fee based on company size. Review privacy policy before renewal.',
    organization: 'Data Protection Authority',
    renewalContact: 'registrations@dataprotection.gov'
  },
  {
    name: 'Professional Indemnity Insurance',
    type: 'Insurance',
    category: 'Finance',
    uploadDate: '2023-12-01',
    expiryDate: '2024-02-28',
    fileName: 'indemnity_insurance.pdf',
    userId: 'test@example.com',
    notes: 'Coverage: $2M. Consider increasing for next renewal period.',
    organization: 'Acme Insurance Co.',
    renewalContact: 'renewals@acmeinsurance.com'
  },
  {
    name: 'Health & Safety Policy',
    type: 'Policy',
    category: 'Safety',
    uploadDate: '2023-11-15',
    expiryDate: '2024-05-15',
    fileName: 'health_safety_policy.pdf',
    userId: 'test@example.com',
    notes: 'Annual review required. Must be signed by CEO and Health & Safety officer.',
    organization: 'Internal',
    renewalContact: 'safety@company.com'
  },
  {
    name: 'Employee Handbook',
    type: 'Policy',
    category: 'HR',
    uploadDate: '2023-10-10',
    expiryDate: '2024-10-10',
    fileName: 'employee_handbook.pdf',
    userId: 'test@example.com',
    notes: 'Annual review with legal team. Update employment laws section.',
    organization: 'Internal',
    renewalContact: 'hr@company.com'
  },
  {
    name: 'Tax Compliance Certificate',
    type: 'Certificate',
    category: 'Finance',
    uploadDate: '2023-09-15',
    expiryDate: '2024-04-15',
    fileName: 'tax_compliance.pdf',
    userId: 'test@example.com',
    notes: 'Requires all tax filings to be up to date. Schedule review with accounting.',
    organization: 'Tax Authority',
    renewalContact: 'compliance@taxauthority.gov'
  },
  {
    name: 'Software License - Adobe Creative Cloud',
    type: 'License',
    category: 'IT',
    uploadDate: '2023-08-10',
    expiryDate: '2024-08-10',
    fileName: 'adobe_cc_license.pdf',
    userId: 'test@example.com',
    notes: '25 user licenses. Consider reducing if some are unused.',
    organization: 'Adobe Inc.',
    renewalContact: 'enterprise@adobe.com'
  },
  {
    name: 'Office Lease Agreement',
    type: 'Contract',
    category: 'Facilities',
    uploadDate: '2022-06-01',
    expiryDate: '2025-06-01',
    fileName: 'office_lease.pdf',
    userId: 'test@example.com',
    notes: '3-year term with 6-month notice period for renewal negotiation.',
    organization: 'Skyline Properties',
    renewalContact: 'leasing@skylineproperties.com'
  },
  {
    name: 'GDPR Compliance Certification',
    type: 'Certificate',
    category: 'Privacy',
    uploadDate: '2023-07-15',
    expiryDate: '2024-07-15',
    fileName: 'gdpr_cert.pdf',
    userId: 'test@example.com',
    notes: 'Annual audit required. Schedule 2 months before expiry.',
    organization: 'EU Data Protection Board',
    renewalContact: 'certifications@edpb.europa.eu'
  },
  {
    name: 'Cybersecurity Insurance',
    type: 'Insurance',
    category: 'Security',
    uploadDate: '2023-11-01',
    expiryDate: '2024-11-01',
    fileName: 'cyber_insurance.pdf',
    userId: 'test@example.com',
    notes: 'Coverage: $5M. Requires annual security assessment.',
    organization: 'SecureGuard Insurance',
    renewalContact: 'cyber@secureguard.com'
  },
  {
    name: 'Food Handling License',
    type: 'License',
    category: 'Operations',
    uploadDate: '2023-10-12',
    expiryDate: '2024-04-12',
    fileName: 'food_handling_license.pdf',
    userId: 'test@example.com',
    notes: 'All staff must complete food safety training before renewal.',
    organization: 'Health Department',
    renewalContact: 'foodsafety@health.gov'
  },
  {
    name: 'Trademark Registration',
    type: 'Registration',
    category: 'Legal',
    uploadDate: '2020-05-20',
    expiryDate: '2030-05-20',
    fileName: 'trademark_registration.pdf',
    userId: 'test@example.com',
    notes: '10-year registration period. Must show proof of use between 5th and 6th year.',
    organization: 'Patent and Trademark Office',
    renewalContact: 'trademarks@pto.gov'
  },
  {
    name: 'Workers Compensation Insurance',
    type: 'Insurance',
    category: 'HR',
    uploadDate: '2023-12-05',
    expiryDate: '2024-12-05',
    fileName: 'workers_comp.pdf',
    userId: 'test@example.com',
    notes: 'Required by law. Premium based on payroll and industry classification.',
    organization: 'State Insurance Fund',
    renewalContact: 'claims@stateinsurance.gov'
  },
  {
    name: 'Environmental Compliance Permit',
    type: 'Permit',
    category: 'Compliance',
    uploadDate: '2023-08-15',
    expiryDate: '2025-08-15',
    fileName: 'environmental_permit.pdf',
    userId: 'test@example.com',
    notes: 'Biennial renewal. Requires environmental impact assessment.',
    organization: 'Environmental Protection Agency',
    renewalContact: 'permits@epa.gov'
  },
  {
    name: 'PCI DSS Compliance Certificate',
    type: 'Certificate',
    category: 'Security',
    uploadDate: '2023-11-20',
    expiryDate: '2024-11-20',
    fileName: 'pci_dss_cert.pdf',
    userId: 'test@example.com',
    notes: 'Required for credit card processing. Annual security audit needed.',
    organization: 'Payment Card Industry Security Standards Council',
    renewalContact: 'compliance@pcissc.org'
  },
  {
    name: 'Vehicle Insurance',
    type: 'Insurance',
    category: 'Fleet',
    uploadDate: '2023-09-10',
    expiryDate: '2024-03-10',
    fileName: 'vehicle_insurance.pdf',
    userId: 'test@example.com',
    notes: 'Covers 5 company vehicles. Consider bundling with other insurance policies.',
    organization: 'AutoInsure Co.',
    renewalContact: 'fleet@autoinsure.com'
  },
  {
    name: 'Domain Name Registration',
    type: 'Registration',
    category: 'IT',
    uploadDate: '2023-01-15',
    expiryDate: '2025-01-15',
    fileName: 'domain_registration.pdf',
    userId: 'test@example.com',
    notes: 'Auto-renewal enabled. Update payment method if needed.',
    organization: 'Domain Registrar Inc.',
    renewalContact: 'support@domainregistrar.com'
  },
  {
    name: 'Professional License - CPA',
    type: 'License',
    category: 'Professional',
    uploadDate: '2023-06-30',
    expiryDate: '2024-06-30',
    fileName: 'cpa_license.pdf',
    userId: 'test@example.com',
    notes: 'Requires 40 hours of continuing education credits for renewal.',
    organization: 'State Board of Accountancy',
    renewalContact: 'licensing@accountancy.gov'
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
      (doc.category && doc.category.toLowerCase().includes(lowerTerm)) ||
      (doc.organization && doc.organization.toLowerCase().includes(lowerTerm))
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