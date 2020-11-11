import React, { useState, useEffect, useContext } from "react";
import { useHistory, useParams } from "react-router-dom";

import { StyledState } from "../../styles/state";
import { IClient } from "../../interfaces/IClient";
import { toast } from "react-toastify";

import { StyledView, StyledFieldset } from "./styles";
import { AppContext } from "../../context/AppContext";
import { Types } from "../../context/reducers/AppReducer";

export default function ManageClients() {
  const { state, dispatch } = useContext(AppContext);
  const history = useHistory();
  const { id } = useParams<{ id?: string }>();

  const [client, setClient] = useState<IClient>({} as IClient);

  useEffect(() => {
    if (!id && state.length === 0) return;

    const client = state.find((c: IClient) => c.id === id);
    client && setClient(client);
  }, [state, id]);

  const handleChange = (field: string, value: string) =>
    setClient({ ...client, [field]: value });

  const handleGoToHome = () => history.push("/");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const phone = client.phone.replace(/([^\d])+/gim, "");
    const cpf = client.cpf.replace(/([^\d])+/gim, "");

    dispatch({
      type: !id ? Types.ADD_CLIENT : Types.UPDATE_CLIENT,
      payload: {
        ...client,
        phone,
        cpf,
      },
    });

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
