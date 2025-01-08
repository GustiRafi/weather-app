"use client";

import { useState,useEffect } from "react";
import SearchInput from "@/components/weather/SearchInput";
import { Weather } from "@/types/weather";
import WeatherWrapper from "@/components/weather/WeatherWrapper";
// import { set } from "zod";

export default function Home() {
  const [weather, setWeather] = useState<Weather | null>(null);
  // const [error, setError] = useState("");
  const [coords, setCoords] = useState({ lat: -6.2146, lon: 106.8451 });

  const fetchWeather = async (city: string) => {
    try {
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=29fbc40261d20fbcfc680502f238731f&units=metric`
      );
      if (!res.ok) {
        throw new Error("City not found");
      }

      const data = await res.json();
      setCoords({ lat: data.coord.lat, lon: data.coord.lon });
      setWeather(data);
    } catch (error) {
      if (error instanceof Error) {
        alert(error.message);
      } else {
        alert("An unknown error occurred");
      }
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

      setWeather(data);
    } catch (error) {
      if (error instanceof Error) {
        alert(error.message);
        // setError(error.message);
      } else {
        alert("An unknown error occurred");
        // setError("An unknown error occurred");
      }
    }
  };

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setCoords({ lat: latitude, lon: longitude });
          fetchWeatherByCoords(latitude, longitude);
        },
        (error) => {
          alert(error.message);
        }
      );
    } else {
      alert("Geolocation is not supported by your browser.");
    }
  }, []);

  return (
    <div className="container p-4 max-w-6xl mx-auto space-y-6">
      <h1 className="text-3xl font-bold text-center mb-6">Weather App</h1>
      <SearchInput onSearch={fetchWeather} />
      {/* <Map lat={coords.lat} lon={coords.lon} /> */}
      {weather && (
        <WeatherWrapper
          city={weather.name}
          coords={coords}
          main={weather.main} 
          wind={weather.wind} 
          sys={weather.sys} 
          weather={weather.weather[0]}
        />
      )}
    </div>
  );
}
