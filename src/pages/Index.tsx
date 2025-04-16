
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
import TermsAndPolicy from "@/components/TermsAndPolicy";
import { FileText, Shield } from "lucide-react";

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
  const [termsOpen, setTermsOpen] = useState(false);
  const [privacyOpen, setPrivacyOpen] = useState(false);
  const [policyType, setPolicyType] = useState<"terms" | "privacy">("terms");

  const openTerms = () => {
    setPolicyType("terms");
    setTermsOpen(true);
  };
  
  const openPrivacy = () => {
    setPolicyType("privacy");
    setPrivacyOpen(true);
  };

  return (
    <ThemeProvider>
      <WeatherProvider>
        <div className="min-h-screen p-4 sm:p-6 md:p-8 max-w-7xl mx-auto flex flex-col">
          <TopBar onSettingsClick={() => setSettingsOpen(true)} />
          <div className="flex-grow">
            <WeatherDashboard />
          </div>
          <footer className="mt-12 pt-4 border-t border-gray-200 dark:border-gray-700">
            <div className="flex flex-wrap justify-center gap-4 text-xs text-gray-500 dark:text-gray-400">
              <button 
                onClick={openTerms}
                className="flex items-center hover:text-primary transition-colors"
              >
                <FileText className="h-3 w-3 mr-1" />
                Terms of Service
              </button>
              <button 
                onClick={openPrivacy}
                className="flex items-center hover:text-primary transition-colors"
              >
                <Shield className="h-3 w-3 mr-1" />
                Privacy Policy
              </button>
              <span>© 2025 SkyCast Weather App</span>
            </div>
          </footer>
          <Settings isOpen={settingsOpen} onClose={() => setSettingsOpen(false)} />
          <TermsAndPolicy 
            isOpen={termsOpen || privacyOpen}
            onClose={() => {
              setTermsOpen(false);
              setPrivacyOpen(false);
            }}
            type={policyType}
          />
        </div>
      </WeatherProvider>
    </ThemeProvider>
  );
};

export default Index;
