import React from "react";
import styled, { css } from "styled-components";

type ButtonProps = {
  active?: boolean;
};
const styles = css`
  outline: none;
  box-sizing: border-box;
  height: 40px;
  padding: 10px 10px;
  border-radius: 20px;
  border: 0px solid transparent;
  cursor: pointer;
  text-decoration: none;
  line-height: 0;

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

const Button = styled.button`
  ${styles}
`;
const ButtonLink = styled.a`
  ${styles}
`;

export type ButtonAsItemPropsLink = {
  kind: "link";
  active?: boolean;
  text: string;
  href: string;
};
export type ButtonAsItemPropsButton = {
  kind: "button";
  active?: boolean;
  text: string;
  onClick: (e: React.FormEvent | React.MouseEvent) => void;
};

export type ButtonAsItemProps = ButtonAsItemPropsLink | ButtonAsItemPropsButton;

const ButtonAsItem = (buttonAsItemProps: ButtonAsItemProps): JSX.Element => {
  const { active, text } = buttonAsItemProps;
  switch (buttonAsItemProps.kind) {
    case "button":
      const { onClick } = buttonAsItemProps;
      return (
        <Button active={active} onClick={onClick}>
          {text}
        </Button>
      );
    case "link":
      const { href } = buttonAsItemProps;
      return (
        <ButtonLink active={active} href={href} target="_blank">
          {text}
        </ButtonLink>
      );
    default:
      return <></>;
  }
};

export { Button, ButtonLink, ButtonAsItem };
