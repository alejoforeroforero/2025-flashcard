// LoadingSpinner.tsx
import React from 'react';
import './LoadingSpinner.css';

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
  return (
    <div className={`loading-container ${className}`}>
      {variant === 'circle' && (
        <div className={`loading-spinner ${size}`}></div>
      )}
      {variant === 'dots' && (
        <div className={`loading-dots ${size}`}>
          <div></div>
          <div></div>
          <div></div>
        </div>
      )}
      {variant === 'pulse' && (
        <div className={`loading-pulse ${size}`}></div>
      )}
    </div>
  );
};

export default LoadingSpinner;