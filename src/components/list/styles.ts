import styled from "styled-components";

export const StyledList = styled.ul`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 20px;
  list-style: none;
`;

export const StyledItem = styled.span`
  background: #fff;
  padding: 32px;
  box-shadow: 0 0 1em rgba(0, 0, 0, 0.2);
`;

export const StyledInfosDiv = styled.div`
  display: flex;
  flex-direction: column;
`;

export const StyledButtonsLayout = styled.div`
  display: flex;
  justify-content: space-around;
  flex: 1;
`;
