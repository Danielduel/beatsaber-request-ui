import styled from "styled-components";

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

  & > svg {
    width: 20px;
    height: 20px;
  }

  &:hover {
    opacity: 1;
  }
`;

export { Button };
