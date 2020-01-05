import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import { IClient } from "../interfaces/IClient";
import api from "../service/api";
import { Creators as ClientActions } from "../store/ducks/clients";
import List from "../components/list";

import New from "../components/new";

import { Container } from "../styles/layout";

const StyledView = styled.aside`
  display: flex;
  flex-direction: column;

  button {
    align-self: flex-end;
    margin-bottom: 20px;
  }
`;

const StyledLoading = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1;
  padding: 32px;
  height: 500px;

  & > span {
    font-size: 32px;
    color: #999;
    font-weight: 800;
  }
`;

export default function Client() {
  const dispatch = useDispatch();
  const clients = useSelector((state: any) => state.clients);

  const handleLoadClient = (clients: IClient[]) =>
    dispatch(ClientActions.loadClient(clients));

  useEffect(() => {
    if (!!clients.length) return;

    const getClients = async (): Promise<void> => {
      const response = await api.get("/clients");
      handleLoadClient(response.data);
    };

    getClients();
  }, []);

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
