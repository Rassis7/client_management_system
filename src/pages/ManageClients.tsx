import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { Creators as ClientActions } from "../store/ducks/clients";
import { Container } from "../styles/layout";
import { useHistory, useParams } from "react-router-dom";

import { StyledButton, StyledInputText } from "../styles/state";
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

const StyledTitle = styled.span`
  color: #999;
  text-align: center;
  font-size: 32px;
  font-weight: 800;
  color: #ff7575;
`;

const StyledForm = styled.form`
  display: flex;
  align-items: center;
  flex-direction: column;
  width: 450px;
  margin-top: 50px;
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
        <StyledTitle>Novo Cliente</StyledTitle>

        <StyledForm onSubmit={handleSubmit}>
          <StyledInputText
            mask=""
            type="text"
            value={client?.name}
            onChange={e => handleChange("name", e.target.value)}
            placeholder="Name"
          />
          <StyledInputText
            mask="+5\5 99 99999-9999"
            type="text"
            value={client?.phone}
            onChange={e => handleChange("phone", e.target.value)}
            placeholder="Telefone"
          />
          <StyledInputText
            mask=""
            type="text"
            value={client?.email}
            onChange={e => handleChange("email", e.target.value)}
            placeholder="Email"
          />
          <StyledInputText
            mask="999.999.999-99"
            type="text"
            value={client?.cpf}
            onChange={e => handleChange("cpf", e.target.value)}
            placeholder="CPF"
            disabled={!!id}
          />

          <StyledButton size="large" color="#ff7575" type="submit">
            <span>Salvar</span>
          </StyledButton>

          <StyledButton
            size="large"
            color="#2cb8bf"
            type="button"
            onClick={handleGoToHome}
          >
            <span>Voltar</span>
          </StyledButton>
        </StyledForm>
      </StyledFieldset>
    </StyledView>
  );
}
