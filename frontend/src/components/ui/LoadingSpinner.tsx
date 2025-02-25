import React from 'react';

interface LoadingSpinnerProps {
  variant?: 'circle' | 'dots' | 'pulse';
  size?: 'small' | 'medium' | 'large';
  className?: string;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ 
  variant = 'circle',
  size = 'large',
  className = '' 
}) => {
  const sizeClasses = {
    small: 'w-5 h-5',
    medium: 'w-8 h-8',
    large: 'w-12 h-12'
  };

  return (
    <div className={`flex justify-center items-center h-full ${className}`}>
      {variant === 'circle' && (
        <div className={`rounded-full border-4 border-primary-light/30 border-t-accent animate-spin ${sizeClasses[size]}`}></div>
      )}
      {variant === 'dots' && (
        <div className="flex space-x-2">
          <div className={`bg-accent rounded-full animate-bounce ${sizeClasses.small}`} style={{ animationDelay: '0ms' }}></div>
          <div className={`bg-accent rounded-full animate-bounce ${sizeClasses.small}`} style={{ animationDelay: '150ms' }}></div>
          <div className={`bg-accent rounded-full animate-bounce ${sizeClasses.small}`} style={{ animationDelay: '300ms' }}></div>
        </div>
      )}
      {variant === 'pulse' && (
        <div className={`bg-accent/70 rounded-full animate-pulse ${sizeClasses[size]}`}></div>
      )}
    </div>
  );
};

export default LoadingSpinner;
