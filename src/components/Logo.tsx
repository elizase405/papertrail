import React from 'react';
import { FileText, Layers } from 'lucide-react';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  showText?: boolean;
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ size = 'md', showText = true, className = '' }) => {
  const sizeClasses = {
    sm: 'w-6 h-6',
    md: 'w-8 h-8',
    lg: 'w-12 h-12'
  };

  const textSizeClasses = {
    sm: 'text-lg',
    md: 'text-xl',
    lg: 'text-2xl'
  };

  return (
    <div className={`flex items-center space-x-3 ${className}`}>
      <div className="relative">
        {/* Background circle */}
        <div className={`${sizeClasses[size]} bg-gradient-to-br from-gray-900 to-gray-700 rounded-xl flex items-center justify-center shadow-sm`}>
          {/* Layered papers effect */}
          <div className="relative">
            <Layers className={`${size === 'sm' ? 'w-3 h-3' : size === 'md' ? 'w-4 h-4' : 'w-6 h-6'} text-white`} />
            <div className="absolute -top-0.5 -right-0.5">
              <FileText className={`${size === 'sm' ? 'w-2 h-2' : size === 'md' ? 'w-2.5 h-2.5' : 'w-3 h-3'} text-white/70`} />
            </div>
          </div>
        </div>
      </div>
      
      {showText && (
        <span className={`font-bold text-gray-900 ${textSizeClasses[size]} tracking-tight`}>
          PaperTrail
        </span>
      )}
    </div>
  );
};

export default Logo;