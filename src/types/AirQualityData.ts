export interface AirQualityResponse {
  status: string;
  data: AirQualityData;
}

export interface AirQualityData {
  aqi: number;
  idx: number;
  attributions: any[];
  city: {
    geo: [number, number];
    name: string;
    url: string;
    location: string;
  };
  dominentpol: string;
  iaqi: any;
  time: {
    s: string;
    tz: string;
    v: number;
    iso: string;
  };
  forecast: any;
  debug: {
    sync: string;
  };
}

export interface LocationAirQuality {
  location: string;
  data: AirQualityData | null;
}

export type AirQualityMap = LocationAirQuality[];
