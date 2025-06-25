
import React from 'react';
import { BRAND_CONFIG } from '../constants';

interface HeaderProps {
  showHomeButton?: boolean;
  onGoHome?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ showHomeButton, onGoHome }) => {
  return (
    <header style={{ backgroundColor: BRAND_CONFIG.colors.secondary }} className="p-4 shadow-md">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center">
          <img src={BRAND_CONFIG.logo.favicon} alt={`${BRAND_CONFIG.shortName} Favicon`} className="h-10 w-10 mr-3" />
          <img src={BRAND_CONFIG.logo.title} alt={`${BRAND_CONFIG.shortName} Logo`} className="h-10 hidden sm:block" />
          <span className="text-xl font-bold sm:hidden" style={{color: BRAND_CONFIG.colors.primary}}>{BRAND_CONFIG.shortName}</span>
          {showHomeButton && onGoHome && (
            <button
              onClick={onGoHome}
              className="ml-4 text-sm hover:underline"
              style={{color: BRAND_CONFIG.colors.primary}}
              aria-label="Go to Home Page"
            >
              Home
            </button>
          )}
        </div>
        <a 
          href={BRAND_CONFIG.website} 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-sm hover:underline"
          style={{color: BRAND_CONFIG.colors.primary}}
        >
          Visit Us
        </a>
      </div>
    </header>
  );
};
