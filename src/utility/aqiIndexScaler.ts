interface AQICategory {
  range: [number, number];
  label: string;
  color: string;
  contrastColor: string;
}

const aqiCategories: AQICategory[] = [
  { range: [0, 50], label: "Good", color: "#009966", contrastColor: "#ffffff" },
  {
    range: [51, 100],
    label: "Moderate",
    color: "#ffde33",
    contrastColor: "#ffffff",
  },
  {
    range: [101, 150],
    label: "Unhealthy for Sensitive Groups",
    color: "#ff9933",
    contrastColor: "#ffffff",
  },
  {
    range: [151, 200],
    label: "Unhealthy",
    color: "#cc0033",
    contrastColor: "#ffffff",
  },
  {
    range: [201, 300],
    label: "Very Unhealthy",
    color: "#660099",
    contrastColor: "#ffffff",
  },
  {
    range: [300, Infinity],
    label: "Hazardous",
    color: "#7e0023",
    contrastColor: "#ffffff",
  },
];

export const getAQICategory = (aqi: number): AQICategory =>
  aqiCategories.find(
    (category) => aqi >= category.range[0] && aqi <= category.range[1]
  ) || aqiCategories[aqiCategories.length - 1];

export const getAQIColor = (aqi: number): string => getAQICategory(aqi).color;
export const getContrastColor = (aqi: number): string =>
  getAQICategory(aqi).contrastColor;
export const getAQILabel = (aqi: number): string => getAQICategory(aqi).label;
