import React from 'react';
import { motion } from 'framer-motion';
import { PieChart, CheckCircle, AlertTriangle, Clock } from 'lucide-react';

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
        <PieChart className="w-12 h-12 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
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
        <motion.div 
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center justify-center mb-2">
            <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
            <span className="text-sm text-gray-700 dark:text-gray-300">Active</span>
          </div>
          <p className="text-xl font-bold text-gray-900 dark:text-white">{active}</p>
          <p className="text-xs text-gray-500 dark:text-gray-400">{activePercent.toFixed(0)}%</p>
        </motion.div>
        
        <motion.div 
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <div className="flex items-center justify-center mb-2">
            <Clock className="w-5 h-5 text-amber-500 mr-2" />
            <span className="text-sm text-gray-700 dark:text-gray-300">Expiring</span>
          </div>
          <p className="text-xl font-bold text-gray-900 dark:text-white">{expiring}</p>
          <p className="text-xs text-gray-500 dark:text-gray-400">{expiringPercent.toFixed(0)}%</p>
        </motion.div>
        
        <motion.div 
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="flex items-center justify-center mb-2">
            <AlertTriangle className="w-5 h-5 text-red-500 mr-2" />
            <span className="text-sm text-gray-700 dark:text-gray-300">Expired</span>
          </div>
          <p className="text-xl font-bold text-gray-900 dark:text-white">{expired}</p>
          <p className="text-xs text-gray-500 dark:text-gray-400">{expiredPercent.toFixed(0)}%</p>
        </motion.div>
      </div>

      {/* Document stats */}
      <div className="pt-4 border-t border-gray-100 dark:border-gray-700">
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-gray-50 dark:bg-gray-700/50 p-3 rounded-lg">
            <p className="text-sm text-gray-500 dark:text-gray-400">Total Documents</p>
            <p className="text-lg font-bold text-gray-900 dark:text-white">{total}</p>
          </div>
          
          <div className="bg-gray-50 dark:bg-gray-700/50 p-3 rounded-lg">
            <p className="text-sm text-gray-500 dark:text-gray-400">Compliance Rate</p>
            <p className="text-lg font-bold text-gray-900 dark:text-white">
              {total > 0 ? Math.round((active / total) * 100) : 0}%
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DocumentChart;