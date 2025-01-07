'use client';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { get } from "http";
import { useEffect, useState } from "react";
export default function ForecastCard({coords}: {coords: {lat: number, lon: number}}) {
    const [forecast, setForecast] = useState([]);

    const getForecast = async () => {
        try {
            const response = await fetch(
                `https://api.openweathermap.org/data/2.5/forecast?lat=${coords.lat}&lon=${coords.lon}&appid=29fbc40261d20fbcfc680502f238731f&units=metric`
            );
            const data = await response.json();
    
            return data;
        } catch (error) {
            return error;
        }
    };

     useEffect(() => {
    getForecast().then((data) => {
     const today = new Date().toISOString().split('T')[0];
     const filteredData = data.list.filter((item: any) => item.dt_txt.split(' ')[0] !== today).slice(0, 4);
     setForecast(filteredData);
    });
     }, [coords]);

    return (
        <Card className="w-full mx-auto mt-5 ">
            <CardHeader>
                <CardTitle>4 Days Forecast</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {forecast.map((item: any, index: number) => (
                    <div key={index} className="bg-blue-100 p-4 rounded-lg shadow-md flex items-center space-x-4">
                        <div className="text-4xl">
                            <img src={`http://openweathermap.org/img/wn/${item.weather[0].icon}.png`} alt="weather icon" />
                        </div>
                        <div>
                            <h2 className="text-xl font-semibold">{new Date(item.dt_txt).toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' })}</h2>
                            <p className="text-lg">Temperature: {item.main.temp}°C</p>
                            <p className="text-gray-600">Description: {item.weather[0].description}</p>
                        </div>
                    </div>
                ))}
            </CardContent>
        </Card>
    );
}