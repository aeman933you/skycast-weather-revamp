
import React from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useWeather } from "@/context/WeatherContext";
import { TemperatureUnit } from "@/types/weather";
import { X } from "lucide-react";

interface SettingsProps {
  isOpen: boolean;
  onClose: () => void;
}

const Settings: React.FC<SettingsProps> = ({ isOpen, onClose }) => {
  const { temperatureUnit, setTemperatureUnit } = useWeather();

  const handleUnitChange = (checked: boolean) => {
    setTemperatureUnit(checked ? "imperial" : "metric");
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

          <div className="pt-4 border-t dark:border-gray-700">
            <p className="text-xs text-gray-500 dark:text-gray-400">
              All settings are automatically saved and will persist across sessions.
              Weather data is provided by OpenWeatherMap.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
