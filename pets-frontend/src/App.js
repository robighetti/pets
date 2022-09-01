import { BrowserRouter } from 'react-router-dom';

import { AppRoutes } from './shared/routes';

import GlobalStyles from './shared/styles/GlobalStyles';

export const App = () => {
  return (
    <BrowserRouter>
      <GlobalStyles />
      <AppRoutes />
    </BrowserRouter>
  );
};
