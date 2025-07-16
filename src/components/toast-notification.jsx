import React, { useState, useEffect } from 'react';
import { HiCheckCircle, HiXCircle, HiInformationCircle, HiExclamationCircle, HiX } from 'react-icons/hi';

const Toast = ({ type = 'success', message, isVisible, onClose, duration = 3000 }) => {
  const [isShowing, setIsShowing] = useState(false);

  useEffect(() => {
    if (isVisible) {
      setIsShowing(true);
      if (duration > 0) {
        const timer = setTimeout(() => {
          handleClose();
        }, duration);

        return () => clearTimeout(timer);
      }
    }
  }, [isVisible, duration]);

  const handleClose = () => {
    setIsShowing(false);
    setTimeout(() => {
      onClose();
    }, 300); // Wait for animation to complete
  };

  const getToastStyles = () => {
    const baseStyles = "w-full max-w-lg bg-white dark:bg-gray-800 shadow-xl rounded-lg pointer-events-auto ring-1 ring-black ring-opacity-5 overflow-hidden transform transition-all duration-300 ease-in-out";
    
    if (isShowing) {
      return `${baseStyles} translate-x-0 opacity-100 scale-100`;
    }
    return `${baseStyles} translate-x-full opacity-0 scale-95`;
  };

  const getIcon = () => {
    switch (type) {
      case 'success':
        return <HiCheckCircle className="h-6 w-6 text-green-400" />;
      case 'error':
        return <HiXCircle className="h-6 w-6 text-red-400" />;
      case 'warning':
        return <HiExclamationCircle className="h-6 w-6 text-yellow-400" />;
      case 'info':
      default:
        return <HiInformationCircle className="h-6 w-6 text-blue-400" />;
    }
  };

  const getColorClasses = () => {
    switch (type) {
      case 'success':
        return 'border-l-4 border-green-400 bg-green-50 dark:bg-green-900/20';
      case 'error':
        return 'border-l-4 border-red-400 bg-red-50 dark:bg-red-900/20';
      case 'warning':
        return 'border-l-4 border-yellow-400 bg-yellow-50 dark:bg-yellow-900/20';
      case 'info':
      default:
        return 'border-l-4 border-blue-400 bg-blue-50 dark:bg-blue-900/20';
    }
  };

  if (!isVisible) return null;

  return (
    <div className={getToastStyles()}>
      <div className={`p-4 ${getColorClasses()}`}>
        <div className="flex items-start">
          <div className="flex-shrink-0">
            {getIcon()}
          </div>
          <div className="ml-3 flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-900 dark:text-white leading-relaxed">
              {message}
            </p>
          </div>
          <div className="ml-4 flex-shrink-0">
            <button
              className="inline-flex text-gray-400 hover:text-gray-500 dark:hover:text-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 rounded-md p-1 transition-colors duration-200"
              onClick={handleClose}
            >
              <span className="sr-only">Close</span>
              <HiX className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Toast;
