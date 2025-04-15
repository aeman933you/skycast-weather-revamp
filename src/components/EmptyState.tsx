
import React from "react";
import { CloudRain } from "lucide-react";

const EmptyState: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center p-8 bg-gray-50 dark:bg-gray-800 rounded-2xl animate-fade-in">
      <CloudRain className="h-16 w-16 text-sky-400 mb-4 animate-float" />
      <h3 className="text-xl font-semibold mb-2">No Weather Data</h3>
      <p className="text-center text-gray-500 dark:text-gray-400 max-w-xs">
        Search for a city or use your current location to see weather information.
      </p>
    </div>
  );
};

export default EmptyState;
