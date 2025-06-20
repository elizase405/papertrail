import React from 'react';
import { Document } from '../../context/DocumentContext';
import { FileText } from 'lucide-react';

interface ExpiryTimelineProps {
  documents: Document[];
}

const ExpiryTimeline: React.FC<ExpiryTimelineProps> = ({ documents }) => {
  // Get the current date
  const today = new Date();
  
  // Filter and sort documents by expiry date
  const upcomingExpirations = [...documents]
    .filter(doc => {
      const expiryDate = new Date(doc.expiryDate);
      return expiryDate >= today && doc.daysUntilExpiry <= 90; // Show next 90 days
    })
    .sort((a, b) => new Date(a.expiryDate).getTime() - new Date(b.expiryDate).getTime())
    .slice(0, 5); // Show only the next 5 expirations

  // Group documents by month
  const groupedByMonth: Record<string, Document[]> = {};
  
  upcomingExpirations.forEach(doc => {
    const expiryDate = new Date(doc.expiryDate);
    const monthYear = expiryDate.toLocaleString('default', { month: 'long', year: 'numeric' });
    
    if (!groupedByMonth[monthYear]) {
      groupedByMonth[monthYear] = [];
    }
    
    groupedByMonth[monthYear].push(doc);
  });

  const getStatusColor = (daysUntilExpiry: number) => {
    if (daysUntilExpiry <= 7) {
      return 'bg-red-500 dark:bg-red-600';
    } else if (daysUntilExpiry <= 30) {
      return 'bg-amber-500 dark:bg-amber-600';
    } else {
      return 'bg-green-500 dark:bg-green-600';
    }
  };

  if (upcomingExpirations.length === 0) {
    return (
      <div className="text-center py-8">
        <FileText className="w-12 h-12 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
        <p className="text-gray-500 dark:text-gray-400">No upcoming expirations in the next 90 days</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="relative">
        {/* Timeline line */}
        <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gray-200 dark:bg-gray-700"></div>
        
        {/* Timeline items */}
        <div className="space-y-8">
          {Object.entries(groupedByMonth).map(([month, docs]) => (
            <div key={month} className="relative">
              {/* Month label */}
              <div className="mb-4 ml-10 text-sm font-medium text-gray-600 dark:text-gray-400">
                {month}
              </div>
              
              {/* Documents in this month */}
              <div className="space-y-4">
                {docs.map(doc => (
                  <div key={doc.id} className="flex items-start">
                    {/* Timeline dot */}
                    <div className={`relative z-10 flex items-center justify-center w-8 h-8 rounded-full ${getStatusColor(doc.daysUntilExpiry)} shadow-md`}>
                      <span className="text-white text-xs font-bold">
                        {new Date(doc.expiryDate).getDate()}
                      </span>
                    </div>
                    
                    {/* Document card */}
                    <div className="flex-1 ml-4 p-4 bg-white dark:bg-gray-700 rounded-lg shadow-sm">
                      <div className="flex justify-between">
                        <div>
                          <h4 className="font-medium text-gray-900 dark:text-white">{doc.name}</h4>
                          <p className="text-sm text-gray-500 dark:text-gray-400">{doc.type}</p>
                        </div>
                        <div className="text-right">
                          <span className="text-sm font-medium text-gray-900 dark:text-white">{doc.daysUntilExpiry} days</span>
                          <p className="text-xs text-gray-500 dark:text-gray-400">remaining</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ExpiryTimeline;