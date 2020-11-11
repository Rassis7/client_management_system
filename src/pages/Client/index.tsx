import React, { useCallback, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { IClient } from "../../interfaces/IClient";
import api from "../../service/api";
import { Creators as ClientActions } from "../../store/ducks/clients";
import List from "../../components/list";

import New from "../../components/new";

import { Container } from "../../styles/layout";
import { StyledView, StyledLoading } from "./styles";

export default function Client() {
  const dispatch = useDispatch();
  const clients = useSelector((state: any) => state.clients);

  const handleLoadClient = useCallback(
    (clients: IClient[]) => dispatch(ClientActions.loadClient(clients)),
    [dispatch]
  );

  useEffect(() => {
    if (!!clients.length) return;

    const getClients = async (): Promise<void> => {
      const response = await api.get("/clients");
      handleLoadClient(response.data);
    };

    getClients();
  }, [clients, handleLoadClient]);

  return (
    <Container>
      {!!clients.length ? (
        <StyledView>
          <New />
          <List clients={clients} />
        </StyledView>
      ) : (
        <StyledLoading>
          <span>{"Carregando..."}</span>
        </StyledLoading>
      )}
    </Container>
  );
}
