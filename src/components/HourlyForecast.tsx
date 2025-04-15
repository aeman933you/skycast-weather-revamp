
import React from "react";
import { ForecastData } from "@/types/weather";
import { 
  formatTime, 
  getWeatherIcon, 
  getUnitSymbol 
} from "@/lib/utils";
import { useWeather } from "@/context/WeatherContext";

interface HourlyForecastProps {
  data: ForecastData;
}

const HourlyForecast: React.FC<HourlyForecastProps> = ({ data }) => {
  const { temperatureUnit } = useWeather();
  const unitSymbol = getUnitSymbol(temperatureUnit);

  // Get next 24 hours of forecast (8 items, each 3 hours apart)
  const hourlyForecast = data.list.slice(0, 8);

  return (
    <div className="weather-card animate-fade-in">
      <h3 className="text-xl font-semibold mb-4">Hourly Forecast</h3>
      
      <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-8 gap-2">
        {hourlyForecast.map((item) => (
          <div 
            key={item.dt} 
            className="flex flex-col items-center p-2 rounded-lg bg-gray-50 dark:bg-gray-700"
          >
            <p className="font-medium text-sm">
              {formatTime(item.dt)}
            </p>
            <img 
              src={getWeatherIcon(item.weather[0].icon)} 
              alt={item.weather[0].description}
              className="w-8 h-8 my-1" 
            />
            <p className="font-semibold text-sm">
              {Math.round(item.main.temp)}{unitSymbol}
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              {Math.round(item.pop * 100)}% <span className="text-sky-500">●</span>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HourlyForecast;
