"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface SearchInputProps {
  onSearch: (city: string) => void;
}

export default function SearchInput({ onSearch }: SearchInputProps) {
  const [city, setCity] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = () => {
    if (city.trim()) {
      setIsLoading(true);
      onSearch(city);
      setCity("");
      setIsLoading(false);
    }
  };

  return (
    <div>
      <form onSubmit={(e) => {
        e.preventDefault();
        handleSearch();
      }} className="flex gap-2">
      <Input
        placeholder="Enter city name"
        value={city}
        onChange={(e) => setCity(e.target.value)}
      />
      <Button disabled={isLoading}>{ isLoading ? "Searching..." : "Search"}</Button>
      </form>
    </div>
  );
}
