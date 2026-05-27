'use client';

import { AppRouterCacheProvider } from '@mui/material-nextjs/v16-appRouter';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { ruRU } from '@mui/x-date-pickers/locales';
import type { ReactNode } from 'react';
import 'dayjs/locale/ru';
import { QueryProvider } from './query-provider';
import { appTheme } from '../styles/theme';

export function AppProvider({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <AppRouterCacheProvider>
      <ThemeProvider theme={appTheme}>
        <CssBaseline />
        <LocalizationProvider
          adapterLocale="ru"
          dateAdapter={AdapterDayjs}
          localeText={ruRU.components.MuiLocalizationProvider.defaultProps.localeText}
        >
          <QueryProvider>{children}</QueryProvider>
        </LocalizationProvider>
      </ThemeProvider>
    </AppRouterCacheProvider>
  );
}
