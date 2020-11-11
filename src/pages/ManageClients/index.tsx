import React from "react";
import { useParams } from "react-router-dom";
import { StyledState } from "../../styles/state";
import { StyledView, StyledFieldset } from "./styles";
import Form from "./components/Form";

const ManageClients = () => {
  const { id } = useParams<{ id?: string }>();

  return (
    <StyledView>
      <StyledFieldset>
        <StyledState.Title color="#ff7575" size="large" fontSize={32}>
          Novo Cliente
        </StyledState.Title>

        <Form id={id} />
      </StyledFieldset>
    </StyledView>
  );
};

export default ManageClients;
