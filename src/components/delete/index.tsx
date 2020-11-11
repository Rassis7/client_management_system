import React from "react";
import { StyledState } from "../../styles/state";
import { useDispatch } from "react-redux";
import { Creators as ClientActions } from "../../store/ducks/clients";
import { toast } from "react-toastify";

import { StyledContainer, StyledDialog, StyledButtonContainer } from "./styles";

interface IProps {
  open: boolean;
  id?: number;
  onClose(): void;
}

const Delete: React.FC<IProps> = ({ open, id, onClose }) => {
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
};

export default Delete;
