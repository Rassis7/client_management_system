import styled from "styled-components";

export const StyledContainer = styled.div`
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 50%;
  z-index: 999;
`;

export const StyledDialog = styled.dialog`
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

export const StyledButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
`;
