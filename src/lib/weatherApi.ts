
import { CurrentWeatherData, ForecastData, TemperatureUnit, WeatherError } from "@/types/weather";
import { toast } from "sonner";

const API_KEY = "eb558c73c9666f508c26f264649c303d";
const BASE_URL = "https://api.openweathermap.org/data/2.5";

export const fetchWeatherByCity = async (
  city: string,
  units: TemperatureUnit = "metric"
): Promise<CurrentWeatherData | null> => {
  try {
    const response = await fetch(
      `${BASE_URL}/weather?q=${city}&appid=${API_KEY}&units=${units}`
    );
    
    if (!response.ok) {
      const errorData: WeatherError = await response.json();
      if (response.status === 404) {
        toast.error(`City "${city}" not found. Please check the spelling.`);
      } else {
        toast.error(`Error: ${errorData.message || "Failed to fetch weather data"}`);
      }
      return null;
    }
    
    const data: CurrentWeatherData = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching weather data:", error);
    toast.error("Failed to connect to weather service. Please try again later.");
    return null;
  }
};

export const fetchWeatherByCoords = async (
  lat: number,
  lon: number,
  units: TemperatureUnit = "metric"
): Promise<CurrentWeatherData | null> => {
  try {
    const response = await fetch(
      `${BASE_URL}/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=${units}`
    );
    
    if (!response.ok) {
      const errorData: WeatherError = await response.json();
      toast.error(`Error: ${errorData.message || "Failed to fetch weather data"}`);
      return null;
    }
    
    const data: CurrentWeatherData = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching weather data:", error);
    toast.error("Failed to connect to weather service. Please try again later.");
    return null;
  }
};

export const fetchForecast = async (
  city: string,
  units: TemperatureUnit = "metric"
): Promise<ForecastData | null> => {
  try {
    const response = await fetch(
      `${BASE_URL}/forecast?q=${city}&appid=${API_KEY}&units=${units}`
    );
    
    if (!response.ok) {
      const errorData: WeatherError = await response.json();
      toast.error(`Error: ${errorData.message || "Failed to fetch forecast data"}`);
      return null;
    }
    
    const data: ForecastData = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching forecast data:", error);
    toast.error("Failed to connect to weather service. Please try again later.");
    return null;
  }
};

export const fetchForecastByCoords = async (
  lat: number,
  lon: number,
  units: TemperatureUnit = "metric"
): Promise<ForecastData | null> => {
  try {
    const response = await fetch(
      `${BASE_URL}/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=${units}`
    );
    
    if (!response.ok) {
      const errorData: WeatherError = await response.json();
      toast.error(`Error: ${errorData.message || "Failed to fetch forecast data"}`);
      return null;
    }
    
    const data: ForecastData = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching forecast data:", error);
    toast.error("Failed to connect to weather service. Please try again later.");
    return null;
  }
};
