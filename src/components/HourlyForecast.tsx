
import React from "react";
import { ForecastData } from "@/types/weather";
import { formatTime, getWeatherIcon, getUnitSymbol } from "@/lib/utils";
import { useWeather } from "@/context/WeatherContext";
import { Card } from "@/components/ui/card";
import {
  Area,
  AreaChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip
} from "recharts";

interface HourlyForecastProps {
  data: ForecastData;
}

const HourlyForecast: React.FC<HourlyForecastProps> = ({ data }) => {
  const { temperatureUnit } = useWeather();
  const unitSymbol = getUnitSymbol(temperatureUnit);
  
  // Get next 5 forecast items (15 hours)
  const hourlyData = data.list.slice(0, 5).map(item => ({
    time: formatTime(item.dt),
    temp: Math.round(item.main.temp),
    icon: item.weather[0].icon,
    description: item.weather[0].description
  }));

  const chartData = hourlyData.map(item => ({
    time: item.time,
    temperature: item.temp
  }));

  return (
    <div className="weather-card space-y-6">
      <div className="h-48">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={chartData}>
            <defs>
              <linearGradient id="temperatureGradient" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#fb923c" />
                <stop offset="50%" stopColor="#fbbf24" />
                <stop offset="100%" stopColor="#84cc16" />
              </linearGradient>
            </defs>
            <XAxis 
              dataKey="time" 
              tickLine={false}
              axisLine={false}
              fontSize={12}
            />
            <YAxis 
              hide={true}
              domain={['dataMin - 2', 'dataMax + 2']}
            />
            <Tooltip 
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  return (
                    <div className="bg-white/90 dark:bg-gray-800/90 p-2 rounded-lg shadow-lg text-sm">
                      <p className="font-semibold">
                        {payload[0].value}{unitSymbol}
                      </p>
                    </div>
                  );
                }
                return null;
              }}
            />
            <Area
              type="monotone"
              dataKey="temperature"
              stroke="url(#temperatureGradient)"
              strokeWidth={3}
              fill="none"
              dot={{ fill: '#fff', stroke: '#fb923c', strokeWidth: 2, r: 4 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className="grid grid-cols-5 gap-2">
        {hourlyData.map((hour, index) => (
          <div key={index} className="flex flex-col items-center">
            <span className="text-sm font-medium mb-1">
              {index === 0 ? 'Now' : hour.time}
            </span>
            <img 
              src={getWeatherIcon(hour.icon)} 
              alt={hour.description}
              className="w-8 h-8" 
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default HourlyForecast;
