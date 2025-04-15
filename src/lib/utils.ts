
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { ForecastWeatherItem } from "@/types/weather";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(timestamp: number): string {
  return new Date(timestamp * 1000).toLocaleDateString("en-US", {
    weekday: "long",
    month: "short",
    day: "numeric",
  });
}

export function formatTime(timestamp: number): string {
  return new Date(timestamp * 1000).toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
}

export function getWeatherIcon(iconCode: string): string {
  return `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
}

export function getUnitSymbol(unit: "metric" | "imperial"): string {
  return unit === "metric" ? "°C" : "°F";
}

export function getWindSpeedUnit(unit: "metric" | "imperial"): string {
  return unit === "metric" ? "m/s" : "mph";
}

export function capitalizeFirstLetter(string: string): string {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export function getDailyForecast(forecastList: ForecastWeatherItem[]): ForecastWeatherItem[] {
  const dailyMap = new Map<string, ForecastWeatherItem>();
  
  forecastList.forEach(item => {
    const date = new Date(item.dt * 1000).toLocaleDateString();
    
    // If we already have an entry for this date and it's not noon, continue
    if (dailyMap.has(date)) {
      const existingItem = dailyMap.get(date)!;
      const existingHour = new Date(existingItem.dt * 1000).getHours();
      const currentHour = new Date(item.dt * 1000).getHours();
      
      // Prefer readings closer to noon (12-14) for the daily forecast
      if (Math.abs(existingHour - 13) <= Math.abs(currentHour - 13)) {
        return;
      }
    }
    
    dailyMap.set(date, item);
  });
  
  return Array.from(dailyMap.values());
}

export function getBackgroundClass(weatherCode: string, isDark: boolean): string {
  const id = parseInt(weatherCode);
  
  // Thunderstorm
  if (id >= 200 && id < 300) {
    return isDark ? "bg-gradient-to-b from-gray-900 to-gray-800" : "bg-gradient-to-b from-gray-400 to-gray-300";
  }
  
  // Drizzle or Rain
  if ((id >= 300 && id < 400) || (id >= 500 && id < 600)) {
    return isDark ? "bg-gradient-to-b from-gray-800 to-sky-900" : "bg-gradient-to-b from-sky-200 to-blue-200";
  }
  
  // Snow
  if (id >= 600 && id < 700) {
    return isDark ? "bg-gradient-to-b from-gray-800 to-gray-700" : "bg-gradient-to-b from-gray-100 to-blue-50";
  }
  
  // Fog, mist, etc.
  if (id >= 700 && id < 800) {
    return isDark ? "bg-gradient-to-b from-gray-800 to-gray-700" : "bg-gradient-to-b from-gray-200 to-gray-100";
  }
  
  // Clear
  if (id === 800) {
    return isDark ? "bg-gradient-night" : "bg-gradient-sky";
  }
  
  // Clouds
  return isDark ? "bg-gradient-to-b from-gray-800 to-gray-700" : "bg-gradient-to-b from-blue-100 to-gray-100";
}

export function getLocalStorage<T>(key: string, defaultValue: T): T {
  if (typeof window === 'undefined') return defaultValue;
  
  try {
    const item = window.localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch (error) {
    console.error(`Error getting localStorage key "${key}":`, error);
    return defaultValue;
  }
}

export function setLocalStorage<T>(key: string, value: T): void {
  if (typeof window === 'undefined') return;
  
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error(`Error setting localStorage key "${key}":`, error);
  }
}
