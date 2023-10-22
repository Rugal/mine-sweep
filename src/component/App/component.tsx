import React from "react";
import { RouterProvider, } from "react-router-dom";
import { createTheme, ThemeProvider, useTheme } from '@mui/material/styles';
import * as locales from '@mui/material/locale';
import { router } from "./route";
import { store } from "@store";
import { useSnapshot } from "valtio";

const App: React.FC = () => {
  const snap = useSnapshot(store);

  const theme = useTheme();

  const themeWithLocale = React.useMemo(
    () => createTheme(theme, locales[snap.locale]),
    [snap.locale, theme],
  );

  return <React.StrictMode>
    <ThemeProvider theme={themeWithLocale}>
      <RouterProvider router={router} />
    </ThemeProvider>
  </React.StrictMode>;
};

export default App;
