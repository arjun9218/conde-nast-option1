import React, { useContext, useEffect } from 'react';
import './App.css';
import CssBaseline from '@material-ui/core/CssBaseline';
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import Layout from './containers/Layout';
import { NewsContext } from './store/NewsStore';
import { getConfigData, getApiToken } from './store/actions';

export default function App() {
  const { newsState, newsDispatch } = useContext(NewsContext);

  // Use effect hook for setting the configuration data like countries list
  useEffect(() => {
    if (!newsState.configData || !(newsState.configData.countries && newsState.configData.countries.length)) {
      getConfigData(newsDispatch);
    }
  }, [newsState && newsState.configData && newsState.configData.countries]);

  // Checking for API token
  useEffect(() => {
    if (!newsState.apiToken) {
      getApiToken(newsDispatch);
    }
  }, [newsState && newsState.apiToken]);

  // Custom theme colors
  const theme = createMuiTheme({
    palette: {
      primary: {
        main: newsState.darkMode ? "#ffffff" : "#171717",
        lighter: newsState.darkMode ? "#ffffff" : "#6e6e6e",
        lighterRgba: newsState.darkMode ? "rgba(255, 255, 255, 1)" : "rgba(110, 110, 110, 1)",
        textColorLight: "#e8e8e8",
        textColorDark: "#505050",
        textColor: newsState.darkMode ? "#e8e8e8" : "#505050"
      },
      secondary: {
        main: newsState.darkMode ? "#171717" : "#ffffff",
        lighter: newsState.darkMode ? "#6e6e6e" : "#ffffff",
        lighterRgba: newsState.darkMode ? "rgba(110, 110, 110, 1)" : "rgba(255, 255, 255, 1)",
        textColorLight: "#505050",
        textColorDark: "#e8e8e8",
        textColor: newsState.darkMode ? "#505050" : "#e8e8e8"
      },
      type: newsState.darkMode ? 'dark' : 'light'
    }
  });

  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      <Layout />
    </MuiThemeProvider>
  );
}
