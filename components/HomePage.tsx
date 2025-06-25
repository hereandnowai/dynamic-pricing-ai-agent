
import React from 'react';
import { BrandColors } from '../types';
import { BRAND_CONFIG } from '../constants';


interface HomePageProps {
  onStartAnalysis: () => void;
  brandColors: BrandColors;
  slogan: string;
}

const FeatureCard: React.FC<{ title: string; description: string; icon: JSX.Element; brandColors: BrandColors }> = ({ title, description, icon, brandColors }) => (
  <div className="flex flex-col items-center p-6 text-center bg-white rounded-lg shadow-lg border" style={{ borderColor: brandColors.primary }}>
    <div className="mb-4" style={{ color: brandColors.secondary }}>
      {icon}
    </div>
    <h3 className="mb-2 text-xl font-semibold" style={{ color: brandColors.secondary }}>{title}</h3>
    <p className="text-gray-600 text-sm">{description}</p>
  </div>
);

const BenefitItem: React.FC<{ text: string; brandColors: BrandColors }> = ({ text, brandColors }) => (
  <li className="flex items-start mb-2">
    <svg className="w-5 h-5 mr-2 flex-shrink-0" style={{ color: brandColors.primary }} fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path></svg>
    <span className="text-gray-700">{text}</span>
  </li>
);

export const HomePage: React.FC<HomePageProps> = ({ onStartAnalysis, brandColors, slogan }) => {
  return (
    <div className="max-w-5xl mx-auto bg-white p-6 sm:p-10 rounded-xl shadow-2xl">
      <div className="text-center mb-10">
        <img src={BRAND_CONFIG.logo.title} alt={`${BRAND_CONFIG.shortName} Logo`} className="h-16 mx-auto mb-4" />
        <h1 className="text-4xl sm:text-5xl font-bold mb-3" style={{ color: brandColors.secondary }}>
          Optimize Your Travel Pricing with AI
        </h1>
        <p className="text-lg text-gray-700 mb-2 max-w-2xl mx-auto">
          Our Dynamic Pricing AI Agent helps you find the best prices for your hotel rooms or flights. By analyzing market trends, competitor data, and demand signals, we provide intelligent recommendations to maximize your revenue and stay competitive.
        </p>
        <p className="mt-1 text-md text-gray-500 italic">{slogan}</p>
      </div>

      <section className="mb-12">
        <h2 className="text-2xl sm:text-3xl font-semibold text-center mb-8" style={{ color: brandColors.secondary }}>
          Key Capabilities
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          <FeatureCard
            brandColors={brandColors}
            title="AI-Powered Recommendations"
            description="Get optimal price suggestions based on real-time data analysis and sophisticated AI algorithms."
            icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>}
          />
          <FeatureCard
            brandColors={brandColors}
            title="Comprehensive Analysis"
            description="Factors in current demand, seasonality, competitor rates, local events, and historical trends for robust insights."
            icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" /></svg>}
          />
          <FeatureCard
            brandColors={brandColors}
            title="Detailed Reports"
            description="Understand the 'why' behind the numbers with clear, actionable reports and transparent reasoning."
            icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>}
          />
        </div>
      </section>

      <section className="mb-12 p-6 rounded-lg" style={{ backgroundColor: '#FFFAF0' /* Light cream, related to primary */}}>
        <h2 className="text-2xl sm:text-3xl font-semibold text-center mb-8" style={{ color: brandColors.secondary }}>
          Why Use Our AI Agent?
        </h2>
        <div className="max-w-xl mx-auto">
          <ul className="space-y-3">
            <BenefitItem text="Boost Revenue: Price strategically to capture maximum value from every booking." brandColors={brandColors} />
            <BenefitItem text="Improve Occupancy/Load Factor: Attract more customers with competitive, data-driven rates." brandColors={brandColors} />
            <BenefitItem text="Save Time & Effort: Automate complex pricing analysis and get recommendations quickly." brandColors={brandColors} />
            <BenefitItem text="Stay Competitive: Respond effectively to dynamic market conditions and competitor actions." brandColors={brandColors} />
          </ul>
        </div>
      </section>

      <div className="text-center">
        <button
          onClick={onStartAnalysis}
          className={`font-bold py-3 px-10 rounded-lg shadow-md transition-transform transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-opacity-75 focus:ring-[${brandColors.secondary}]`}
          style={{ 
            backgroundColor: brandColors.primary, 
            color: brandColors.secondary,
            borderColor: brandColors.secondary,
            // ringColor was removed from here
          }}
          aria-label="Start analyzing your prices"
        >
          Start Analyzing Your Prices
        </button>
      </div>
    </div>
  );
};
