import React from 'react';
import { useHistory } from 'react-router-dom';

import { StyledState } from '../../styles/state';

const New: React.FC = () => {
  const history = useHistory();

  const handleClick = () => history.push('/new');

  return (
    <StyledState.Button
      background="#19ad25"
      color="#fff"
      hover
      px={20}
      onClick={handleClick}
    >
      <span>Novo cliente</span>
    </StyledState.Button>
  );
};

export default New;
