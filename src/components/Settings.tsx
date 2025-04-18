
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { useWeather } from "@/context/WeatherContext";
import { TemperatureUnit } from "@/types/weather";
import { X, Save, FileText, Shield, CalendarDays, Info } from "lucide-react";
import { toast } from "sonner";
import TermsAndPolicy from "./TermsAndPolicy";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

interface SettingsProps {
  isOpen: boolean;
  onClose: () => void;
}

const Settings: React.FC<SettingsProps> = ({ isOpen, onClose }) => {
  const { temperatureUnit, setTemperatureUnit, defaultLocation, setDefaultLocation } = useWeather();
  const [locationInput, setLocationInput] = useState(defaultLocation || "");
  const [termsOpen, setTermsOpen] = useState(false);
  const [privacyOpen, setPrivacyOpen] = useState(false);
  const [policyType, setPolicyType] = useState<"terms" | "privacy">("terms");
  const [forecastDays, setForecastDays] = useState(5);
  const [showDetailedForecast, setShowDetailedForecast] = useState(true);

  const handleUnitChange = (checked: boolean) => {
    setTemperatureUnit(checked ? "imperial" : "metric");
  };

  const handleSaveDefaultLocation = () => {
    setDefaultLocation(locationInput);
    toast.success(`Default location set to "${locationInput}"`);
  };
  
  const openTerms = () => {
    setPolicyType("terms");
    setTermsOpen(true);
  };
  
  const openPrivacy = () => {
    setPolicyType("privacy");
    setPrivacyOpen(true);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-xl w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Settings</h2>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="rounded-full"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>

        <div className="space-y-6">
          {/* Temperature Unit Setting */}
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="temperature-unit" className="text-base">Temperature Unit</Label>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {temperatureUnit === "metric" ? "Celsius (°C)" : "Fahrenheit (°F)"}
              </p>
            </div>
            <Switch
              id="temperature-unit"
              checked={temperatureUnit === "imperial"}
              onCheckedChange={handleUnitChange}
            />
          </div>
          
          {/* Forecast Settings */}
          <Collapsible>
            <CollapsibleTrigger className="flex items-center justify-between w-full">
              <div className="flex items-center gap-2">
                <CalendarDays className="h-4 w-4" />
                <span className="font-medium">Forecast Preferences</span>
              </div>
            </CollapsibleTrigger>
            <CollapsibleContent className="space-y-4 mt-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="detailed-forecast">Show Detailed Forecast</Label>
                <Switch
                  id="detailed-forecast"
                  checked={showDetailedForecast}
                  onCheckedChange={setShowDetailedForecast}
                />
              </div>
              <div>
                <Label htmlFor="forecast-days">Days to Show</Label>
                <Input
                  id="forecast-days"
                  type="number"
                  min="1"
                  max="7"
                  value={forecastDays}
                  onChange={(e) => setForecastDays(Number(e.target.value))}
                  className="mt-2"
                />
              </div>
            </CollapsibleContent>
          </Collapsible>
          
          {/* Default Location Setting */}
          <div className="space-y-2">
            <Label htmlFor="default-location" className="text-base">Default Location</Label>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
              This location will be loaded when you open the app
            </p>
            <div className="flex gap-2">
              <Input 
                id="default-location"
                value={locationInput}
                onChange={(e) => setLocationInput(e.target.value)}
                placeholder="Enter city name..."
                className="flex-1"
              />
              <Button onClick={handleSaveDefaultLocation} size="sm">
                <Save className="h-4 w-4 mr-1" />
                Save
              </Button>
            </div>
          </div>
          
          {/* About Section */}
          <Collapsible>
            <CollapsibleTrigger className="flex items-center justify-between w-full">
              <div className="flex items-center gap-2">
                <Info className="h-4 w-4" />
                <span className="font-medium">About</span>
              </div>
            </CollapsibleTrigger>
            <CollapsibleContent className="space-y-4 mt-4">
              <div className="space-y-2">
                <p className="text-sm font-medium">Version</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">1.0.0</p>
              </div>
              <div className="space-y-2">
                <p className="text-sm font-medium">Open Source</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  This weather app is open source and licensed under MIT.
                  Built with React, Typescript, and Tailwind CSS.
                </p>
              </div>
            </CollapsibleContent>
          </Collapsible>

          {/* Legal Information */}
          <div className="space-y-3 pt-2">
            <Label className="text-base">Legal Information</Label>
            <div className="flex flex-col gap-2">
              <Button variant="outline" className="justify-start" onClick={openTerms}>
                <FileText className="h-4 w-4 mr-2" />
                Terms of Service
              </Button>
              <Button variant="outline" className="justify-start" onClick={openPrivacy}>
                <Shield className="h-4 w-4 mr-2" />
                Privacy Policy
              </Button>
            </div>
          </div>

          <div className="pt-4 border-t dark:border-gray-700">
            <p className="text-xs text-gray-500 dark:text-gray-400">
              All settings are automatically saved and will persist across sessions.
              Weather data is provided by OpenWeatherMap.
            </p>
          </div>
        </div>
      </div>
      
      <TermsAndPolicy 
        isOpen={termsOpen || privacyOpen}
        onClose={() => {
          setTermsOpen(false);
          setPrivacyOpen(false);
        }}
        type={policyType}
      />
    </div>
  );
};

export default Settings;
