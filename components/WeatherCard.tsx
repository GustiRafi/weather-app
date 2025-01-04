import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

interface WeatherData {
  city: string;
  temperature: number;
  description: string;
  icon: string;
}

export default function WeatherCard({ city, temperature, description, icon }: WeatherData) {
  return (
    <Card className="w-full max-w-sm mx-auto mt-4">
      <CardHeader>
        <CardTitle>{city}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-4">
          <img
            src={`https://openweathermap.org/img/wn/${icon}@2x.png`}
            alt={description}
            className="w-16 h-16"
          />
          <div>
            <p className="text-2xl font-bold">{temperature}°C</p>
            <p className="capitalize text-gray-600">{description}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
