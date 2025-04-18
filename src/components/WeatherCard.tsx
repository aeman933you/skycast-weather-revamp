
import React from "react";
import { CurrentWeatherData } from "@/types/weather";
import { formatDate, getUnitSymbol } from "@/lib/utils";
import { useWeather } from "@/context/WeatherContext";

interface WeatherCardProps {
  data: CurrentWeatherData;
}

const WeatherCard: React.FC<WeatherCardProps> = ({ data }) => {
  const { temperatureUnit } = useWeather();
  const unitSymbol = getUnitSymbol(temperatureUnit);

  return (
    <div className="flex flex-col items-center text-center py-8">
      <h1 className="text-4xl sm:text-5xl font-bold mb-2">{data.name}</h1>
      <div className="text-8xl sm:text-9xl font-light my-8">
        {Math.round(data.main.temp)}
        <span className="text-5xl align-top ml-2">{unitSymbol}</span>
      </div>
      <p className="text-2xl sm:text-3xl font-medium mb-2 capitalize">
        {data.weather[0].description}
      </p>
      <p className="text-xl text-gray-600 dark:text-gray-300">
        {Math.round(data.main.temp_min)} ~ {Math.round(data.main.temp_max)}
        {unitSymbol} Feels like {Math.round(data.main.feels_like)}
        {unitSymbol}
      </p>
    </div>
  );
};

export default WeatherCard;
