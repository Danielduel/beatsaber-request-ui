import React from "react";
import styled from "styled-components";
import { Button } from "./Button";

const LeftButton = styled(Button)`
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
  border-right: 1px solid var(--border);
`;
const RightButton = styled(Button)`
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
`;
type DoubleButtonProps = {
  leftButtonText: string;
  leftButtonOnClick: () => void;
  rightButtonText: string;
  rightButtonOnClick: () => void;
};
const DoubleButton = ({
  leftButtonText,
  leftButtonOnClick,
  rightButtonText,
  rightButtonOnClick
}: DoubleButtonProps) => {
  return (
    <div>
      <LeftButton onClick={leftButtonOnClick}>{leftButtonText}</LeftButton>
      <RightButton onClick={rightButtonOnClick}>{rightButtonText}</RightButton>
    </div>
  );
}

export { DoubleButton };
