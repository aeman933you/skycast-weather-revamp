
import React from "react";
import { CurrentWeatherData } from "@/types/weather";
import { 
  formatDate, 
  formatTime, 
  getWeatherIcon, 
  getUnitSymbol, 
  getWindSpeedUnit,
  capitalizeFirstLetter
} from "@/lib/utils";
import { useWeather } from "@/context/WeatherContext";
import {
  Droplets,
  Wind,
  Sunrise,
  Sunset,
  Gauge,
  Eye
} from "lucide-react";

interface WeatherCardProps {
  data: CurrentWeatherData;
}

const WeatherCard: React.FC<WeatherCardProps> = ({ data }) => {
  const { temperatureUnit } = useWeather();
  const unitSymbol = getUnitSymbol(temperatureUnit);
  const windUnit = getWindSpeedUnit(temperatureUnit);

  return (
    <div className="weather-card overflow-hidden animate-fade-in">
      <div className="mb-4 text-center">
        <h2 className="text-2xl sm:text-3xl font-bold mb-1">{data.name}, {data.sys.country}</h2>
        <p className="text-gray-500 dark:text-gray-400">{formatDate(data.dt)}</p>
      </div>

      <div className="flex flex-col md:flex-row justify-between gap-4">
        <div className="flex flex-col items-center md:items-start">
          <div className="flex items-center">
            <img 
              src={getWeatherIcon(data.weather[0].icon)} 
              alt={data.weather[0].description}
              className="w-16 h-16 mr-2" 
            />
            <div className="text-5xl font-bold">
              {Math.round(data.main.temp)}{unitSymbol}
            </div>
          </div>
          <p className="text-lg capitalize">{data.weather[0].description}</p>
          <p className="text-gray-500 dark:text-gray-400">
            Feels like {Math.round(data.main.feels_like)}{unitSymbol}
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 w-full md:w-auto">
          <div className="flex flex-col items-center p-2 rounded-lg bg-gray-50 dark:bg-gray-700">
            <Droplets className="h-5 w-5 text-sky-500 mb-1" />
            <span className="text-sm text-gray-500 dark:text-gray-400">Humidity</span>
            <span className="font-semibold">{data.main.humidity}%</span>
          </div>
          
          <div className="flex flex-col items-center p-2 rounded-lg bg-gray-50 dark:bg-gray-700">
            <Wind className="h-5 w-5 text-sky-500 mb-1" />
            <span className="text-sm text-gray-500 dark:text-gray-400">Wind</span>
            <span className="font-semibold">{Math.round(data.wind.speed)} {windUnit}</span>
          </div>
          
          <div className="flex flex-col items-center p-2 rounded-lg bg-gray-50 dark:bg-gray-700">
            <Gauge className="h-5 w-5 text-sky-500 mb-1" />
            <span className="text-sm text-gray-500 dark:text-gray-400">Pressure</span>
            <span className="font-semibold">{data.main.pressure} hPa</span>
          </div>
          
          <div className="flex flex-col items-center p-2 rounded-lg bg-gray-50 dark:bg-gray-700">
            <Eye className="h-5 w-5 text-sky-500 mb-1" />
            <span className="text-sm text-gray-500 dark:text-gray-400">Visibility</span>
            <span className="font-semibold">{(data.visibility / 1000).toFixed(1)} km</span>
          </div>
          
          <div className="flex flex-col items-center p-2 rounded-lg bg-gray-50 dark:bg-gray-700">
            <Sunrise className="h-5 w-5 text-sky-500 mb-1" />
            <span className="text-sm text-gray-500 dark:text-gray-400">Sunrise</span>
            <span className="font-semibold">{formatTime(data.sys.sunrise)}</span>
          </div>
          
          <div className="flex flex-col items-center p-2 rounded-lg bg-gray-50 dark:bg-gray-700">
            <Sunset className="h-5 w-5 text-sky-500 mb-1" />
            <span className="text-sm text-gray-500 dark:text-gray-400">Sunset</span>
            <span className="font-semibold">{formatTime(data.sys.sunset)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherCard;
