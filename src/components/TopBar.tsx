
import React, { useState } from "react";
import { useWeather } from "@/context/WeatherContext";
import { useTheme } from "@/context/ThemeContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Settings, Sun, Moon, Search, MapPin } from "lucide-react";
import { cn } from "@/lib/utils";

interface TopBarProps {
  onSettingsClick: () => void;
}

const TopBar: React.FC<TopBarProps> = ({ onSettingsClick }) => {
  const { searchCity, getLocationWeather, isLoading, lastSearchedCity } = useWeather();
  const { theme, toggleTheme } = useTheme();
  const [cityInput, setCityInput] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (cityInput.trim()) {
      searchCity(cityInput);
      setCityInput("");
    }
  };

  const handleLocationClick = () => {
    getLocationWeather();
  };

  return (
    <div className="w-full mb-6">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-4">
        <div className="flex items-center mb-4 sm:mb-0">
          <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-sky-600 to-blue-500 bg-clip-text text-transparent">
            SkyCast Weather
          </h1>
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="icon"
            onClick={toggleTheme}
            className="rounded-full"
            aria-label={theme === "light" ? "Switch to dark mode" : "Switch to light mode"}
          >
            {theme === "light" ? (
              <Moon className="h-4 w-4" />
            ) : (
              <Sun className="h-4 w-4" />
            )}
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={onSettingsClick}
            className="rounded-full"
            aria-label="Open settings"
          >
            <Settings className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-2">
        <form onSubmit={handleSearch} className="flex-1 flex gap-2 mb-2 sm:mb-0">
          <div className="relative flex-1">
            <Input
              type="text"
              placeholder="Search city..."
              value={cityInput}
              onChange={(e) => setCityInput(e.target.value)}
              className="pr-10 rounded-full"
            />
            <Button
              type="submit"
              size="icon"
              className={cn(
                "absolute right-0 top-0 h-full rounded-r-full",
                "bg-sky-500 hover:bg-sky-600 text-white"
              )}
              disabled={isLoading}
            >
              <Search className="h-4 w-4" />
            </Button>
          </div>
        </form>
        <Button
          onClick={handleLocationClick}
          disabled={isLoading}
          className="bg-sky-500 hover:bg-sky-600 rounded-full flex gap-2 items-center w-full sm:w-auto"
        >
          <MapPin className="h-4 w-4" />
          <span className="hidden sm:inline">Your Weather</span>
          <span className="sm:hidden">Your Location</span>
        </Button>
      </div>
    </div>
  );
};

export default TopBar;
