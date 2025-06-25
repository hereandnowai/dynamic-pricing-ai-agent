

import React from 'react';
import { PricingRequest, BrandColors, PropertyType, Season, DayOfWeek, CabinClass } from '../types';
import { PROPERTY_TYPES_OPTIONS, SEASON_OPTIONS, DAYOFWEEK_OPTIONS, CABIN_CLASS_OPTIONS } from '../constants';

interface InputFieldProps {
  label: string;
  id: keyof PricingRequest | 'flightRoute'; // Allow flightRoute
  name: keyof PricingRequest | 'flightRoute'; // Allow flightRoute
  type?: string;
  value: string | number;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void;
  placeholder?: string;
  required?: boolean;
  min?: number;
  max?: number;
  step?: string;
  brandColors: BrandColors;
}

const InputField: React.FC<InputFieldProps> = ({ label, id, name, type = "text", value, onChange, placeholder, required, min, max, step, brandColors }) => (
  <div className="mb-4">
    <label htmlFor={id as string} className="block text-sm font-medium mb-1" style={{color: brandColors.secondary}}>{label}{required && <span className="text-red-500">*</span>}</label>
    <input
      type={type}
      id={id as string}
      name={name as string}
      value={value === 0 && type === 'number' && placeholder ? '' : value}
      onChange={onChange}
      placeholder={placeholder}
      required={required}
      min={min}
      max={max}
      step={step}
      className="w-full p-2.5 border rounded-md shadow-sm focus:ring-2"
      style={{ borderColor: brandColors.secondary, outlineColor: brandColors.primary, backgroundColor: '#FFFFFF', color: '#000000' }}
    />
  </div>
);

interface SelectFieldProps {
  label: string;
  id: keyof PricingRequest | 'cabinClass'; // Allow cabinClass
  name: keyof PricingRequest | 'cabinClass'; // Allow cabinClass
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: { value: string; label: string }[];
  required?: boolean;
  brandColors: BrandColors;
}

const SelectField: React.FC<SelectFieldProps> = ({ label, id, name, value, onChange, options, required, brandColors }) => (
  <div className="mb-4">
    <label htmlFor={id as string} className="block text-sm font-medium mb-1" style={{color: brandColors.secondary}}>{label}{required && <span className="text-red-500">*</span>}</label>
    <select
      id={id as string}
      name={name as string}
      value={value}
      onChange={onChange}
      required={required}
      className="w-full p-2.5 border rounded-md shadow-sm focus:ring-2"
      style={{ borderColor: brandColors.secondary, outlineColor: brandColors.primary, backgroundColor: '#FFFFFF', color: '#000000' }}
    >
      {options.map(option => (
        <option key={option.value} value={option.value}>{option.label}</option>
      ))}
    </select>
  </div>
);

interface FormSectionProps {
  title: string;
  children: React.ReactNode;
  brandColors: BrandColors;
}

const FormSection: React.FC<FormSectionProps> = ({ title, children, brandColors }) => (
  <div className="mb-8 p-6 border rounded-lg" style={{ borderColor: brandColors.secondary }}>
    <h2 className="text-xl font-semibold mb-6" style={{ color: brandColors.secondary }}>{title}</h2>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6">
      {children}
    </div>
  </div>
);


interface PricingFormProps {
  formData: PricingRequest;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  isLoading: boolean;
  brandColors: BrandColors;
}

export const PricingForm: React.FC<PricingFormProps> = ({ formData, onChange, onSubmit, isLoading, brandColors }) => {
  const isHotel = formData.propertyType === PropertyType.HOTEL;

  const labels = {
    detailsTitle: isHotel ? "Hotel Details" : "Flight Details",
    propertyName: isHotel ? "Property Name (Hotel)" : "Airline",
    propertyNamePlaceholder: isHotel ? "e.g., Grand Hyatt" : "e.g., Air France",
    // roomTypeOrRoute: isHotel ? "Room Type" : "Flight Route & Cabin Class", // Combined label removed
    // roomTypeOrRoutePlaceholder: isHotel ? "e.g., Deluxe King" : "e.g., JFK-LHR Economy", // Combined placeholder removed
    checkInDate: isHotel ? "Check-in Date" : "Departure Date",
    checkOutDate: isHotel ? "Check-out Date" : "Arrival Date",
    totalInventory: isHotel ? "Capacity (Total Rooms)" : "Capacity (Total Seats)",
    totalInventoryPlaceholder: isHotel ? "e.g., 100 rooms" : "e.g., 150 seats",
    currentOccupancy: isHotel ? "Current Occupancy (%)" : "Current Load Factor (%)",
    historicalOccupancy: isHotel ? "Same Period Last Year Occupancy (%)" : "Same Period Last Year Load Factor (%)",
    targetOccupancy: isHotel ? "Target Occupancy (%)" : "Target Load Factor (%)",
    marketContextTitle: "Market Context",
    competitorDataTitle: "Competitor Data",
    historicalPerformanceTitle: "Historical Performance",
    businessRulesTitle: "Business Rules",
  };

  return (
    <form onSubmit={onSubmit} className="space-y-8">
      <FormSection title={labels.detailsTitle} brandColors={brandColors}>
        <SelectField label="Type" id="propertyType" name="propertyType" value={formData.propertyType} onChange={onChange} options={PROPERTY_TYPES_OPTIONS} required brandColors={brandColors} />
        <InputField label="Location" id="location" name="location" value={formData.location} onChange={onChange} placeholder="e.g., Paris, France" required brandColors={brandColors} />
        <InputField label={labels.propertyName} id="propertyName" name="propertyName" value={formData.propertyName} onChange={onChange} placeholder={labels.propertyNamePlaceholder} brandColors={brandColors} />
        
        {isHotel ? (
          <InputField 
            label="Room Type" 
            id="roomTypeOrRoute" 
            name="roomTypeOrRoute" 
            value={formData.roomTypeOrRoute} 
            onChange={onChange} 
            placeholder="e.g., Deluxe King" 
            required 
            brandColors={brandColors} 
          />
        ) : (
          <>
            <InputField 
              label="Flight Route" 
              id="flightRoute" 
              name="flightRoute" 
              value={formData.flightRoute || ''} 
              onChange={onChange} 
              placeholder="e.g., JFK-LHR" 
              required 
              brandColors={brandColors} 
            />
            <SelectField 
              label="Cabin Class" 
              id="cabinClass" 
              name="cabinClass" 
              value={formData.cabinClass || CabinClass.ECONOMY} 
              onChange={onChange} 
              options={CABIN_CLASS_OPTIONS} 
              required 
              brandColors={brandColors} 
            />
          </>
        )}

        <InputField label="Current Price ($)" id="currentPrice" name="currentPrice" type="number" value={formData.currentPrice} onChange={onChange} placeholder="e.g., 150" required min={0} step="0.01" brandColors={brandColors} />
        <InputField label={labels.checkInDate} id="checkInDate" name="checkInDate" type="date" value={formData.checkInDate} onChange={onChange} required brandColors={brandColors} />
        <InputField label={labels.checkOutDate} id="checkOutDate" name="checkOutDate" type="date" value={formData.checkOutDate} onChange={onChange} required brandColors={brandColors} />
        <InputField label={labels.totalInventory} id="totalInventory" name="totalInventory" type="number" value={formData.totalInventory} onChange={onChange} placeholder={labels.totalInventoryPlaceholder} required min={0} brandColors={brandColors} />
      </FormSection>

      <FormSection title={labels.marketContextTitle} brandColors={brandColors}>
        <InputField label={labels.currentOccupancy} id="currentOccupancy" name="currentOccupancy" type="number" value={formData.currentOccupancy} onChange={onChange} placeholder="e.g., 60" min={0} max={100} brandColors={brandColors} />
        <InputField label="Booking Lead Time (Days)" id="daysUntilArrival" name="daysUntilArrival" type="number" value={formData.daysUntilArrival} onChange={onChange} placeholder="e.g., 30" min={0} brandColors={brandColors} />
        <SelectField label="Season" id="season" name="season" value={formData.season} onChange={onChange} options={SEASON_OPTIONS} brandColors={brandColors} />
        <SelectField label="Day of Week (Primary Booking Day)" id="dayOfWeek" name="dayOfWeek" value={formData.dayOfWeek} onChange={onChange} options={DAYOFWEEK_OPTIONS} brandColors={brandColors} />
        <div className="md:col-span-2">
            <InputField label="Local Events (comma-separated)" id="localEvents" name="localEvents" value={formData.localEvents} onChange={onChange} placeholder="e.g., Music Festival, Conference" brandColors={brandColors} />
        </div>
      </FormSection>

      <FormSection title={labels.competitorDataTitle} brandColors={brandColors}>
        <InputField label="Competitor 1 Name" id="competitor1Name" name="competitor1Name" value={formData.competitor1Name} onChange={onChange} placeholder={isHotel ? "e.g., Marriott" : "e.g., Delta"} brandColors={brandColors} />
        <InputField label="Competitor 1 Price ($)" id="competitor1Price" name="competitor1Price" type="number" value={formData.competitor1Price} onChange={onChange} placeholder="e.g., 160" min={0} step="0.01" brandColors={brandColors} />
        <InputField label="Competitor 2 Name" id="competitor2Name" name="competitor2Name" value={formData.competitor2Name} onChange={onChange} placeholder={isHotel ? "e.g., Hilton" : "e.g., United"} brandColors={brandColors} />
        <InputField label="Competitor 2 Price ($)" id="competitor2Price" name="competitor2Price" type="number" value={formData.competitor2Price} onChange={onChange} placeholder="e.g., 155" min={0} step="0.01" brandColors={brandColors} />
        <InputField label="Competitor 3 Name" id="competitor3Name" name="competitor3Name" value={formData.competitor3Name} onChange={onChange} placeholder={isHotel ? "e.g., Boutique Hotel X" : "e.g., American Airlines"} brandColors={brandColors} />
        <InputField label="Competitor 3 Price ($)" id="competitor3Price" name="competitor3Price" type="number" value={formData.competitor3Price} onChange={onChange} placeholder="e.g., 140" min={0} step="0.01" brandColors={brandColors} />
        <div className="md:col-span-2">
            <InputField label="Market Average Price ($)" id="marketAveragePrice" name="marketAveragePrice" type="number" value={formData.marketAveragePrice} onChange={onChange} placeholder="e.g., 152" min={0} step="0.01" brandColors={brandColors} />
        </div>
      </FormSection>

      <FormSection title={labels.historicalPerformanceTitle} brandColors={brandColors}>
        <InputField label="Same Period Last Year Price ($)" id="historicalPrice" name="historicalPrice" type="number" value={formData.historicalPrice} onChange={onChange} placeholder="e.g., 145" min={0} step="0.01" brandColors={brandColors} />
        <InputField label={labels.historicalOccupancy} id="historicalOccupancy" name="historicalOccupancy" type="number" value={formData.historicalOccupancy} onChange={onChange} placeholder="e.g., 70" min={0} max={100} brandColors={brandColors} />
        <InputField label="Last 30 Days Average Price ($)" id="recentAveragePrice" name="recentAveragePrice" type="number" value={formData.recentAveragePrice} onChange={onChange} placeholder="e.g., 148" min={0} step="0.01" brandColors={brandColors} />
        <InputField label="Booking Velocity (Bookings/Day)" id="bookingsPerDay" name="bookingsPerDay" type="number" value={formData.bookingsPerDay} onChange={onChange} placeholder="e.g., 5" min={0} brandColors={brandColors} />
      </FormSection>

      <FormSection title={labels.businessRulesTitle} brandColors={brandColors}>
        <InputField label="Minimum Price ($)" id="minPrice" name="minPrice" type="number" value={formData.minPrice} onChange={onChange} placeholder="e.g., 100" min={0} step="0.01" brandColors={brandColors} />
        <InputField label="Maximum Price ($)" id="maxPrice" name="maxPrice" type="number" value={formData.maxPrice} onChange={onChange} placeholder="e.g., 500" min={0} step="0.01" brandColors={brandColors} />
        <InputField label={labels.targetOccupancy} id="targetOccupancy" name="targetOccupancy" type="number" value={formData.targetOccupancy} onChange={onChange} placeholder="e.g., 80" min={0} max={100} brandColors={brandColors} />
        <InputField label="Revenue Goal ($)" id="revenueTarget" name="revenueTarget" type="number" value={formData.revenueTarget} onChange={onChange} placeholder="e.g., 50000" min={0} step="0.01" brandColors={brandColors} />
      </FormSection>

      <div className="mt-8 text-center">
        <button
          type="submit"
          disabled={isLoading}
          className={`font-bold py-3 px-8 rounded-lg shadow-md transition-transform transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-opacity-50 focus:ring-[${brandColors.secondary}]`}
          style={{ 
            backgroundColor: brandColors.primary, 
            color: brandColors.secondary,
            borderColor: brandColors.secondary,
          }}
        >
          {isLoading ? 'Analyzing...' : 'Get Pricing Recommendation'}
        </button>
      </div>
    </form>
  );
};