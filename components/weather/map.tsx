'use client'
// import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { useEffect, useRef } from "react";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { Coord } from "@/types/weather";

const createCustomIcon = () => {
  const svgIcon = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" width="24" height="24">
      <path fill="#ef4444" d="M215.7 499.2C267 435 384 279.4 384 192C384 86 298 0 192 0S0 86 0 192c0 87.4 117 243 168.3 307.2c12.3 15.3 35.1 15.3 47.4 0zM192 256c-35.3 0-64-28.7-64-64s28.7-64 64-64s64 28.7 64 64s-28.7 64-64 64z"/>
    </svg>
  `;

  return L.divIcon({
    html: svgIcon,
    className: 'custom-marker-icon',
    iconSize: [24, 36],
    iconAnchor: [12, 36],
    popupAnchor: [1, -34],
  });
};

interface MapProps {
  city: string;
  coordinates: Coord;
  weather: {
    description: string;
    temp: number;
  }
}

export default function Map({city,weather,coordinates, }: MapProps) {
  const mapRef = useRef<L.Map | null>(null);
  const markerRef = useRef<L.Marker | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined' && coordinates) {
      if (!mapRef.current) {
        mapRef.current = L.map('map').setView([coordinates.lat, coordinates.lon], 14);
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '© OpenStreetMap contributors'
        }).addTo(mapRef.current);
      } else {
        mapRef.current.setView([coordinates.lat, coordinates.lon]);
      }

      if (markerRef.current) {
        markerRef.current.remove();
      }

      markerRef.current = L.marker([coordinates.lat, coordinates.lon], {
        icon: createCustomIcon()
      })
        .addTo(mapRef.current)
        .bindPopup(
          `<b>${city}</b><br>
           Temperature: ${Math.round(weather.temp)}°C<br>
           Description: ${weather.description}`
        )
        .openPopup();

      return () => {
        if (markerRef.current) {
          markerRef.current.remove();
        }
      };
    }
  }, [coordinates, weather, city]);


  return (
    <div className="h-[650px] rounded-lg overflow-hidden">
      <div id="map" className="h-full w-full" />
      <style jsx global>{`
        .custom-marker-icon {
          background: none;
          border: none;
        }
      `}</style>
    </div>
  );
}