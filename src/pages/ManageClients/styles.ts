import React from 'react';
import styled from 'styled-components';

import { Container } from '../../styles/layout';

export const StyledView = styled(({ ...props }) => React.createElement(Container, { ...props }, props.children))`
  justify-content: center;
  align-items: center;

`;

export const StyledFieldset = styled.div`
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
