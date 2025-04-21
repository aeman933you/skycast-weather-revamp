
import React from "react";
import { useWeather } from "@/context/WeatherContext";
import LoadingSpinner from "./LoadingSpinner";
import EmptyState from "./EmptyState";
import WeatherCard from "./WeatherCard";
import HourlyForecast from "./HourlyForecast";
import ForecastCard from "./ForecastCard";

const WeatherDashboard: React.FC = () => {
  const { currentWeather, forecastData, isLoading } = useWeather();

  return (
    <div className="flex flex-col gap-4">
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <>
          {currentWeather ? (
            <WeatherCard data={currentWeather} />
          ) : (
            <EmptyState />
          )}
          
          {forecastData && (
            <>
              <HourlyForecast data={forecastData} />
              <ForecastCard data={forecastData} />
            </>
          )}
        </>
      )}
    </div>
  );
};

export default WeatherDashboard;
