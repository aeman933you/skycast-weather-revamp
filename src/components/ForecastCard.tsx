
import React from "react";
import { ForecastData } from "@/types/weather";
import { 
  formatDate, 
  getWeatherIcon, 
  getUnitSymbol,
  getDailyForecast
} from "@/lib/utils";
import { useWeather } from "@/context/WeatherContext";

interface ForecastCardProps {
  data: ForecastData;
}

const ForecastCard: React.FC<ForecastCardProps> = ({ data }) => {
  const { temperatureUnit } = useWeather();
  const unitSymbol = getUnitSymbol(temperatureUnit);
  
  // Get one forecast item per day
  const dailyForecast = getDailyForecast(data.list);

  return (
    <div className="weather-card animate-fade-in">
      <h3 className="text-xl font-semibold mb-4">5-Day Forecast</h3>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4">
        {dailyForecast.slice(0, 5).map((item) => (
          <div 
            key={item.dt} 
            className="flex flex-col items-center p-3 rounded-lg bg-gray-50 dark:bg-gray-700"
          >
            <p className="font-medium mb-2">
              {formatDate(item.dt).split(", ")[0]}
            </p>
            <img 
              src={getWeatherIcon(item.weather[0].icon)} 
              alt={item.weather[0].description}
              className="w-12 h-12 my-1" 
            />
            <p className="capitalize text-sm text-gray-500 dark:text-gray-400 mb-2">
              {item.weather[0].description}
            </p>
            <div className="flex justify-between w-full">
              <span className="font-semibold">{Math.round(item.main.temp_max)}{unitSymbol}</span>
              <span className="text-gray-500 dark:text-gray-400">
                {Math.round(item.main.temp_min)}{unitSymbol}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ForecastCard;
