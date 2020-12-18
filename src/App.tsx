import React from 'react';
import { ToastContainer } from 'react-toastify';

import { BrowserRouter } from 'react-router-dom';
import GlobalStyles from './styles/global';
import Routes from './routes';

import AppProvider from './context/AppContext';

const App: React.FC = () => (
  <AppProvider>
    <BrowserRouter>
      <Routes />
    </BrowserRouter>

    <GlobalStyles />
    <ToastContainer autoClose={3000} />
  </AppProvider>
);

export default App;
