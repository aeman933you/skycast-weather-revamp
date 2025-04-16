
import React from "react";
import { ForecastData } from "@/types/weather";
import { 
  formatDate, 
  getWeatherIcon, 
  getUnitSymbol,
  getDailyForecast
} from "@/lib/utils";
import { useWeather } from "@/context/WeatherContext";
import { 
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from "@/components/ui/carousel";
import { Card } from "@/components/ui/card";

interface ForecastCardProps {
  data: ForecastData;
}

const ForecastCard: React.FC<ForecastCardProps> = ({ data }) => {
  const { temperatureUnit } = useWeather();
  const unitSymbol = getUnitSymbol(temperatureUnit);
  
  // Get one forecast item per day
  const dailyForecast = getDailyForecast(data.list);

  return (
    <div className="weather-card animate-fade-in">
      <h3 className="text-xl font-semibold mb-4">5-Day Forecast</h3>
      
      <Carousel className="w-full">
        <CarouselContent className="-ml-1 md:-ml-2">
          {dailyForecast.slice(0, 5).map((item) => (
            <CarouselItem key={item.dt} className="pl-1 md:pl-2 sm:basis-1/2 md:basis-1/3 lg:basis-1/5">
              <Card className="overflow-hidden">
                <div 
                  className="flex flex-col items-center p-4 rounded-lg bg-gray-50 dark:bg-gray-700 h-full"
                >
                  <p className="font-medium mb-2">
                    {formatDate(item.dt).split(", ")[0]}
                  </p>
                  <img 
                    src={getWeatherIcon(item.weather[0].icon)} 
                    alt={item.weather[0].description}
                    className="w-12 h-12 my-1" 
                  />
                  <p className="capitalize text-sm text-gray-500 dark:text-gray-400 mb-2">
                    {item.weather[0].description}
                  </p>
                  <div className="flex justify-between w-full">
                    <span className="font-semibold">{Math.round(item.main.temp_max)}{unitSymbol}</span>
                    <span className="text-gray-500 dark:text-gray-400">
                      {Math.round(item.main.temp_min)}{unitSymbol}
                    </span>
                  </div>
                </div>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
        <div className="hidden md:block">
          <CarouselPrevious className="left-0 lg:-left-12" />
          <CarouselNext className="right-0 lg:-right-12" />
        </div>
      </Carousel>
    </div>
  );
};

export default ForecastCard;
