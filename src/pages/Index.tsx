
import React, { useState } from "react";
import { WeatherProvider } from "@/context/WeatherContext";
import { ThemeProvider } from "@/context/ThemeContext";
import TopBar from "@/components/TopBar";
import Settings from "@/components/Settings";
import WeatherCard from "@/components/WeatherCard";
import ForecastCard from "@/components/ForecastCard";
import HourlyForecast from "@/components/HourlyForecast";
import LoadingSpinner from "@/components/LoadingSpinner";
import EmptyState from "@/components/EmptyState";
import { useWeather } from "@/context/WeatherContext";

const WeatherDashboard: React.FC = () => {
  const { currentWeather, forecastData, isLoading } = useWeather();
  const [settingsOpen, setSettingsOpen] = useState(false);

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

const Index: React.FC = () => {
  const [settingsOpen, setSettingsOpen] = useState(false);

  return (
    <ThemeProvider>
      <WeatherProvider>
        <div className="min-h-screen p-4 sm:p-6 md:p-8 max-w-7xl mx-auto">
          <TopBar onSettingsClick={() => setSettingsOpen(true)} />
          <WeatherDashboard />
          <Settings isOpen={settingsOpen} onClose={() => setSettingsOpen(false)} />
        </div>
      </WeatherProvider>
    </ThemeProvider>
  );
};

export default Index;
