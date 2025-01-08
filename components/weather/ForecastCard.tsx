'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useEffect, useState } from "react";
import Image from "next/image";

interface ForecastData {
  dt_txt: string;
  main: {
    temp: number;
  };
  weather: {
    icon: string;
    description: string;
  }[];
}

interface ForecastCardProps {
  coords: {
    lat: number;
    lon: number;
  };
}

export default function ForecastCard({ coords }: ForecastCardProps) {
  const [forecast, setForecast] = useState<ForecastData[]>([]);
  const [error, setError] = useState<string | null>(null);

  const getForecast = async () => {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${coords.lat}&lon=${coords.lon}&appid=29fbc40261d20fbcfc680502f238731f&units=metric`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch forecast data.");
      }

      const data = await response.json();
      return data;
    } catch (err) {
      console.error(err);
      setError("Unable to fetch forecast data.");
    }
  };

useEffect(() => {
    getForecast()?.then((data) => {
        if (data && data.list) {
            const filterData = data.list.reduce((acc: Record<string, typeof data.list[0]>, item: { dt_txt: string; }) => {
                    const date = new Date(item.dt_txt).toLocaleDateString();
                    if (!acc[date] && date !== new Date().toLocaleDateString()) {
                        acc[date] = item;
                    }
                    return acc;
            }, {} as Record<string, typeof data.list[0]>);
            const filteredData = Object.values(filterData).slice(0, 4);

            setForecast(filteredData as ForecastData[]);
        }
    });
}, [coords]);

  if (error) {
    return (
      <Card className="w-full mx-auto mt-5">
        <CardHeader>
          <CardTitle>Error</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-red-500">{error}</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full mx-auto mt-5">
      <CardHeader>
        <CardTitle>4 Days Forecast</CardTitle>
      </CardHeader>
      <CardContent className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {forecast.map((item, index) => (
          <div
            key={index}
            className="bg-blue-100 p-4 rounded-lg shadow-md flex items-center space-x-4"
          >
            <div className="text-4xl">
              <Image
                src={`http://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`}
                alt="weather icon"
                width={64}
                height={64}
              />
            </div>
            <div>
              <h2 className="text-xl font-semibold">
                {new Date(item.dt_txt).toLocaleDateString("en-US", {
                  weekday: "long",
                  month: "short",
                  day: "numeric",
                })}
              </h2>
              <p className="text-lg">Temperature: {item.main.temp}°C</p>
              <p className="text-gray-600">
                Description: {item.weather[0].description}
              </p>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}