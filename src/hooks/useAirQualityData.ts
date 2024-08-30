import { useState, useEffect, useCallback } from "react";
import { AirQualityMap, AirQualityResponse } from "../types/AirQualityData";
import { LOCATIONS, API_BASE_URL, API_TOKEN } from "../constants";

export const useAirQualityData = () => {
  const [airQualityData, setAirQualityData] = useState<AirQualityMap>([]);
  const [error, setError] = useState<Error | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedLocation, setSelectedLocation] = useState<string>(
    LOCATIONS[0]
  );

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const results = await Promise.all(
        LOCATIONS.map(async (location) => {
          const url = `${API_BASE_URL}/${location.toLowerCase()}/?token=${API_TOKEN}`;
          const response = await fetch(url);
          if (!response.ok) {
            throw new Error(`HTTP error, status: ${response.status}`);
          }
          const result: AirQualityResponse = await response.json();
          return { location, data: result.data };
        })
      );
      setAirQualityData(results);
    } catch (err) {
      setError(
        err instanceof Error ? err : new Error("An unknown error occurred")
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return {
    airQualityData,
    error,
    loading,
    selectedLocation,
    setSelectedLocation,
    fetchData,
  };
};
