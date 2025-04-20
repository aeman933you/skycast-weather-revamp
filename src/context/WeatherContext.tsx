
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
  defaultLocation: string;
  locationEnabled: boolean;
  searchCity: (city: string) => Promise<void>;
  getLocationWeather: () => Promise<void>;
  setTemperatureUnit: (unit: TemperatureUnit) => void;
  setDefaultLocation: (location: string) => void;
  checkLocationPermission: () => Promise<boolean>;
  requestLocationPermission: () => Promise<boolean>;
}

const WeatherContext = createContext<WeatherContextProps | undefined>(undefined);

export const WeatherProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentWeather, setCurrentWeather] = useState<CurrentWeatherData | null>(null);
  const [forecastData, setForecastData] = useState<ForecastData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [locationEnabled, setLocationEnabled] = useState<boolean>(() => {
    return getLocalStorage<boolean>("skycast-location-enabled", false);
  });
  const [temperatureUnit, setTemperatureUnit] = useState<TemperatureUnit>(() => 
    getLocalStorage<TemperatureUnit>("skycast-temp-unit", "metric")
  );
  const [lastSearchedCity, setLastSearchedCity] = useState<string>(() => 
    getLocalStorage<string>("skycast-last-city", "London")
  );
  const [defaultLocation, setDefaultLocation] = useState<string>(() => 
    getLocalStorage<string>("skycast-default-location", "")
  );

  // Load default location on initial load
  useEffect(() => {
    const initialCity = defaultLocation || getLocalStorage<string>("skycast-last-city", "London");
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
    } finally {
      setIsLoading(false);
    }
  };

  // Check if location permission is already granted
  const checkLocationPermission = async (): Promise<boolean> => {
    if (!navigator.geolocation) {
      toast.error("Geolocation is not supported by your browser");
      return false;
    }

    // For browsers that support permissions API
    if (navigator.permissions && navigator.permissions.query) {
      try {
        const permissionStatus = await navigator.permissions.query({ name: 'geolocation' as PermissionName });
        return permissionStatus.state === 'granted';
      } catch (error) {
        console.error("Error checking geolocation permission:", error);
        return false;
      }
    }

    // For browsers without permissions API, we can't know for sure without trying
    return locationEnabled;
  };

  // Request location permission explicitly
  const requestLocationPermission = async (): Promise<boolean> => {
    if (!navigator.geolocation) {
      toast.error("Geolocation is not supported by your browser");
      return false;
    }

    try {
      // This will prompt the user for permission if not already granted
      await new Promise<GeolocationPosition>((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(
          resolve,
          reject,
          { timeout: 10000, enableHighAccuracy: true }
        );
      });
      
      setLocationEnabled(true);
      setLocalStorage("skycast-location-enabled", true);
      return true;
    } catch (error) {
      if (error instanceof GeolocationPositionError) {
        if (error.code === error.PERMISSION_DENIED) {
          toast.error("Location access denied. Please enable location services in your browser settings.");
        } else if (error.code === error.TIMEOUT) {
          toast.error("Location request timed out. Please try again.");
        } else {
          toast.error("Unable to retrieve your location. Please try again.");
        }
      } else {
        toast.error("Failed to get location permission. Please try again.");
      }
      setLocationEnabled(false);
      setLocalStorage("skycast-location-enabled", false);
      return false;
    }
  };

  const getLocationWeather = async () => {
    if (!navigator.geolocation) {
      toast.error("Geolocation is not supported by your browser");
      return;
    }

    setIsLoading(true);
    
    try {
      // Check if permission is granted or request it
      const hasPermission = await checkLocationPermission();
      if (!hasPermission) {
        const permissionGranted = await requestLocationPermission();
        if (!permissionGranted) {
          setIsLoading(false);
          return;
        }
      }
      
      const position = await new Promise<GeolocationPosition>((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject, {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 0,
        });
      });
      
      const { latitude, longitude } = position.coords;
      
      toast.success("Location found! Fetching weather data...");
      
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
          toast.error("Location access denied. Please enable location services in your browser settings.");
        } else if (error.code === 2) {
          toast.error("Position unavailable. Please try again.");
        } else {
          toast.error("Location request timed out. Please try again.");
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
        defaultLocation,
        locationEnabled,
        searchCity,
        getLocationWeather,
        setTemperatureUnit: handleSetTemperatureUnit,
        setDefaultLocation: handleSetDefaultLocation,
        checkLocationPermission,
        requestLocationPermission,
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
