

import { GoogleGenAI, GenerateContentResponse } from "@google/genai";
import { PricingRequest, PricingReport, PropertyType } from '../types';
import { GEMINI_MODEL_NAME } from '../constants';

function formatNumberInput(value: number | ''): number {
    if (value === '' || typeof value !== 'number' || isNaN(value)) {
        return 0; // Default to 0 if input is empty or invalid
    }
    return value;
}


const constructPrompt = (requestData: PricingRequest): string => {
  let typeSpecificInstructions = '';
  let propertyTypeName = '';
  let detailsSection = '';

  if (requestData.propertyType === PropertyType.HOTEL) {
    propertyTypeName = 'Hotel';
    typeSpecificInstructions = `
You are an AI expert in hotel revenue management.
Focus your analysis on hotel-specific factors: occupancy rates, room types, average length of stay, local events impacting accommodation demand (e.g., conferences, festivals), competitor hotel pricing, seasonal demand for lodging, and booking lead times.
The "Property Name/Airline" field refers to the hotel name.
The "Room Type" field refers to the hotel room type (e.g., Standard King, Deluxe Suite).
The "Capacity (Total Inventory)" field refers to the total number of available rooms of that type.
The "Current Occupancy/Load Factor" refers to the hotel's current occupancy rate for the specified room type or overall.
`;
    detailsSection = `
- Property Name: ${requestData.propertyName || 'N/A'}
- Room Type: ${requestData.roomTypeOrRoute}
- Date Range: ${requestData.checkInDate || 'N/A'} to ${requestData.checkOutDate || 'N/A'}`;
  } else if (requestData.propertyType === PropertyType.FLIGHT) {
    propertyTypeName = 'Flight';
    typeSpecificInstructions = `
You are an AI expert in airline revenue management.
Focus your analysis on airline-specific factors: load factors, flight routes, cabin classes (e.g., Economy, Business), fare restrictions, competitor airline pricing on the same routes, seasonal travel patterns, and booking curves (how demand accumulates over time before departure).
The "Property Name/Airline" field refers to the airline name.
The "Flight Route" field refers to the flight route (e.g., JFK-LHR, SFO-LAX).
The "Cabin Class" field refers to the cabin class (e.g., Economy, Business).
The "Capacity (Total Inventory)" field refers to the total number of available seats on the flight for that route/cabin.
The "Current Occupancy/Load Factor" refers to the flight's current load factor.
`;
    detailsSection = `
- Airline: ${requestData.propertyName || 'N/A'}
- Flight Route: ${requestData.flightRoute || 'N/A'}
- Cabin Class: ${requestData.cabinClass || 'N/A'}
- Departure/Arrival Dates: ${requestData.checkInDate || 'N/A'} to ${requestData.checkOutDate || 'N/A'}`;
  }

  return `
Analyze the following travel booking scenario for a ${propertyTypeName} and provide a dynamic pricing recommendation.
${typeSpecificInstructions}

**${propertyTypeName} Details:**
- Type: ${requestData.propertyType}
- Location: ${requestData.location}
${detailsSection}
- Current Price: $${formatNumberInput(requestData.currentPrice)}
- Capacity (Total Inventory): ${formatNumberInput(requestData.totalInventory)} ${requestData.propertyType === PropertyType.HOTEL ? 'units/rooms' : 'seats'}

**Market Context:**
- Current ${requestData.propertyType === PropertyType.HOTEL ? 'Occupancy' : 'Load Factor'}: ${formatNumberInput(requestData.currentOccupancy)}%
- Booking Lead Time: ${formatNumberInput(requestData.daysUntilArrival)} days
- Season: ${requestData.season}
- Day of Week (Primary Booking Day for this type): ${requestData.dayOfWeek}
- Local Events (if applicable, e.g., for hotels near event venues, or flights to event cities): ${requestData.localEvents || 'None specified'}

**Competitor Data:**
- Competitor 1: ${requestData.competitor1Name || 'N/A'} - $${formatNumberInput(requestData.competitor1Price)}
- Competitor 2: ${requestData.competitor2Name || 'N/A'} - $${formatNumberInput(requestData.competitor2Price)}
- Competitor 3: ${requestData.competitor3Name || 'N/A'} - $${formatNumberInput(requestData.competitor3Price)}
- Market Average Price: $${formatNumberInput(requestData.marketAveragePrice)}

**Historical Performance:**
- Same Period Last Year Price: $${formatNumberInput(requestData.historicalPrice)} (${requestData.propertyType === PropertyType.HOTEL ? 'Occupancy' : 'Load Factor'}: ${formatNumberInput(requestData.historicalOccupancy)}%)
- Last 30 Days Average Price: $${formatNumberInput(requestData.recentAveragePrice)}
- Booking Velocity: ${formatNumberInput(requestData.bookingsPerDay)} bookings/day

**Business Rules:**
- Minimum Price: $${formatNumberInput(requestData.minPrice)}
- Maximum Price: $${formatNumberInput(requestData.maxPrice)}
- Target ${requestData.propertyType === PropertyType.HOTEL ? 'Occupancy' : 'Load Factor'}: ${formatNumberInput(requestData.targetOccupancy)}%
- Revenue Goal: $${formatNumberInput(requestData.revenueTarget)} (if applicable)

**Analysis Request:**
Please provide the following in a structured JSON format. Ensure all monetary values are numbers, not strings with currency symbols.
1.  **recommendedPrice**: A number representing the optimal price.
2.  **recommendedPriceReasoning**: A string explaining the reasoning, reflecting the ${propertyTypeName}-specific factors.
3.  **priceRange**: An object with "min" (number) and "max" (number) properties.
4.  **confidenceLevel**: A number between 1 and 10 (integer).
5.  **marketPosition**: A string describing how this price compares to competitors.
6.  **demandForecast**: A string describing expected booking behavior at this price.
7.  **revenueImpact**: A string projecting revenue vs. current pricing.
8.  **riskAssessment**: A string outlining potential risks and mitigation strategies.
9.  **nextReview**: A string suggesting when to reassess pricing (e.g., "in 24 hours", "in 3 days").

Ensure the response is a single JSON object without any surrounding text or markdown.
Example JSON structure (content will vary based on whether it's a hotel or flight):
{
  "recommendedPrice": 150, // or e.g., 450 for a flight
  "recommendedPriceReasoning": "Based on high demand due to upcoming holiday season and competitor airline pricing for similar routes and cabin class, this price optimizes load factor while maximizing revenue.",
  "priceRange": { "min": 140, "max": 160 }, // or e.g., { "min": 420, "max": 480 }
  "confidenceLevel": 8,
  "marketPosition": "Positioned competitively against Airline X for this route and cabin, slightly undercutting Airline Y.",
  "demandForecast": "Expect steady booking velocity for this flight at this price point for the selected cabin class.",
  "revenueImpact": "Projected +12% revenue for this flight compared to current pricing for this cabin class.",
  "riskAssessment": "Risk of decreased bookings if competitor airlines launch aggressive sales. Mitigate by monitoring competitor fare changes daily.",
  "nextReview": "Reassess in 72 hours or if there's a significant shift in competitor pricing for this route and cabin."
}
`;
};

export const generatePricingReport = async (requestData: PricingRequest): Promise<PricingReport> => {
  if (!process.env.API_KEY) {
    // This case should ideally be caught in the UI form submission, but added as a safeguard.
    throw new Error("API_KEY environment variable not set. Please configure it before making API calls.");
  }
  
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  const prompt = constructPrompt(requestData);

  try {
    const response: GenerateContentResponse = await ai.models.generateContent({
      model: GEMINI_MODEL_NAME,
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        temperature: 0.4, // Slightly lower for more deterministic financial advice
        topK: 30, // Adjust K and P for desired response variability
        topP: 0.9,
      },
    });

    let jsonStr = response.text.trim();
    
    // Remove Markdown code fences if present
    const fenceRegex = /^```(\w*)?\s*\n?(.*?)\n?\s*```$/s;
    const match = jsonStr.match(fenceRegex);
    if (match && match[2]) {
      jsonStr = match[2].trim();
    }

    try {
      const parsedData = JSON.parse(jsonStr);
      // Basic validation of the parsed structure
      if (
        typeof parsedData.recommendedPrice !== 'number' ||
        typeof parsedData.recommendedPriceReasoning !== 'string' ||
        typeof parsedData.priceRange !== 'object' ||
        parsedData.priceRange === null || 
        typeof parsedData.priceRange.min !== 'number' ||
        typeof parsedData.priceRange.max !== 'number' ||
        typeof parsedData.confidenceLevel !== 'number' ||
        !Number.isInteger(parsedData.confidenceLevel) || // Ensure confidence is integer
        parsedData.confidenceLevel < 1 || parsedData.confidenceLevel > 10 || // Ensure confidence is in range 1-10
        typeof parsedData.marketPosition !== 'string' ||
        typeof parsedData.demandForecast !== 'string' ||
        typeof parsedData.revenueImpact !== 'string' ||
        typeof parsedData.riskAssessment !== 'string' ||
        typeof parsedData.nextReview !== 'string'
      ) {
        console.error("Parsed JSON does not match expected PricingReport structure or constraints:", parsedData);
        throw new Error("Parsed JSON does not match expected PricingReport structure or constraints.");
      }
      return parsedData as PricingReport;
    } catch (e: any) {
      console.error("Failed to parse JSON response from Gemini:", e);
      console.error("Raw Gemini response text:", response.text);
      // It's helpful to include a snippet of the raw response in the error for debugging
      const snippet = response.text.length > 300 ? response.text.substring(0, 300) + "..." : response.text;
      throw new Error(`Failed to parse AI response as valid JSON. Ensure the model returns a valid JSON object. Raw response snippet: ${snippet}`);
    }

  } catch (error: any) {
    console.error("Error calling Gemini API:", error);
    // More specific error handling based on potential Gemini API error responses
    if (error.message) {
        if (error.message.includes("API_KEY_INVALID") || error.message.includes("API key not valid")) {
             throw new Error("The API Key is invalid. Please check your configuration and ensure it's correct and enabled.");
        }
        if (error.message.toLowerCase().includes("quota") || error.message.includes("resource has been exhausted")) {
            throw new Error("API quota exceeded. Please check your usage limits or try again later.");
        }
        if (error.message.includes("permission denied") || error.message.includes("IAM")) {
             throw new Error(`Gemini API request failed due to permission issues: ${error.message}. Ensure the API key has the correct permissions.`);
        }
         // Fallback for other Gemini related errors
        throw new Error(`Gemini API request failed: ${error.message}`);
    }
    // Generic fallback
    throw new Error('An unexpected error occurred while communicating with the AI service.');
  }
};