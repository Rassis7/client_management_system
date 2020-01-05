import React from "react";
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";

import { BrowserRouter } from "react-router-dom";
import GlobalStyles from "./styles/global";
import Routes from "./routes";

import store from "./store";

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes />
      </BrowserRouter>
      <GlobalStyles />
      <ToastContainer autoClose={3000} />
    </Provider>
  );
};

export default App;
