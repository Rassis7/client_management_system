import React, { useState, useMemo } from "react";
import styled from "styled-components";
import { IClient } from "../interfaces/IClient";
import { StyledState } from "../styles/state";
import { useHistory } from "react-router-dom";
import Delete from "./delete";
import { maskCpf, maskPhone } from "../utils/masks";

const StyledList = styled.ul`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 20px;
  list-style: none;
`;

const StyledItem = styled.span`
  background: #fff;
  padding: 32px;
  box-shadow: 0 0 1em rgba(0, 0, 0, 0.2);
`;

const StyledInfosDiv = styled.div`
  display: flex;
  flex-direction: column;
`;

const StyledButtonsLayout = styled.div`
  display: flex;
  justify-content: space-around;
  flex: 1;
`;

type ListProps = {
  clients: IClient[];
};

export default function List({ clients }: ListProps) {
  const [openModalDelete, setOpenModalDelete] = useState(false);
  const [idModalDelete, setIdModalDelete] = useState(0);

  const history = useHistory();

  const handleEditClick = (id: number) => history.push(`/edit/${id}`);

  const handleCloseModalDelete = () => setOpenModalDelete(false);

  const handleDeleteClick = (id: number) => {
    setIdModalDelete(id);
    setOpenModalDelete(true);
  };

  return (
    <>
      <StyledList>
        {clients.map(c => (
          <StyledItem key={c.cpf}>
            <StyledState.Title color="#ff7575" fontSize={25}>
              {c.name}
            </StyledState.Title>

            <StyledInfosDiv>
              <StyledState.Text color="#919191" mx={5} size="large">
                <strong>Email:</strong> {c.email}
              </StyledState.Text>
              <StyledState.Text color="#919191" mx={5} size="large">
                <strong>Telefone:</strong> {maskPhone(c.phone)}
              </StyledState.Text>
              <StyledState.Text color="#919191" mx={5} size="large">
                <strong>CPF:</strong> {maskCpf(c.cpf)}
              </StyledState.Text>
            </StyledInfosDiv>

            <StyledButtonsLayout>
              <StyledState.Button
                px={8}
                mx={15}
                background="#f97a20"
                color="#fff"
                hover
                type="submit"
                onClick={() => handleEditClick(Number(c.id))}
              >
                <span>Editar</span>
              </StyledState.Button>

              <StyledState.Button
                px={8}
                mx={15}
                background="#f92020"
                color="#fff"
                hover
                type="submit"
                onClick={() => handleDeleteClick(Number(c.id))}
              >
                <span>Excluir</span>
              </StyledState.Button>
            </StyledButtonsLayout>
          </StyledItem>
        ))}

        {openModalDelete && (
          <Delete
            open={openModalDelete}
            id={idModalDelete}
            onClose={handleCloseModalDelete}
          />
        )}
      </StyledList>
    </>
  );
}
