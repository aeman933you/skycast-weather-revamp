
import React, { createContext, useContext, useState, useEffect } from "react";
import { CurrentWeatherData, ForecastData, TemperatureUnit } from "@/types/weather";
import { fetchWeatherByCity, fetchForecast } from "@/lib/weatherApi";
import { toast } from "sonner";
import { getLocalStorage, setLocalStorage } from "@/lib/utils";

interface WeatherContextProps {
  currentWeather: CurrentWeatherData | null;
  forecastData: ForecastData | null;
  isLoading: boolean;
  temperatureUnit: TemperatureUnit;
  lastSearchedCity: string;
  defaultLocation: string;
  searchCity: (city: string) => Promise<void>;
  setTemperatureUnit: (unit: TemperatureUnit) => void;
  setDefaultLocation: (location: string) => void;
}

const WeatherContext = createContext<WeatherContextProps | undefined>(undefined);

export const WeatherProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentWeather, setCurrentWeather] = useState<CurrentWeatherData | null>(null);
  const [forecastData, setForecastData] = useState<ForecastData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [temperatureUnit, setTemperatureUnit] = useState<TemperatureUnit>(() => 
    getLocalStorage<TemperatureUnit>("skycast-temp-unit", "metric")
  );
  const [lastSearchedCity, setLastSearchedCity] = useState<string>(() => 
    getLocalStorage<string>("skycast-last-city", "Asansol")
  );
  const [defaultLocation, setDefaultLocation] = useState<string>(() => 
    getLocalStorage<string>("skycast-default-location", "Asansol")
  );

  // Load default location on initial load
  useEffect(() => {
    const initialCity = defaultLocation || "Asansol";
    searchCity(initialCity);
  }, []);

  // Save temperature unit to localStorage whenever it changes
  useEffect(() => {
    setLocalStorage("skycast-temp-unit", temperatureUnit);
    // If we already have weather data, refresh it with the new unit
    if (currentWeather) {
      searchCity(currentWeather.name);
    }
  }, [temperatureUnit]);

  // Save default location to localStorage whenever it changes
  const handleSetDefaultLocation = (location: string) => {
    setDefaultLocation(location);
    setLocalStorage("skycast-default-location", location);
  };

  const searchCity = async (city: string) => {
    if (!city.trim()) {
      toast.error("Please enter a city name");
      return;
    }

    setIsLoading(true);
    
    try {
      const weatherData = await fetchWeatherByCity(city, temperatureUnit);
      
      if (weatherData) {
        setCurrentWeather(weatherData);
        setLastSearchedCity(city);
        setLocalStorage("skycast-last-city", city);
        
        // Fetch forecast data after successful weather data fetch
        const forecast = await fetchForecast(city, temperatureUnit);
        setForecastData(forecast);
      }
    } catch (error) {
      console.error("Error in searchCity:", error);
      toast.error("Failed to fetch weather data. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSetTemperatureUnit = (unit: TemperatureUnit) => {
    setTemperatureUnit(unit);
  };

  return (
    <WeatherContext.Provider
      value={{
        currentWeather,
        forecastData,
        isLoading,
        temperatureUnit,
        lastSearchedCity,
        defaultLocation,
        searchCity,
        setTemperatureUnit: handleSetTemperatureUnit,
        setDefaultLocation: handleSetDefaultLocation,
      }}
    >
      {children}
    </WeatherContext.Provider>
  );
};

export const useWeather = (): WeatherContextProps => {
  const context = useContext(WeatherContext);
  if (context === undefined) {
    throw new Error("useWeather must be used within a WeatherProvider");
  }
  return context;
};
