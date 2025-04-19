
import React from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { ChevronLeft } from "lucide-react";
import { useWeather } from "@/context/WeatherContext";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ScrollArea } from "@/components/ui/scroll-area";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

interface SettingsProps {
  isOpen: boolean;
  onClose: () => void;
}

const Settings: React.FC<SettingsProps> = ({ isOpen, onClose }) => {
  const { temperatureUnit, setTemperatureUnit } = useWeather();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-background z-50">
      <ScrollArea className="h-full">
        <div className="container max-w-lg mx-auto px-4 py-6">
          {/* Header */}
          <div className="flex items-center mb-8">
            <Button variant="ghost" size="icon" onClick={onClose} className="mr-4">
              <ChevronLeft className="h-6 w-6" />
            </Button>
            <h1 className="text-2xl font-semibold">Settings</h1>
          </div>

          {/* Content */}
          <div className="space-y-8">
            {/* Home Screen Weather Section */}
            <section>
              <h2 className="text-xl mb-6">Home Screen Weather</h2>
              
              <div className="space-y-6">
                {/* Temperature Unit */}
                <div>
                  <Label className="text-base mb-2 block">Temperature unit</Label>
                  <RadioGroup 
                    defaultValue={temperatureUnit}
                    onValueChange={(value) => setTemperatureUnit(value as "metric" | "imperial")}
                    className="space-y-3"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="metric" id="metric" />
                      <Label htmlFor="metric" className="text-sm text-muted-foreground">
                        Celsius (°C)
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="imperial" id="imperial" />
                      <Label htmlFor="imperial" className="text-sm text-muted-foreground">
                        Fahrenheit (°F)
                      </Label>
                    </div>
                  </RadioGroup>
                </div>

                {/* Hourly Forecast Interval */}
                <div>
                  <Label className="text-base mb-2 block">Hourly forecast interval</Label>
                  <Select defaultValue="1">
                    <SelectTrigger>
                      <SelectValue placeholder="Select interval" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">1-hour interval</SelectItem>
                      <SelectItem value="3">3-hour interval</SelectItem>
                      <SelectItem value="6">6-hour interval</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Multi-day Forecast Format */}
                <div>
                  <Label className="text-base mb-2 block">Multi-day forecast format</Label>
                  <Select defaultValue="list">
                    <SelectTrigger>
                      <SelectValue placeholder="Select format" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="list">List</SelectItem>
                      <SelectItem value="grid">Grid</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </section>

            {/* About Section */}
            <section className="space-y-6">
              <div className="py-2">
                <Label className="text-base">Version</Label>
                <p className="text-sm text-muted-foreground">V6.4.0.7</p>
              </div>
              
              <Button 
                variant="ghost" 
                className="w-full justify-start px-0 hover:bg-transparent hover:underline"
              >
                Open-Source Software Statement
              </Button>
              
              <Button 
                variant="ghost" 
                className="w-full justify-start px-0 hover:bg-transparent hover:underline"
              >
                User Agreement
              </Button>
              
              <Button 
                variant="ghost" 
                className="w-full justify-start px-0 hover:bg-transparent hover:underline"
              >
                Privacy
              </Button>
            </section>
          </div>
        </div>
      </ScrollArea>
    </div>
  );
};

export default Settings;
