
import React, { createContext, useContext, useState, useEffect } from "react";
import { CurrentWeatherData, ForecastData, TemperatureUnit } from "@/types/weather";
import { fetchWeatherByCity, fetchWeatherByCoords, fetchForecast, fetchForecastByCoords } from "@/lib/weatherApi";
import { toast } from "sonner";
import { getLocalStorage, setLocalStorage } from "@/lib/utils";

interface WeatherContextProps {
  currentWeather: CurrentWeatherData | null;
  forecastData: ForecastData | null;
  isLoading: boolean;
  temperatureUnit: TemperatureUnit;
  lastSearchedCity: string;
  searchCity: (city: string) => Promise<void>;
  getLocationWeather: () => Promise<void>;
  setTemperatureUnit: (unit: TemperatureUnit) => void;
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
    getLocalStorage<string>("skycast-last-city", "London")
  );

  // Load last searched city on initial load
  useEffect(() => {
    const initialCity = getLocalStorage<string>("skycast-last-city", "London");
    if (initialCity) {
      searchCity(initialCity);
    }
  }, []);

  // Save temperature unit to localStorage whenever it changes
  useEffect(() => {
    setLocalStorage("skycast-temp-unit", temperatureUnit);
    // If we already have weather data, refresh it with the new unit
    if (currentWeather) {
      searchCity(currentWeather.name);
    }
  }, [temperatureUnit]);

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
    } finally {
      setIsLoading(false);
    }
  };

  const getLocationWeather = async () => {
    if (!navigator.geolocation) {
      toast.error("Geolocation is not supported by your browser");
      return;
    }

    setIsLoading(true);
    
    try {
      const position = await new Promise<GeolocationPosition>((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject, {
          enableHighAccuracy: true,
          timeout: 5000,
          maximumAge: 0,
        });
      });
      
      const { latitude, longitude } = position.coords;
      
      const weatherData = await fetchWeatherByCoords(latitude, longitude, temperatureUnit);
      
      if (weatherData) {
        setCurrentWeather(weatherData);
        setLastSearchedCity(weatherData.name);
        setLocalStorage("skycast-last-city", weatherData.name);
        
        // Fetch forecast data after successful weather data fetch
        const forecast = await fetchForecastByCoords(latitude, longitude, temperatureUnit);
        setForecastData(forecast);
      }
    } catch (error) {
      if (error instanceof GeolocationPositionError) {
        if (error.code === 1) {
          toast.error("Location access denied. Please enable location services.");
        } else {
          toast.error("Unable to retrieve your location. Please try again.");
        }
      } else {
        console.error("Error getting location weather:", error);
        toast.error("Failed to get weather for your location. Please try again.");
      }
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
        searchCity,
        getLocationWeather,
        setTemperatureUnit: handleSetTemperatureUnit,
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
