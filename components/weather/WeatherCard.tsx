import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import Map from "@/components/weather/map";
import { Coord, WeatherElement, Main, Wind, Sys } from "@/types/weather";
import ForecastCard from "@/components/weather/ForecastCard";
import Image from "next/image";
interface WeatherData {
  city: string;
  coords: Coord;
  main: Main;
  wind: Wind;
  sys: Sys;
  weather: WeatherElement;
}


export default function WeatherCard({ city, coords, main, wind,weather}: WeatherData) {
    const [favorites, setFavorites] = useState(false);
    const handleAddToFavorites = () => {
        if(favorites) {
            setFavorites(false);
        } else {
            setFavorites(true);
        }
    }

    return (
    <Card className="w-full mx-auto mt-4">
      <CardHeader className="grid grid-cols-2 gap-6 justify-between">
        <CardTitle className="text-2xl font-bold text-gray-800 dark:text-white">{city}</CardTitle>
        <div className="flex gap-2 justify-end">
          <button onClick={handleAddToFavorites}>
           {favorites ? '❤️' : '🤍'}
          </button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <Map weather={{description: weather.description, temp: main.temp}} coordinates={coords} city={city} />
          </div>
          <div>
            <Image
              src={`https://openweathermap.org/img/wn/${weather.icon}@2x.png`}
              alt={weather.description}
              width={64}
              height={64}
              className="w-16 h-16"
            />
            <div className="flex flex-col lg:flex-row lg:items-center gap-4">
                <div>
                    <p className="text-2xl font-bold">{main.temp}°C</p>
                    <p className="capitalize text-gray-600">{weather.description}</p>
                </div>
                <div className="grid grid-cols-2 gap-2 lg:mt-0 mt-2 w-full">
                    <div className="bg-gray-200 p-2 rounded-lg">
                    <p className="text-sm font-semibold">Wind Speed</p>
                    <p className="text-gray-600">{wind.speed} m/s</p>
                    </div>
                    <div className="bg-gray-200 p-2 rounded-lg">
                    <p className="text-sm font-semibold">Humidity</p>
                    <p className="text-gray-600">{main.humidity}%</p>
                    </div>
                </div>
            </div>
            <div className="mt-3">
                <ForecastCard coords={coords} />
            </div>
          </div>
        </div>
        {/* <Button variant="destructive" className="mt-4 w-full">See forecast</Button> */}
      </CardContent>
    </Card>
  );
}
