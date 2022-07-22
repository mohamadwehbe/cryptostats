import React from 'react';
import './index.css';
import { createTheme, ThemeProvider } from '@mui/material';
import { Routes } from './routes/routes';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

function App() {
  return (
    <div className="dark:bg-gray-800 dark:text-gray-200">
    <ThemeProvider theme={darkTheme}>
      <Routes/>
    </ThemeProvider>
    </div>
  );
}

export default App;
