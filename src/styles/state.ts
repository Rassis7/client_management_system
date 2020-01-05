import styled from "styled-components";
import { darken } from "polished";
import InputMask from "react-input-mask";

type IProps = {
  size: string;
  color: string;
  // mt: string;
  // mb: string;
  // ml: string;
  // mr: string;
};

interface ILiteralProps {
  [key: string]: string;
}

export const StyledButton = styled.button`
  background: ${(props: IProps) => props.color};
  color: #fff;
  border: 0;
  border-radius: 4px;

  display: flex;
  align-items: center;
  transition: background 0.2s;
  padding: 15px;
  width: ${(props: IProps) => {
    const size: ILiteralProps = {
      large: "100%",
      medium: "50%",
      small: "20%"
    };
    return size[props.size] || size.medium;
  }}}  

  &:hover {
    background: ${(props: IProps) => darken(0.03, `${props.color}`)};
  }

  span {
    flex: 1;
    text-align: center;
    font-weight: bold;
  }
`;

export const StyledInputText = styled(InputMask)`
  border: 1px solid #ddd;
  border-radius: 4px;
  color: #666;
  padding: 9px;
  width: 100%;
  margin-bottom: 15px;
`;
