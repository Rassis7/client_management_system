import React from 'react';
import { useHistory } from 'react-router-dom';
import { IClient } from '../../interfaces/IClient';
import { StyledState } from '../../styles/state';
import { maskCpf, maskPhone } from '../../utils/masks';

import {
  StyledItem,
  StyledInfosDiv,
  StyledButtonsLayout,
} from './styles';

interface Props {
  clickDelete:(id: number) =>void
}

type CardProps = Props & IClient

const Card: React.FC<CardProps> = ({
  cpf, email, name, phone, id, clickDelete,
}) => {
  const history = useHistory();
  const handleEditClick = (id: number) => history.push(`/edit/${id}`);

  return (
    <StyledItem>
      <StyledState.Title color="#ff7575" fontSize={25}>
        {name}
      </StyledState.Title>

      <StyledInfosDiv>
        <StyledState.Text color="#919191" mx={5} size="large">
          <strong>Email:</strong>
          {email}
        </StyledState.Text>

        <StyledState.Text color="#919191" mx={5} size="large">
          <strong>Telefone:</strong>
          {maskPhone(phone)}
        </StyledState.Text>

        <StyledState.Text color="#919191" mx={5} size="large">
          <strong>CPF:</strong>
          {maskCpf(cpf)}
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
          onClick={() => handleEditClick(Number(id))}
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
          onClick={() => clickDelete(Number(id))}
        >
          <span>Excluir</span>
        </StyledState.Button>
      </StyledButtonsLayout>
    </StyledItem>
  );
};

export default Card;
