import React from 'react';
import { BRAND_CONFIG } from '../constants';

interface ErrorMessageProps {
  message: string;
}

export const ErrorMessage: React.FC<ErrorMessageProps> = ({ message }) => (
  <div className="my-6 p-4 border-l-4 border-red-600 bg-red-100 text-red-800 rounded-md shadow-md" role="alert">
    <div className="flex">
      <div className="py-1">
        <svg className="fill-current h-6 w-6 text-red-500 mr-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
          <path d="M10 0C4.477 0 0 4.477 0 10s4.477 10 10 10 10-4.477 10-10S15.523 0 10 0zm0 18c-4.411 0-8-3.589-8-8s3.589-8 8-8 8 3.589 8 8-3.589 8-8 8zm-.5-5h1v1h-1v-1zm0-8h1v6h-1V5z"/>
        </svg>
      </div>
      <div>
        <p className="font-bold">Error</p>
        <p className="text-sm">{message}</p>
        <p className="text-xs mt-2">If the problem persists, please contact <a href={`mailto:${BRAND_CONFIG.email}`} className="underline" style={{color: BRAND_CONFIG.colors.secondary}}>{BRAND_CONFIG.email}</a>.</p>
      </div>
    </div>
  </div>
);