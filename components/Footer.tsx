
import React from 'react';
import { BRAND_CONFIG } from '../constants';
import { SocialIcons } from './SocialIcons';

export const Footer: React.FC = () => {
  return (
    <footer style={{ backgroundColor: BRAND_CONFIG.colors.secondary }} className="text-white p-3 text-xs">
      <div className="container mx-auto flex flex-col sm:flex-row items-center justify-between">
        {/* Text content: Copyright, Email, Mobile */}
        <div className="text-center sm:text-left mb-2 sm:mb-0">
          <span style={{color: BRAND_CONFIG.colors.primary}}>&copy; {new Date().getFullYear()} {BRAND_CONFIG.shortName}</span>
          <a 
            href={`mailto:${BRAND_CONFIG.email}`} 
            className="hover:underline ml-0 sm:ml-3 mt-1 sm:mt-0 inline-block" 
            style={{color: BRAND_CONFIG.colors.primary}}
          >
            {BRAND_CONFIG.email}
          </a>
          <span 
            className="mx-1 sm:mx-2 mt-1 sm:mt-0 inline-block" /* Adjusted for consistent display */
            style={{color: BRAND_CONFIG.colors.primary}}
          >
            |
          </span>
          <span 
            className="mt-1 sm:mt-0 inline-block" 
            style={{color: BRAND_CONFIG.colors.primary}}
          >
            {BRAND_CONFIG.mobile}
          </span>
        </div>
        
        {/* Social Icons */}
        <div className="mt-2 sm:mt-0">
          <SocialIcons socialMedia={BRAND_CONFIG.socialMedia} primaryColor={BRAND_CONFIG.colors.primary} />
        </div>
      </div>
    </footer>
  );
};
