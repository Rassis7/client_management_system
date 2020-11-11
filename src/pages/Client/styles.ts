import styled from "styled-components";

export const StyledView = styled.aside`
  display: flex;
  flex-direction: column;

  button {
    align-self: flex-end;
    margin-bottom: 20px;
  }
`;

export const StyledLoading = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1;
  padding: 32px;
  height: 500px;

  & > span {
    font-size: 32px;
    color: #999;
    font-weight: 800;
  }
`;
