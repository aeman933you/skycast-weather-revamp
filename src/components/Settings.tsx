
import React, { useState } from "react";
import { useWeather } from "@/context/WeatherContext";
import TermsAndPolicy from "./TermsAndPolicy";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

interface SettingsProps {
  isOpen: boolean;
  onClose: () => void;
}

const Settings: React.FC<SettingsProps> = ({ isOpen, onClose }) => {
  const { temperatureUnit } = useWeather();
  const [termsOpen, setTermsOpen] = useState(false);
  const [privacyOpen, setPrivacyOpen] = useState(false);
  const [policyType, setPolicyType] = useState<"terms" | "privacy">("terms");

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black flex flex-col items-stretch justify-start min-h-screen">
      {/* Top bar */}
      <div className="flex items-center h-16 px-4 border-b border-white/10">
        <button
          onClick={onClose}
          className="mr-3 p-1 rounded-full text-white hover:bg-white/10 transition"
          aria-label="Back"
        >
          <ArrowLeft size={24} />
        </button>
        <h2 className="text-xl font-semibold text-white">Settings</h2>
      </div>
      <div className="flex-1 overflow-y-auto px-6 py-8">
        {/* Section list */}
        <div className="space-y-9">
          <div>
            <div className="text-lg text-white mb-1">Home Screen Weather</div>
          </div>
          <div>
            <div className="text-lg text-white mb-1">Temperature unit</div>
            <div className="text-base text-gray-400">
              {temperatureUnit === "imperial" ? "Fahrenheit (°F)" : "Celsius (°C)"}
            </div>
          </div>
          <div>
            <div className="text-lg text-white mb-1">Hourly forecast interval</div>
            <div className="text-base text-gray-400">1-hour interval</div>
          </div>
          <div>
            <div className="text-lg text-white mb-1">Multi-day forecast format</div>
            <div className="text-base text-gray-400">List</div>
          </div>
          <div>
            <button
              className="text-lg text-white text-left w-full"
              onClick={() => {
                setPolicyType("terms");
                setTermsOpen(true);
              }}
            >
              Open-Source Software Statement
            </button>
          </div>
          <div>
            <button
              className="text-lg text-white text-left w-full"
              onClick={() => {
                setPolicyType("terms");
                setTermsOpen(true);
              }}
            >
              User Agreement
            </button>
          </div>
          <div>
            <button
              className="text-lg text-white text-left w-full"
              onClick={() => {
                setPolicyType("privacy");
                setPrivacyOpen(true);
              }}
            >
              Privacy
            </button>
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

