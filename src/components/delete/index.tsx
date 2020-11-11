import React, { useContext } from "react";
import { StyledState } from "../../styles/state";
import { toast } from "react-toastify";

import { StyledContainer, StyledDialog, StyledButtonContainer } from "./styles";
import { AppContext } from "../../context/AppContext";
import { Types } from "../../context/reducers/AppReducer";

interface IProps {
  open: boolean;
  id?: number;
  onClose(): void;
}

const Delete: React.FC<IProps> = ({ open, id, onClose }) => {
  const { dispatch } = useContext(AppContext);

  const handleCancel = () => onClose();

  const handleDelete = () => {
    if (!id) return;
    dispatch({ type: Types.REMOVE_CLIENT, payload: { id } });

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
