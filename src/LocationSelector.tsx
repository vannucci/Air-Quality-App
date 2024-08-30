import { FC, MouseEvent } from "react";
import { Box, Button, IconButton, Tooltip } from "@mui/material";
import RefreshIcon from "@mui/icons-material/Refresh";

interface LocationSelectorProps {
  locations: string[];
  selectedLocation: string;
  onLocationChange: (location: string) => void;
  onRefresh: () => void;
}

export const LocationSelector: FC<LocationSelectorProps> = ({
  locations,
  selectedLocation,
  onLocationChange,
  onRefresh,
}) => {
  const handleLocationClick = (event: MouseEvent<HTMLButtonElement>) => {
    const newLocation = event.currentTarget.value;
    onLocationChange(newLocation);
  };

  return (
    <Box sx={{ display: "flex", gap: 2 }}>
      {locations.map((location) => (
        <Button
          key={location}
          value={location}
          aria-label={location === "here" ? "My location" : location}
          variant={selectedLocation === location ? "contained" : "outlined"}
          onClick={handleLocationClick}
          disabled={selectedLocation === location}
        >
          {location === "here" ? "My location" : location}
        </Button>
      ))}
      <Tooltip title="Refresh" placement="right" aria-label="Refresh Data">
        <IconButton onClick={onRefresh}>
          <RefreshIcon />
        </IconButton>
      </Tooltip>
    </Box>
  );
};
