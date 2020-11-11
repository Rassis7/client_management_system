import React from "react";
import styled from "styled-components";
import { darken } from "polished";
import InputMask from "react-input-mask";

interface ILiteralProps {
  [key: string]: string;
}

interface IProps {
  size?: string;
  color?: string;
  background?: string;
  hover?: boolean;
  py?: number;
  px?: number;
  mx?: number;
  my?: number;
  fontSize?: number;
}

const propsDefault = (props: IProps) => {
  const sizeLiteral: ILiteralProps = {
    large: "100",
    medium: "50",
    small: "20",
  };
  const percent = sizeLiteral[`${props.size}`] || sizeLiteral.small;

  let response: string = `width: ${percent}%;`;

  if (props.color) response = response + `color: ${props.color};`;

  if (props.background) {
    response = response + `background: ${props.background};`;
    if (props.hover)
      response =
        response +
        `
        &:hover {
          background: ${darken(0.1, `${props.background}`)};
        }
      `;
  }

  if (props.px || props.py)
    response =
      response +
      `padding: ${props.px || 0}px ${props.py || 0}px ${props.px ||
        0}px ${props.py || 0}px;`;

  if (props.my || props.mx)
    response =
      response +
      `margin: ${props.mx || 0}px ${props.my || 0}px ${props.mx ||
        0}px ${props.my || 0}px;`;

  if (props.fontSize) response = response + `font-size: ${props.fontSize}px;`;

  return response;
};

const Button = styled.button`
  ${(props: IProps) => propsDefault(props)}
  display: flex;
  align-items: center;

  border: 0;
  border-radius: 4px;
  transition: background 0.2s;

  span {
    flex: 1;
    text-align: center;
    font-weight: bold;
  }
`;

const InputText = styled(({ ...props }) =>
  React.createElement(InputMask, { ...props }, props.children)
)`
  border: 1px solid #ddd;
  border-radius: 4px;
  ${(props: IProps) => propsDefault(props)}
`;

const Title = styled.span`
  ${(props: IProps) => propsDefault(props)}
  text-align: center;
  font-weight: 800;
`;

const Text = styled.span`
  ${(props: IProps) => propsDefault(props)}
`;

const Form = styled.form`
  ${(props: IProps) => propsDefault(props)}
  display: flex;
  align-items: center;
  flex-direction: column;
`;

export const StyledState = {
  InputText,
  Button,
  Title,
  Form,
  Text,
};
