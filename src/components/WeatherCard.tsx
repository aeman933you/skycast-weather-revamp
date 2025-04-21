
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

interface WeatherCardProps {
  data: CurrentWeatherData;
}

const WeatherCard: React.FC<WeatherCardProps> = ({ data }) => {
  const { temperatureUnit } = useWeather();
  const unitSymbol = getUnitSymbol(temperatureUnit);

  // Find min/max from available day's temps (simulate as available)
  const tempMin = data.main.temp_min
    ? Math.round(data.main.temp_min) : Math.round(data.main.temp - 2);
  const tempMax = data.main.temp_max
    ? Math.round(data.main.temp_max) : Math.round(data.main.temp + 2);

  return (
    <div
      className="
        flex flex-col items-center justify-center rounded-2xl
        p-0 overflow-hidden relative w-full
        bg-gradient-to-b from-[#d3e4fd]/90 via-[#e8f0fc]/90 to-white/95
        dark:from-gray-700 dark:to-gray-900
        shadow-xl animate-fade-in h-[360px] sm:h-[420px] mb-6
      "
      // REMOVE backgroundImage style entirely to make the image disappear!
    >
      <div className="relative w-full h-full flex flex-col justify-start items-center pt-10 pb-6 backdrop-blur-[2px] bg-white/40 dark:bg-black/30">
        {/* City, date, and weather icon */}
        <div className="flex flex-col items-center z-10">
          <div className="text-3xl font-bold tracking-wide text-gray-800 dark:text-white drop-shadow-sm mb-1">
            {data.name}
          </div>
        </div>
        {/* Main temp */}
        <div className="flex items-baseline justify-center my-2">
          <span className="text-[6rem] leading-none font-extrabold text-gray-900 dark:text-white drop-shadow" style={{letterSpacing: '-0.15em'}}>
            {Math.round(data.main.temp)}
          </span>
          <span className="text-3xl text-gray-500 dark:text-gray-200 font-light" style={{marginTop: '2.5rem'}}>
            {unitSymbol}
          </span>
        </div>
        {/* Weather main description */}
        <div className="text-2xl font-medium text-gray-600 dark:text-gray-100 mb-1 capitalize drop-shadow-sm">
          {capitalizeFirstLetter(data.weather[0].description)}
        </div>
        {/* Min/Max/Feels like Row */}
        <div className="flex flex-row items-center gap-3 text-lg text-gray-600 dark:text-gray-300 font-semibold mt-2">
          <span>{tempMin}{unitSymbol} ~ {tempMax}{unitSymbol}</span>
          <span className="font-normal text-gray-400 dark:text-gray-400">|</span>
          <span>Feels like {Math.round(data.main.feels_like)}{unitSymbol}</span>
        </div>
      </div>
    </div>
  );
};

export default WeatherCard;
