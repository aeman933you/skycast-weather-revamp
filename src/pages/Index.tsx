import React, { useState } from "react";
import { WeatherProvider } from "@/context/WeatherContext";
import { ThemeProvider } from "@/context/ThemeContext";
import { TooltipProvider } from "@/components/ui/tooltip";
import TopBar from "@/components/TopBar";
import Settings from "@/components/Settings";
import WeatherCard from "@/components/WeatherCard";
import ForecastCard from "@/components/ForecastCard";
import HourlyForecast from "@/components/HourlyForecast";
import LoadingSpinner from "@/components/LoadingSpinner";
import EmptyState from "@/components/EmptyState";
import { useWeather } from "@/context/WeatherContext";
import TermsAndPolicy from "@/components/TermsAndPolicy";
import { FileText, Shield, Calculator } from "lucide-react";
import { Button } from "@/components/ui/button";
import CalculatorApp from "@/components/Calculator";

const WeatherDashboardContent: React.FC = () => {
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

const Index: React.FC = () => {
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [termsOpen, setTermsOpen] = useState(false);
  const [privacyOpen, setPrivacyOpen] = useState(false);
  const [policyType, setPolicyType] = useState<"terms" | "privacy">("terms");
  const [showCalculator, setShowCalculator] = useState(false);
  const [secretClickCount, setSecretClickCount] = useState(0);

  const openTerms = () => {
    setPolicyType("terms");
    setTermsOpen(true);
  };
  
  const openPrivacy = () => {
    setPolicyType("privacy");
    setPrivacyOpen(true);
  };

  const handleTitleClick = () => {
    setSecretClickCount(prev => prev + 1);
    if (secretClickCount >= 4) {
      setShowCalculator(prev => !prev);
      setSecretClickCount(0);
    }
  };

  return (
    <ThemeProvider>
      {showCalculator ? (
        <div className="min-h-screen p-4 sm:p-6 md:p-8 max-w-7xl mx-auto flex flex-col">
          <div className="flex justify-between items-center mb-6">
            <h1 
              onClick={handleTitleClick}
              className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-sky-600 to-blue-500 bg-clip-text text-transparent cursor-pointer"
            >
              Secret Calculator Mode
            </h1>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowCalculator(false)}
              className="flex items-center gap-1"
            >
              <Calculator className="h-4 w-4" />
              Back to Weather
            </Button>
          </div>
          <CalculatorApp />
        </div>
      ) : (
        <WeatherProvider>
          <TooltipProvider>
            <div className="min-h-screen p-4 sm:p-6 md:p-8 max-w-7xl mx-auto flex flex-col">
              <TopBar 
                onSettingsClick={() => setSettingsOpen(true)} 
                onTitleClick={handleTitleClick}
              />
              <div className="flex-grow">
                <WeatherDashboardContent />
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
                  <span className="text-xs text-gray-400 dark:text-gray-500">
                    Created by Aeman Taslim
                  </span>
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
          </TooltipProvider>
        </WeatherProvider>
      )}
    </ThemeProvider>
  );
};

export default Index;
