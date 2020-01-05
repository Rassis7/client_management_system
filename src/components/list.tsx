import React, { useState, useMemo } from "react";
import styled from "styled-components";
import { IClient } from "../interfaces/IClient";
import { StyledButton } from "../styles/state";
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

const StyledTitle = styled.span`
  font-size: 20px;
  color: #ff7575;
  font-weight: 800;
`;

const StyledInfosDiv = styled.div`
  display: flex;
  flex-direction: column;
`;

const StyledInfosText = styled.div`
  color: #919191;
  margin-top: 5px;
`;

const StyledButtonsLayout = styled.div`
  display: flex;
  justify-content: space-around;
  flex: 1;
`;

const StyledButtonReEdit = styled(StyledButton)`
  padding: 8px !important;
`;

type ListProps = {
  clients: IClient[];
};

export default function List({ clients }: ListProps) {
  const clientsMemo = useMemo(
    () =>
      clients.map((c: IClient) => {
        return {
          ...c,
          cpf: maskCpf(c.cpf),
          phone: maskPhone(c.phone)
        };
      }),
    [clients]
  );

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
        {clientsMemo.map(c => (
          <StyledItem key={c.cpf}>
            <StyledTitle>{c.name}</StyledTitle>

            <StyledInfosDiv>
              <StyledInfosText>
                <strong>Email:</strong> {c.email}
              </StyledInfosText>
              <StyledInfosText>
                <strong>Telefone:</strong> {c.phone}
              </StyledInfosText>
              <StyledInfosText>
                <strong>CPF:</strong> {c.cpf}
              </StyledInfosText>
            </StyledInfosDiv>

            <StyledButtonsLayout>
              <StyledButtonReEdit
                size="small"
                color="#f97a20"
                type="submit"
                onClick={() => handleEditClick(Number(c.id))}
              >
                <span>Editar</span>
              </StyledButtonReEdit>

              <StyledButtonReEdit
                size="small"
                color="#f92020"
                type="submit"
                onClick={() => handleDeleteClick(Number(c.id))}
              >
                <span>Excluir</span>
              </StyledButtonReEdit>
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
