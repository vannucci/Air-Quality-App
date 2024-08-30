import { act, renderHook, waitFor } from "@testing-library/react";
import { useAirQualityData } from "./useAirQualityData";
import { expect } from "vitest";

describe("useAirQualityData", () => {
  beforeEach(() => {
    vi.mock("../constants", () => ({
      LOCATIONS: ["London"],
      API_BASE_URL: "https://api.example.com",
      API_TOKEN: "mock-token",
    }));

    const mockData = {
      status: "ok",
      data: {
        aqi: 42,
        idx: 100,
        attributions: [
          {
            url: "https://ug.usembassy.gov/",
            name: "London",
            logo: "US-StateDepartment.png",
          },
          {
            url: "https://waqi.info/",
            name: "World Air Quality Index Project",
          },
        ],
        city: {
          geo: [0.300225, 32.591553],
          name: "London",
          url: "https://aqicn.org/city/uganda/kampala/us-embassy",
          location: "",
        },
        dominentpol: "pm25",
        time: {
          iso: "2024-08-29T05:00:00+03:00",
        },
      },
    };

    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      status: 200,
      json: async () => mockData,
    });

    vi.clearAllMocks();
  });
  it("should fetch data successfully", async () => {
    const { result } = renderHook(() => useAirQualityData());
    await waitFor(() => expect(result.current.loading).toBe(false));
    expect(result.current.error).toBe(null);
    expect(result.current.selectedLocation).toBe("London");
  });
  it("should handle error", async () => {
    global.fetch = vi.fn().mockRejectedValue(new Error("HTTP error"));
    const { result } = renderHook(() => useAirQualityData());
    await waitFor(() => expect(result.current.loading).toBe(false));
    expect(result.current.error).toEqual(new Error("HTTP error"));
  });
  it("should update selected location", () => {
    const { result } = renderHook(() => useAirQualityData());

    act(() => {
      result.current.setSelectedLocation("Paris");
    });

    expect(result.current.selectedLocation).toBe("Paris");
  });
});
