import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { Creators as ClientActions } from "../store/ducks/clients";
import { Container } from "../styles/layout";
import { useHistory, useParams } from "react-router-dom";

import { StyledState } from "../styles/state";
import { IClient } from "../interfaces/IClient";
import { toast } from "react-toastify";

const StyledView = styled(Container)`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StyledFieldset = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;

  background: #fff;
  width: 500px;
  height: 600px;
  border-radius: 6px;
  padding: 30px;
  box-shadow: 0 0 1em rgba(0, 0, 0, 0.2);
`;

export default function ManageClients() {
  const dispatch = useDispatch();
  const history = useHistory();
  const { id } = useParams();

  const clientsState: IClient[] = useSelector((state: any) => state.clients);

  const [client, setClient] = useState<IClient>({
    name: "",
    phone: "",
    email: "",
    cpf: ""
  });

  useEffect(() => {
    if (!id && clientsState.length === 0) return;

    const client = clientsState.filter((c: IClient) => c.id == id);
    setClient(client[0]);
  }, [clientsState, id]);

  const handleChange = (field: string, value: string) =>
    setClient({ ...client, [field]: value });

  const handleGoToHome = () => history.push("/");

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const clientFormatted = {
      ...client,
      phone: client.phone
        .replace(" ", "")
        .replace("-", "")
        .replace("_", ""),
      cpf: client.cpf
        .replace(".", "")
        .replace("-", "")
        .replace("_", "")
    };

    !id
      ? await dispatch(ClientActions.addClient(clientFormatted))
      : await dispatch(ClientActions.updateClient(clientFormatted));

    toast.info(`Cliente foi ${id ? "EDITADO" : "CRIADO"} com sucesso`);

    handleGoToHome();
  };

  return (
    <StyledView>
      <StyledFieldset>
        <StyledState.Title color="#ff7575" size="large" fontSize={32}>
          Novo Cliente
        </StyledState.Title>

        <StyledState.Form size="large" mx={50} onSubmit={handleSubmit}>
          <StyledState.InputText
            px={9}
            py={9}
            size="large"
            mx={5}
            color="#666"
            mask=""
            type="text"
            value={client?.name}
            onChange={(e: any) => handleChange("name", e.target.value)}
            placeholder="Name"
          />
          <StyledState.InputText
            px={9}
            py={9}
            size="large"
            mx={5}
            color="#666"
            mask="+5\5 99 99999-9999"
            type="text"
            value={client?.phone}
            onChange={(e: any) => handleChange("phone", e.target.value)}
            placeholder="Telefone"
          />
          <StyledState.InputText
            px={9}
            py={9}
            size="large"
            mx={5}
            color="#666"
            mask=""
            type="text"
            value={client?.email}
            onChange={(e: any) => handleChange("email", e.target.value)}
            placeholder="Email"
          />
          <StyledState.InputText
            px={9}
            py={9}
            size="large"
            mx={5}
            color="#666"
            mask="999.999.999-99"
            type="text"
            value={client?.cpf}
            onChange={(e: any) => handleChange("cpf", e.target.value)}
            placeholder="CPF"
            disabled={!!id}
          />

          <StyledState.Button
            size="large"
            color="#fff"
            background="#ff7575"
            px={10}
            mx={5}
            type="submit"
          >
            <span>Salvar</span>
          </StyledState.Button>

          <StyledState.Button
            size="large"
            color="#fff"
            background="#2cb8bf"
            px={10}
            mx={5}
            type="button"
            onClick={handleGoToHome}
          >
            <span>Voltar</span>
          </StyledState.Button>
        </StyledState.Form>
      </StyledFieldset>
    </StyledView>
  );
}
