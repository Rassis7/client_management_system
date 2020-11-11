import React, { useContext, useEffect } from "react";
import api from "../../service/api";
import List from "../../components/list";

import New from "../../components/new";

import { Container } from "../../styles/layout";
import { StyledView, StyledLoading } from "./styles";
import { AppContext } from "../../context/AppContext";
import { Types } from "../../context/reducers/AppReducer";

const Client: React.FC = () => {
  const { state, dispatch } = useContext(AppContext);

  useEffect(() => {
    if (!!state.length) return;

    const getClients = async (): Promise<void> => {
      const response = await api.get("/clients?_sort=id&_order=desc");
      dispatch({ type: Types.LOAD_CLIENT, payload: response.data });
    };

    getClients();
  }, [state, dispatch]);

  return (
    <Container>
      {!!state.length ? (
        <StyledView>
          <New />
          <List clients={state} />
        </StyledView>
      ) : (
        <StyledLoading>
          <span>{"Carregando..."}</span>
        </StyledLoading>
      )}
    </Container>
  );
};

export default Client;
