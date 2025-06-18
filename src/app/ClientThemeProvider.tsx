'use client';

import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import React, { ReactNode } from 'react';

const theme = createTheme();

export default function ClientThemeProvider({ children }: { children: ReactNode }) {
    const [mounted, setMounted] = React.useState(false);

//   React.useEffect(() => {
//     // Wait for client-side rendering to complete
//     setMounted(true);
//   }, []);
//    if (!mounted) return null;
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
}
