//@ts-nocheck
import { render, screen } from "@testing-library/react";
import { describe, it, expect, beforeEach, vi } from "vitest";
import userEvent from "@testing-library/user-event";
import App from "./App";
import { useAirQualityData } from "./hooks/useAirQualityData";
import { AirQualityMap } from "./types/AirQualityData";

vi.mock("./hooks/useAirQualityData");
vi.mock("./constants", () => ({
  LOCATIONS: ["London", "Paris", "New York"],
  API_BASE_URL: "https://api.example.com",
  API_TOKEN: "mock-token",
}));

vi.mock("./LoadingSpinner", () => ({
  LoadingSpinner: () => <div data-testid="loading-spinner">Loading...</div>,
}));
vi.mock("./ErrorDisplay", () => ({
  ErrorDisplay: ({ error, onRefresh }: { error: any; onRefresh: any }) => (
    <div data-testid="error-display">
      Error: {error.message}
      <button onClick={onRefresh}>Refresh</button>
    </div>
  ),
}));
vi.mock("./AirQualityDisplay", () => ({
  AirQualityDisplay: ({ data }: { data: any }) => (
    <div data-testid="air-quality-display">AQI: {data.aqi}</div>
  ),
}));
vi.mock("./LocationSelector", () => ({
  LocationSelector: ({
    locations,
    selectedLocation,
    onLocationChange,
    onRefresh,
  }: {
    locations: any;
    selectedLocation: any;
    onLocationChange: any;
    onRefresh: any;
  }) => (
    <div data-testid="location-selector">
      <select
        value={selectedLocation}
        onChange={(e) => onLocationChange(e.target.value)}
        data-testid="location-select"
      >
        {locations.map((location: any) => (
          <option key={location} value={location}>
            {location}
          </option>
        ))}
      </select>
      <button onClick={onRefresh}>Refresh</button>
    </div>
  ),
}));

describe("App Component", () => {
  const mockSetGlobalAQI = vi.fn();
  const mockFetchData = vi.fn();
  const mockSetSelectedLocation = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    const mockAirQualityData: AirQualityMap = [
      { location: "London", data: { aqi: 50 } },
      { location: "Paris", data: { aqi: 60 } },
    ];
    vi.mocked(useAirQualityData).mockReturnValue({
      loading: false,
      error: null,
      airQualityData: mockAirQualityData,
      selectedLocation: "London",
      setSelectedLocation: mockSetSelectedLocation,
      fetchData: mockFetchData,
    });
  });

  it("renders loading spinner when loading", () => {
    vi.mocked(useAirQualityData).mockReturnValue({
      loading: true,
      error: null,
      airQualityData: [],
      selectedLocation: "London",
      setSelectedLocation: mockSetSelectedLocation,
      fetchData: mockFetchData,
    });

    render(<App setGlobalAQI={mockSetGlobalAQI} />);
    expect(screen.getByTestId("loading-spinner")).toBeDefined();
  });

  it("renders error display when there is an error", () => {
    const mockError = new Error("Test error");
    vi.mocked(useAirQualityData).mockReturnValue({
      loading: false,
      error: mockError,
      airQualityData: [],
      selectedLocation: "London",
      setSelectedLocation: mockSetSelectedLocation,
      fetchData: mockFetchData,
    });

    render(<App setGlobalAQI={mockSetGlobalAQI} />);
    expect(screen.getByTestId("error-display")).toBeDefined();
    expect(screen.getByText("Error: Test error")).toBeDefined();
  });

  it("renders air quality display and location selector when data is loaded", () => {
    render(<App setGlobalAQI={mockSetGlobalAQI} />);
    expect(screen.getByTestId("air-quality-display")).toBeDefined();
    expect(screen.getByTestId("location-selector")).toBeDefined();
    expect(screen.getByText("AQI: 50")).toBeDefined();
  });

  it("calls setGlobalAQI when air quality data changes", () => {
    render(<App setGlobalAQI={mockSetGlobalAQI} />);
    expect(mockSetGlobalAQI).toHaveBeenCalledWith(50);
  });

  it("handles location change", async () => {
    render(<App setGlobalAQI={mockSetGlobalAQI} />);

    const select = screen.getByTestId("location-select");
    await userEvent.selectOptions(select, "Paris");

    expect(mockSetSelectedLocation).toHaveBeenCalledWith("Paris");
  });

  it("handles refresh", async () => {
    render(<App setGlobalAQI={mockSetGlobalAQI} />);

    const refreshButton = screen.getByText("Refresh");
    await userEvent.click(refreshButton);

    expect(mockFetchData).toHaveBeenCalled();
  });
});
