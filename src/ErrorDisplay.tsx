import { FC, useCallback } from "react";
import { Box, IconButton, Tooltip, Typography } from "@mui/material";
import RefreshIcon from "@mui/icons-material/Refresh";

interface ErrorDisplayProps {
  error: Error;
  onRefresh: () => void;
}

export const ErrorDisplay: FC<ErrorDisplayProps> = ({ error, onRefresh }) => {
  const handleRefresh = useCallback(() => onRefresh(), [onRefresh]);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Typography variant="h5" aria-label="Error Message">
        {error.message ?? "A problem has arisen, please try again"}
      </Typography>
      <Tooltip title="Refresh" placement="right" aria-label="Refresh Data">
        <IconButton onClick={handleRefresh}>
          <RefreshIcon />
        </IconButton>
      </Tooltip>
    </Box>
  );
};
