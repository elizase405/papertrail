import React from 'react';
import { motion } from 'framer-motion';

interface DocumentChartProps {
  active: number;
  expiring: number;
  expired: number;
}

const DocumentChart: React.FC<DocumentChartProps> = ({ active, expiring, expired }) => {
  const total = active + expiring + expired;
  
  // Calculate percentages
  const activePercent = total > 0 ? (active / total) * 100 : 0;
  const expiringPercent = total > 0 ? (expiring / total) * 100 : 0;
  const expiredPercent = total > 0 ? (expired / total) * 100 : 0;

  if (total === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500 dark:text-gray-400">No documents to display</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Chart */}
      <div className="h-8 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden flex">
        <motion.div 
          className="bg-green-500 h-full"
          initial={{ width: 0 }}
          animate={{ width: `${activePercent}%` }}
          transition={{ duration: 1, ease: "easeOut" }}
        />
        <motion.div 
          className="bg-amber-500 h-full"
          initial={{ width: 0 }}
          animate={{ width: `${expiringPercent}%` }}
          transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
        />
        <motion.div 
          className="bg-red-500 h-full"
          initial={{ width: 0 }}
          animate={{ width: `${expiredPercent}%` }}
          transition={{ duration: 1, ease: "easeOut", delay: 0.4 }}
        />
      </div>

      {/* Legend */}
      <div className="grid grid-cols-3 gap-4">
        <div className="text-center">
          <div className="flex items-center justify-center mb-2">
            <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
            <span className="text-sm text-gray-700 dark:text-gray-300">Active</span>
          </div>
          <p className="text-xl font-bold text-gray-900 dark:text-white">{active}</p>
          <p className="text-xs text-gray-500 dark:text-gray-400">{activePercent.toFixed(0)}%</p>
        </div>
        
        <div className="text-center">
          <div className="flex items-center justify-center mb-2">
            <div className="w-3 h-3 bg-amber-500 rounded-full mr-2"></div>
            <span className="text-sm text-gray-700 dark:text-gray-300">Expiring</span>
          </div>
          <p className="text-xl font-bold text-gray-900 dark:text-white">{expiring}</p>
          <p className="text-xs text-gray-500 dark:text-gray-400">{expiringPercent.toFixed(0)}%</p>
        </div>
        
        <div className="text-center">
          <div className="flex items-center justify-center mb-2">
            <div className="w-3 h-3 bg-red-500 rounded-full mr-2"></div>
            <span className="text-sm text-gray-700 dark:text-gray-300">Expired</span>
          </div>
          <p className="text-xl font-bold text-gray-900 dark:text-white">{expired}</p>
          <p className="text-xs text-gray-500 dark:text-gray-400">{expiredPercent.toFixed(0)}%</p>
        </div>
      </div>
    </div>
  );
};

export default DocumentChart;