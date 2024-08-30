import { FC, useCallback, useEffect, useMemo, useState } from "react";
import "./App.css";
import { Container } from "@mui/material";
import { LOCATIONS } from "./constants";
import { useAirQualityData } from "./hooks/useAirQualityData";
import { LocationSelector } from "./LocationSelector";
import { AirQualityDisplay } from "./AirQualityDisplay";
import { ErrorDisplay } from "./ErrorDisplay";
import { LoadingSpinner } from "./LoadingSpinner";

interface AppProps {
  setGlobalAQI: (aqi: number) => void;
}

const App: FC<AppProps> = ({ setGlobalAQI }) => {
  const {
    airQualityData,
    error,
    loading,
    selectedLocation,
    setSelectedLocation,
    fetchData,
  } = useAirQualityData();

  const selectedAirQualityData = useMemo(
    () => airQualityData.find((datum) => datum.location === selectedLocation),
    [airQualityData, selectedLocation]
  );

  useEffect(() => {
    if (selectedAirQualityData && selectedAirQualityData.data) {
      setGlobalAQI(selectedAirQualityData.data.aqi);
    }
  }, [selectedAirQualityData, setGlobalAQI]);

  const handleRefresh = useCallback(() => {
    fetchData();
  }, [fetchData]);

  const handleLocationChange = useCallback(
    (location: string) => setSelectedLocation(location),
    [setSelectedLocation]
  );

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      {loading && <LoadingSpinner />}
      {!loading && error && (
        <ErrorDisplay error={error} onRefresh={handleRefresh} />
      )}
      {!loading && selectedAirQualityData?.data && (
        <>
          <AirQualityDisplay data={selectedAirQualityData.data} />
          <LocationSelector
            locations={LOCATIONS}
            selectedLocation={selectedLocation}
            onLocationChange={handleLocationChange}
            onRefresh={handleRefresh}
          />
        </>
      )}
    </Container>
  );
};

export default App;
