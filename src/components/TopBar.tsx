import React, { useState, useEffect } from "react";
import { useWeather } from "@/context/WeatherContext";
import { useTheme } from "@/context/ThemeContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Settings, 
  Sun, 
  Moon, 
  Search, 
  MapPin,
  MapPinOff,
  LocateFixed,
  Clock
} from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { format } from "date-fns";

interface TopBarProps {
  onSettingsClick: () => void;
}

const TopBar: React.FC<TopBarProps> = ({ onSettingsClick }) => {
  const { 
    searchCity, 
    getLocationWeather, 
    isLoading, 
    lastSearchedCity,
    checkLocationPermission,
    requestLocationPermission
  } = useWeather();
  const { theme, toggleTheme } = useTheme();
  const [cityInput, setCityInput] = useState("");
  const [locationPermissionState, setLocationPermissionState] = useState<"unknown" | "granted" | "denied" | "prompt">("unknown");
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    checkLocationStatus();
  }, []);

  const checkLocationStatus = async () => {
    if (navigator.permissions && navigator.permissions.query) {
      try {
        const permissionStatus = await navigator.permissions.query({ name: 'geolocation' as PermissionName });
        setLocationPermissionState(permissionStatus.state);
        
        permissionStatus.onchange = () => {
          setLocationPermissionState(permissionStatus.state);
        };
      } catch (error) {
        console.error("Error checking geolocation permission:", error);
      }
    } else {
      const hasPermission = await checkLocationPermission();
      setLocationPermissionState(hasPermission ? "granted" : "prompt");
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (cityInput.trim()) {
      searchCity(cityInput);
      setCityInput("");
    }
  };

  const handleLocationClick = async () => {
    if (locationPermissionState === "denied") {
      toast.error(
        "Location access is blocked. Please enable location services in your browser settings.",
        {
          duration: 5000,
          action: {
            label: "Learn How",
            onClick: () => {
              window.open("https://support.google.com/chrome/answer/142065", "_blank");
            }
          }
        }
      );
      return;
    }
    
    if (locationPermissionState === "prompt") {
      const granted = await requestLocationPermission();
      if (granted) {
        setLocationPermissionState("granted");
        getLocationWeather();
      }
    } else {
      getLocationWeather();
    }
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
          <div className="flex items-center mr-2 text-sm text-gray-600 dark:text-gray-300">
            <Clock className="h-4 w-4 mr-1" />
            {format(currentTime, 'hh:mm:ss a')}
          </div>
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
          className={cn(
            "rounded-full flex gap-2 items-center w-full sm:w-auto",
            locationPermissionState === "denied" 
              ? "bg-red-500 hover:bg-red-600" 
              : "bg-sky-500 hover:bg-sky-600"
          )}
        >
          {locationPermissionState === "denied" ? (
            <MapPinOff className="h-4 w-4" />
          ) : locationPermissionState === "granted" ? (
            <LocateFixed className="h-4 w-4" />
          ) : (
            <MapPin className="h-4 w-4" />
          )}
          
          <span className="hidden sm:inline">
            {locationPermissionState === "denied" 
              ? "Location Blocked" 
              : "Your Weather"}
          </span>
          <span className="sm:hidden">
            {locationPermissionState === "denied" 
              ? "Location Blocked" 
              : "Your Location"}
          </span>
        </Button>
      </div>
    </div>
  );
};

export default TopBar;
