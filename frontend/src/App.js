import { BrowserRouter } from 'react-router-dom';

import 'react-perfect-scrollbar/dist/css/styles.css'

import { ThemeProvider } from 'styled-components';

import colors from './shared/styles/themes/colors';

import { AppRoutes } from './shared/routes';

import { AppProvider } from './shared/context/';

import GlobalStyles from './shared/styles/GlobalStyles';

export const App = () => {
  return (
    <ThemeProvider theme={colors}>
      <AppProvider>
        <BrowserRouter>
          <GlobalStyles />
          <AppRoutes />
        </BrowserRouter>
      </AppProvider>
    </ThemeProvider>
  );
};
