import '../styles/globals.css';
import type { AppProps } from "next/app";
import { Provider } from 'react-redux';
import { ThemeProvider, createTheme, CssBaseline } from '@mui/material';
import { store } from '../store';

const beijeTheme = createTheme({
  palette: {
    primary: {
      main: '#262626',
    },
    background: {
      default: '#f9f8f6', 
      paper: '#ffffff',
    },
    text: {
      primary: '#262626',
    },
  },
  typography: {
    fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif',
    h5: {
      fontWeight: 500,
    },
    button: {
      textTransform: 'none',
      fontWeight: 600,
    },
  },
  shape: {
    borderRadius: 12, 
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          boxShadow: 'none',
          '&:hover': {
            boxShadow: 'none',
          },
        },
        contained: {
          borderRadius: 30, 
          padding: '12px 24px',
        },
      },
    },
    MuiAccordion: {
      styleOverrides: {
        root: {
          boxShadow: 'none',
          backgroundColor: 'transparent',
          '&:before': {
            display: 'none', 
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        elevation2: {
          boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.03)',
        },
      },
    },
    MuiTab: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontWeight: 600,
          fontSize: '1rem',
          minHeight: 48,
          '&.Mui-selected': {
            color: '#262626',
          },
        },
      },
    },
    MuiTabs: {
      styleOverrides: {
        indicator: {
          backgroundColor: '#262626',
          height: 3,
          borderTopLeftRadius: 3,
          borderTopRightRadius: 3,
        },
      },
    },
    MuiAccordionSummary: {
      styleOverrides: {
        root: {
          padding: '0 8px',
          '& .MuiTypography-root': {
            fontSize: '1.1rem',
            fontWeight: 500,
          },
        },
      },
    },
    MuiAccordionDetails: {
      styleOverrides: {
        root: {
          padding: '16px 8px 24px',
        },
      },
    },
  },
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <ThemeProvider theme={beijeTheme}>
        <CssBaseline />
        <Component {...pageProps} />
      </ThemeProvider>
    </Provider>
  );
}
