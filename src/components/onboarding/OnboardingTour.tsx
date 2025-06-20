import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { useUserSettings } from '../../context/UserSettingsContext';
import { motion, AnimatePresence } from 'framer-motion';

interface OnboardingStep {
  title: string;
  content: string;
  target: string;
  placement: 'top' | 'bottom' | 'left' | 'right';
}

const OnboardingTour: React.FC = () => {
  const { settings, updateSettings } = useUserSettings();
  const [currentStep, setCurrentStep] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [tooltipPosition, setTooltipPosition] = useState({ top: 0, left: 0 });

  const steps: OnboardingStep[] = [
    {
      title: 'Welcome to PaperTrail!',
      content: 'Let\'s take a quick tour to help you get started with document compliance tracking.',
      target: 'body',
      placement: 'bottom'
    },
    {
      title: 'Dashboard Overview',
      content: 'This is your dashboard where you can see an overview of all your documents and their status.',
      target: '.dashboard-overview',
      placement: 'bottom'
    },
    {
      title: 'Add Documents',
      content: 'Click here to add new documents to track their expiry dates.',
      target: '.add-document-button',
      placement: 'left'
    },
    {
      title: 'Document List',
      content: 'View all your documents here. You can filter, sort, and search for specific documents.',
      target: '.documents-link',
      placement: 'right'
    },
    {
      title: 'Expiry Tracker',
      content: 'Keep track of documents that are expiring soon to stay compliant.',
      target: '.expiry-tracker-link',
      placement: 'right'
    },
    {
      title: 'Settings',
      content: 'Customize your experience and notification preferences here.',
      target: '.settings-link',
      placement: 'right'
    },
    {
      title: 'You\'re all set!',
      content: 'You\'re now ready to use PaperTrail. You can restart this tour anytime from Settings.',
      target: 'body',
      placement: 'bottom'
    }
  ];

  useEffect(() => {
    // Only show onboarding if user hasn't completed it
    if (!settings.hasCompletedOnboarding) {
      // Delay showing the first step to ensure the page has loaded
      const timer = setTimeout(() => {
        setIsVisible(true);
        positionTooltip(steps[0]);
      }, 1000);
      
      return () => clearTimeout(timer);
    }
  }, [settings.hasCompletedOnboarding]);

  const positionTooltip = (step: OnboardingStep) => {
    let element: HTMLElement | null = null;
    
    if (step.target === 'body') {
      element = document.body;
    } else {
      element = document.querySelector(step.target);
    }
    
    if (!element) return;
    
    const rect = element.getBoundingClientRect();
    const tooltipWidth = 320;
    const tooltipHeight = 180;
    
    let top = 0;
    let left = 0;
    
    switch (step.placement) {
      case 'top':
        top = rect.top - tooltipHeight - 10;
        left = rect.left + rect.width / 2 - tooltipWidth / 2;
        break;
      case 'bottom':
        top = rect.bottom + 10;
        left = rect.left + rect.width / 2 - tooltipWidth / 2;
        break;
      case 'left':
        top = rect.top + rect.height / 2 - tooltipHeight / 2;
        left = rect.left - tooltipWidth - 10;
        break;
      case 'right':
        top = rect.top + rect.height / 2 - tooltipHeight / 2;
        left = rect.right + 10;
        break;
    }
    
    // Ensure tooltip stays within viewport
    if (left < 20) left = 20;
    if (left + tooltipWidth > window.innerWidth - 20) {
      left = window.innerWidth - tooltipWidth - 20;
    }
    if (top < 20) top = 20;
    if (top + tooltipHeight > window.innerHeight - 20) {
      top = window.innerHeight - tooltipHeight - 20;
    }
    
    setTooltipPosition({ top, left });
  };

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      const nextStepIndex = currentStep + 1;
      setCurrentStep(nextStepIndex);
      positionTooltip(steps[nextStepIndex]);
    } else {
      completeOnboarding();
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      const prevStepIndex = currentStep - 1;
      setCurrentStep(prevStepIndex);
      positionTooltip(steps[prevStepIndex]);
    }
  };

  const completeOnboarding = () => {
    setIsVisible(false);
    updateSettings({ hasCompletedOnboarding: true });
  };

  if (!isVisible) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        transition={{ duration: 0.3 }}
        className="fixed z-50"
        style={{
          top: tooltipPosition.top,
          left: tooltipPosition.left,
          width: 320
        }}
      >
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700 p-4">
          <div className="flex justify-between items-center mb-3">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white">
              {steps[currentStep].title}
            </h3>
            <button 
              onClick={completeOnboarding}
              className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            {steps[currentStep].content}
          </p>
          
          <div className="flex justify-between items-center">
            <div className="flex space-x-1">
              {steps.map((_, index) => (
                <div 
                  key={index}
                  className={`w-2 h-2 rounded-full ${
                    index === currentStep 
                      ? 'bg-gray-900 dark:bg-white' 
                      : 'bg-gray-200 dark:bg-gray-600'
                  }`}
                />
              ))}
            </div>
            
            <div className="flex space-x-2">
              {currentStep > 0 && (
                <button 
                  onClick={prevStep}
                  className="px-3 py-1 text-sm text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
                >
                  Back
                </button>
              )}
              
              <button 
                onClick={nextStep}
                className="px-3 py-1 text-sm bg-gray-900 text-white dark:bg-gray-700 rounded-lg hover:bg-gray-800 dark:hover:bg-gray-600"
              >
                {currentStep < steps.length - 1 ? 'Next' : 'Finish'}
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default OnboardingTour;