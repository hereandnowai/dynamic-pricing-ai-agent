
import React, { useState, useCallback } from 'react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { PricingForm } from './components/PricingForm';
import { PricingReportDisplay } from './components/PricingReportDisplay';
import { LoadingSpinner } from './components/LoadingSpinner';
import { ErrorMessage } from './components/ErrorMessage';
import { HomePage } from './components/HomePage'; // Import the new HomePage component
import { PricingRequest, PricingReport, PropertyType, Season, DayOfWeek, CabinClass } from './types';
import { generatePricingReport } from './services/geminiService';
import { BRAND_CONFIG } from './constants';

const App: React.FC = () => {
  const [showHomePage, setShowHomePage] = useState<boolean>(true); // New state for HomePage visibility
  const [pricingRequest, setPricingRequest] = useState<PricingRequest>({
    propertyType: PropertyType.HOTEL,
    location: '',
    propertyName: '',
    roomTypeOrRoute: '', // Used for Hotel Room Type
    flightRoute: '',     // Used for Flight Route
    cabinClass: CabinClass.ECONOMY, // Default for Flight Cabin Class
    currentPrice: 0,
    checkInDate: '',
    checkOutDate: '',
    totalInventory: 0,
    currentOccupancy: 0,
    daysUntilArrival: 0,
    season: Season.PEAK,
    dayOfWeek: DayOfWeek.MONDAY,
    localEvents: '',
    competitor1Name: '',
    competitor1Price: 0,
    competitor2Name: '',
    competitor2Price: 0,
    competitor3Name: '',
    competitor3Price: 0,
    marketAveragePrice: 0,
    historicalPrice: 0,
    historicalOccupancy: 0,
    recentAveragePrice: 0,
    bookingsPerDay: 0,
    minPrice: 0,
    maxPrice: 0,
    targetOccupancy: 75,
    revenueTarget: 0,
  });

  const [pricingReport, setPricingReport] = useState<PricingReport | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [reportPropertyType, setReportPropertyType] = useState<PropertyType>(pricingRequest.propertyType);


  const handleFormChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    
    let processedValue: string | number = value;
    if (type === 'number') {
      processedValue = value === '' ? '' : parseFloat(value); 
    }
    
    setPricingRequest(prev => ({
      ...prev,
      [name]: processedValue,
    }));
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setPricingReport(null);
    setReportPropertyType(pricingRequest.propertyType); 

    const currentPriceValid = typeof pricingRequest.currentPrice === 'number' && !isNaN(pricingRequest.currentPrice) && pricingRequest.currentPrice > 0;

    if (!pricingRequest.location || !currentPriceValid) {
        setError("Please fill in Location and ensure Current Price is a positive number.");
        setIsLoading(false);
        return;
    }

    if (pricingRequest.propertyType === PropertyType.FLIGHT && (!pricingRequest.flightRoute || !pricingRequest.cabinClass)) {
      setError("Please fill in Flight Route and Cabin Class for flight pricing.");
      setIsLoading(false);
      return;
    }

    if (pricingRequest.propertyType === PropertyType.HOTEL && !pricingRequest.roomTypeOrRoute) {
      setError("Please fill in Room Type for hotel pricing.");
      setIsLoading(false);
      return;
    }


    if (!process.env.API_KEY) {
        setError("API Key is not configured. Please ensure process.env.API_KEY is set.");
        setIsLoading(false);
        return;
    }

    try {
      const report = await generatePricingReport(pricingRequest);
      setPricingReport(report);
    } catch (err: any) {
      console.error("Error generating pricing report:", err);
      setError(err.message || "Failed to generate pricing report. Check console for details.");
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleStartAnalysis = () => {
    setShowHomePage(false);
  };

  const handleGoHome = () => {
    setShowHomePage(true);
    // Optionally reset form and report when going home
    // setPricingRequest(initialPricingRequest); // Assuming you have an initial state defined
    // setPricingReport(null);
    // setError(null);
  };

  const pageTitle = pricingRequest.propertyType === PropertyType.HOTEL ? "Hotel Dynamic Pricing AI Agent" : "Flight Dynamic Pricing AI Agent";
  const pageDescription = pricingRequest.propertyType === PropertyType.HOTEL 
    ? "Analyze hotel market data and get optimal pricing recommendations."
    : "Analyze airline market data and get optimal pricing recommendations for flights.";


  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: '#F9FAFB' /* bg-gray-50 */ }}>
      <Header showHomeButton={!showHomePage} onGoHome={handleGoHome} />
      <main className="flex-grow container mx-auto px-4 py-8">
        {showHomePage ? (
          <HomePage 
            onStartAnalysis={handleStartAnalysis} 
            brandColors={BRAND_CONFIG.colors} 
            slogan={BRAND_CONFIG.slogan}
          />
        ) : (
          <div className="max-w-4xl mx-auto bg-white p-6 sm:p-8 rounded-xl shadow-2xl">
            <div className="text-center mb-8">
              <h1 className="text-3xl sm:text-4xl font-bold" style={{ color: BRAND_CONFIG.colors.secondary }}>{pageTitle}</h1>
              <p className="mt-2 text-gray-600">{pageDescription}</p>
              <p className="mt-1 text-sm text-gray-500">{BRAND_CONFIG.slogan}</p>
            </div>

            <PricingForm
              formData={pricingRequest}
              onChange={handleFormChange}
              onSubmit={handleSubmit}
              isLoading={isLoading}
              brandColors={BRAND_CONFIG.colors}
            />

            {isLoading && <LoadingSpinner />}
            {error && <ErrorMessage message={error} />}
            {pricingReport && !isLoading && (
              <PricingReportDisplay 
                report={pricingReport} 
                brandColors={BRAND_CONFIG.colors}
                propertyType={reportPropertyType}
              />
            )}
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default App;
