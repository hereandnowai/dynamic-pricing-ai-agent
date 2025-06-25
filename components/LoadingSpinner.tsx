import React from 'react';
import { BRAND_CONFIG } from '../constants';

export const LoadingSpinner: React.FC = () => (
  <div className="flex flex-col items-center justify-center my-8 p-4">
    <svg 
        className="animate-spin h-12 w-12" 
        style={{color: BRAND_CONFIG.colors.primary}}
        xmlns="http://www.w3.org/2000/svg" 
        fill="none" 
        viewBox="0 0 24 24"
    >
      <circle 
        className="opacity-25" 
        cx="12" cy="12" r="10" 
        stroke="currentColor" 
        strokeWidth="4"
      ></circle>
      <path 
        className="opacity-75" 
        fill="currentColor" 
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      ></path>
    </svg>
    <p className="mt-3 text-lg font-semibold" style={{color: BRAND_CONFIG.colors.secondary}}>
        Analyzing data, one moment please...
    </p>
    <img src={BRAND_CONFIG.chatbot.avatar} alt="AI Avatar" className="w-16 h-16 rounded-full mt-4 opacity-75"/>
  </div>
);