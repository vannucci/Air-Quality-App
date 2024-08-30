import { FC, useMemo, useState } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import { getAQIColor, getContrastColor } from "./utility/aqiIndexScaler";

interface ThemeProps {
  aqi: number;
}

const ThemeWrapper: FC<ThemeProps> = ({ aqi }) => {
  const [globalAQI, setGlobalAQI] = useState<number>(0);
  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          primary: {
            main: `${getContrastColor(aqi)}`,
          },
        },
        components: {
          MuiCssBaseline: {
            styleOverrides: {
              body: {
                background: `linear-gradient(to bottom, ${getAQIColor(
                  globalAQI
                )}, #7a837e)`,
                minHeight: "100vh",
              },
            },
          },
        },
      }),
    [globalAQI]
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <App setGlobalAQI={setGlobalAQI} />
    </ThemeProvider>
  );
};

const theme = createTheme();

createRoot(document.getElementById("root")!).render(<ThemeWrapper aqi={0} />);
