import React from 'react';
import { PricingReport, BrandColors, PropertyType } from '../types';

interface ReportItemProps {
  label: string;
  value: string | number;
  isCurrency?: boolean;
  brandColors: BrandColors;
  className?: string;
}

const ReportItem: React.FC<ReportItemProps> = ({ label, value, isCurrency = false, brandColors, className = '' }) => (
  <div className={`py-3 px-1 ${className}`}>
    <dt className="text-sm font-medium" style={{color: brandColors.secondary}}>{label}</dt>
    <dd className="mt-1 text-md text-gray-700">
      {isCurrency && typeof value === 'number' ? `$${value.toFixed(2)}` : value}
    </dd>
  </div>
);

export interface PricingReportDisplayProps {
  report: PricingReport;
  brandColors: BrandColors;
  propertyType: PropertyType; // Added to make title dynamic
}

export const PricingReportDisplay: React.FC<PricingReportDisplayProps> = ({ report, brandColors, propertyType }) => {
  const confidenceColor = (level: number) => {
    if (level >= 8) return 'text-green-600';
    if (level >= 5) return 'text-yellow-600';
    return 'text-red-600';
  };

  const reportTitle = propertyType === PropertyType.HOTEL ? "Hotel Pricing Report" : "Flight Pricing Report";

  return (
    <div className="mt-10 p-6 border rounded-lg shadow-lg" style={{ borderColor: brandColors.primary, backgroundColor: '#FFFAF0' /* A light cream, related to primary */ }}>
      <h2 className="text-2xl font-semibold mb-6 text-center" style={{ color: brandColors.secondary }}>
        {reportTitle}
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
        <div className="md:col-span-2 p-4 rounded-md" style={{backgroundColor: brandColors.primary, color: brandColors.secondary}}>
            <ReportItem label="Recommended Price" value={report.recommendedPrice} isCurrency brandColors={brandColors} className="font-bold text-xl" />
            <ReportItem label="Reasoning" value={report.recommendedPriceReasoning} brandColors={brandColors} />
        </div>

        <ReportItem label="Recommended Price Range" value={`$${report.priceRange.min.toFixed(2)} - $${report.priceRange.max.toFixed(2)}`} brandColors={brandColors} />
        
        <div className="py-3 px-1">
          <dt className="text-sm font-medium" style={{color: brandColors.secondary}}>Confidence Level</dt>
          <dd className={`mt-1 text-md font-semibold ${confidenceColor(report.confidenceLevel)}`}>
            {report.confidenceLevel}/10
          </dd>
        </div>
      </div>

      <dl className="mt-6 grid grid-cols-1 md:grid-cols-1 gap-x-8 gap-y-2 divide-y" style={{borderColor: brandColors.primary}}>
        <ReportItem label="Market Position" value={report.marketPosition} brandColors={brandColors} className="pt-4"/>
        <ReportItem label="Demand Forecast" value={report.demandForecast} brandColors={brandColors} />
        <ReportItem label="Projected Revenue Impact" value={report.revenueImpact} brandColors={brandColors} />
        <ReportItem label="Risk Assessment & Mitigation" value={report.riskAssessment} brandColors={brandColors} />
        <ReportItem label="Next Review Suggested" value={report.nextReview} brandColors={brandColors} />
      </dl>
    </div>
  );
};