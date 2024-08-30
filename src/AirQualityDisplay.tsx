import { Box, Link, Typography } from "@mui/material";
import { getAQILabel } from "./utility/aqiIndexScaler";
import { FC } from "react";
import { AirQualityData } from "./types/AirQualityData";

interface AirQualityDisplayProps {
  data: AirQualityData;
}

export const AirQualityDisplay: FC<AirQualityDisplayProps> = ({ data }) => {
  const lastUpdatedTime = new Date(data.time.iso).toLocaleString();
  return (
    <Box sx={{ mb: 2 }}>
      <Typography
        variant="h2"
        aria-label={`Air Quality Index Number, ${data.aqi}`}
        tabIndex={0}
      >
        {data.aqi}
      </Typography>
      <Typography
        variant="subtitle1"
        aria-label={`Air Quality Level ${getAQILabel(data.aqi)}`}
        tabIndex={0}
      >
        {getAQILabel(data.aqi)}
      </Typography>
      <Typography variant="subtitle1" aria-label={data.city.name} tabIndex={0}>
        Location: {data.city.name}
      </Typography>
      <Typography
        variant="subtitle2"
        aria-label={`Last Updated Date Time ${lastUpdatedTime}`}
        tabIndex={0}
      >
        Updated:&nbsp;
        {lastUpdatedTime}
      </Typography>
      <Link
        href="https://aqicn.org/scale/"
        target="_blank"
        aria-label="Source Link"
      >
        <Typography variant="subtitle2">Source</Typography>
      </Link>
    </Box>
  );
};
