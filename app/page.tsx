"use client";

import { useState,useEffect } from "react";
import SearchInput from "@/components/SearchInput";
import WeatherCard from "@/components/WeatherCard";

export default function Home() {
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");

  const fetchWeather = async (city: string) => {
    try {
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=29fbc40261d20fbcfc680502f238731f&units=metric`
      );
      if (!res.ok) {
        console.error("Error:", data);
        throw new Error("City not found");
      }

      const data = await res.json();
      setWeather({
        city: data.name,
        temperature: data.main.temp,
        description: data.weather[0].description,
        icon: data.weather[0].icon,
      });
    } catch (error) {
      alert(error.message);
    }
  };


  const fetchWeatherByCoords = async (lat: number, lon: number) => {
    try {
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=29fbc40261d20fbcfc680502f238731f&units=metric`
      );
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to fetch weather data");
      }

      setWeather({
        city: data.name,
        temperature: data.main.temp,
        description: data.weather[0].description,
        icon: data.weather[0].icon,
      });
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          fetchWeatherByCoords(latitude, longitude);
        },
        (err) => {
          setError("Location access denied. Please enable it to see weather data.");
        }
      );
    } else {
      setError("Geolocation is not supported by your browser.");
    }
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-6">Weather App</h1>
      <SearchInput onSearch={fetchWeather} />
      {weather && (
        <WeatherCard
          city={weather.city}
          temperature={weather.temperature}
          description={weather.description}
          icon={weather.icon}
        />
      )}
    </div>
  );
}
