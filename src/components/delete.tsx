import React from "react";
import styled from "styled-components";
import { StyledState } from "../styles/state";
import { useDispatch } from "react-redux";
import { Creators as ClientActions } from "../store/ducks/clients";
import { toast } from "react-toastify";

const StyledContainer = styled.div`
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 50%;
  z-index: 999;
`;

const StyledDialog = styled.dialog`
  position: relative;
  width: 500px;
  height: 150px;
  border-radius: 4px;
  border: 1px solid #666;
  padding: 32px;

  p {
    align-self: center;
    font-size: 20px;
  }
`;

type DeleteProps = {
  open: boolean;
  id?: number;
  onClose(): void;
};

const StyledButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
`;

export default function Delete({ open, id, onClose }: DeleteProps) {
  const dispatch = useDispatch();

  const handleCancel = () => onClose();

  const handleDelete = async () => {
    await dispatch(ClientActions.removeClient(id));

    toast.info(`Cliente foi excluído com sucesso`);
    handleCancel();
  };

  return (
    <StyledContainer>
      <StyledDialog open={open}>
        <p>Deseja realmente excluir esse Cliente??</p>

        <StyledButtonContainer>
          <StyledState.Button
            background="#f92020"
            color="#fff"
            hover
            px={9}
            mx={10}
            my={10}
            onClick={handleDelete}
          >
            <span>Excluir</span>
          </StyledState.Button>
          <StyledState.Button
            background="#ccc"
            color="#fff"
            hover
            px={9}
            mx={10}
            my={10}
            onClick={handleCancel}
          >
            <span>Cancelar</span>
          </StyledState.Button>
        </StyledButtonContainer>
      </StyledDialog>
    </StyledContainer>
  );
}
