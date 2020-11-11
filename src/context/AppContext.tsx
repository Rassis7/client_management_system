import React, { createContext, useReducer, Dispatch } from "react";
import { IClient } from "../interfaces/IClient";
import { reducer, Actions } from "./reducers/AppReducer";

interface IContext {
  state: IClient[];
  dispatch: Dispatch<Actions>;
}

export const AppContext = createContext({} as IContext);

const AppProvider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, []);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};

export default AppProvider;
