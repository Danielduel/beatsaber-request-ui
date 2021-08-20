import React from "react";
import styled, { css } from "styled-components";

type ButtonProps = {
  active?: boolean;
};
const Button = styled.button`
  outline: none;
  box-sizing: border-box;
  height: 40px;
  padding: 10px 10px;
  border-radius: 20px;
  border: 0px solid transparent;
  cursor: pointer;

  font-weight: normal;
  font-size: 0.8rem;
  color: var(--text);
  background-color: var(--background-input);
  opacity: 0.9;

  display: inline-flex;
  justify-content: space-between;
  align-items: center;
  transition: width 0.03s linear;

  ${({ active }: ButtonProps) =>
    active
      ? css`
          background-color: var(--background-input-active);
          opacity: 1;
        `
      : null}

  & > svg {
    width: 20px;
    height: 20px;
  }

  &:hover {
    opacity: 1;
  }
`;

export type ButtonAsItemProps = {
  active?: boolean;
  onClick: (e: any) => void;
  text: string;
};
const ButtonAsItem = ({ active, onClick, text }: ButtonAsItemProps) => {
  return (
    <Button active={active} onClick={onClick}>
      {text}
    </Button>
  );
};

export { Button, ButtonAsItem };
