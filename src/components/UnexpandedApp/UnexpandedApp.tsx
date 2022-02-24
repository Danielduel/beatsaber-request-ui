import React from "react";
import { Translation } from "react-i18next";
import styled from "styled-components";
import AppEnvContext from "../../AppEnvContext";

function conditionalCssDependingOnPosition(
  x: number,
  y: number,
  top: string,
  bottom: string,
  left: string,
  right: string,
  merge: (horizontal: string, vertical: string) => string
) {
  const _horizontal = x > 50 ? right : left;
  const _vertical = y > 50 ? bottom : top;
  return merge(_horizontal, _vertical);
}

const AppUnexpandedWrapperWrapper = styled.div`
  position: fixed;
  padding: 15px;
  width: 100vw;
  height: 100vh;
  box-sizing: border-box;
`;

const AppUnexpandedWrapper = styled.div`
  background: #5f2c82;

  animation-name: initialBubbleAnimation;
  animation-duration: 10s;

  position: relative;
  width: 30px;
  height: 30px;

  transform: translate(-50%, -50%);
  border-radius: 50%;
  border: 4px solid #210633;

  // Those isNaNs are defensive code placed here
  // in order to be 300% sure that it can't be exploited
  ${({ x, y }: { x: number; y: number }) => `
  left: ${!isNaN(x) ? x : "0"}%;
  top: ${!isNaN(y) ? y : "0"}%;
`}

  opacity: 0;
  transition: all 0.3s ease-in-out;

  &:hover {
    height: 70px;
    width: 70px;
    opacity: 1;
    animation: none;
  }

  &:hover > div {
    visibility: visible;
    opacity: 1;
  }
`;

const AppUnexpandedTooltip = styled.div`
  width: 200px;
  position: relative;
  top: 50%;
  left: 50%;
  opacity: 0;
  transition: opacity 0.3s ease-in-out;
  background: rgba(255, 255, 255, 0.5);
  padding: 15px 20px;
  animation-name: initialBubbleTooltipAnimation;
  animation-duration: 4s;

  ${({ x, y }: { x: number; y: number }) => {
    return conditionalCssDependingOnPosition(
      x,
      y,
      "0",
      "-100%",
      "0",
      "-240px",
      (h, v) => `
    transform: translate(${h}, ${v});
  `
    );
  }}

  &:before {
    height: 30px;
    width: 5px;
    background: black;
    position: absolute;
    content: " ";
    ${({ x, y }: { x: number; y: number }) => {
      return conditionalCssDependingOnPosition(
        x,
        y,
        "top: 0;",
        "bottom: 0;",
        "left: 0;",
        "right: 0;",
        (h, v) => `
      ${h} ${v}
    `
      );
    }}
  }
  &:after {
    height: 5px;
    width: 30px;
    background: black;
    position: absolute;
    content: " ";
    ${({ x, y }: { x: number; y: number }) => {
      return conditionalCssDependingOnPosition(
        x,
        y,
        "top: 0;",
        "bottom: 0;",
        "left: 0;",
        "right: 0;",
        (h, v) => `
      ${h} ${v}
    `
      );
    }}
  }
`;

type UnexpandedAppProps = {
  togglePanel: (state: boolean) => void;
};

const UnexpandedApp = ({ togglePanel }: UnexpandedAppProps): JSX.Element | null => {
  const { configuration } = React.useContext(AppEnvContext);

  if (!configuration) {
    return null;
  }

  const panelPosition = configuration.broadcaster.panelPosition;

  return (
    <AppUnexpandedWrapperWrapper>
      <AppUnexpandedWrapper x={panelPosition.positionX} y={panelPosition.positionY} onClick={() => togglePanel(true)}>
        <AppUnexpandedTooltip x={panelPosition.positionX} y={panelPosition.positionY}>
          <Translation>{(t) => t("Click to open an extension")}</Translation>
          <br />
          <Translation>{(t) => t("this should make it easier to make requests")}</Translation>
        </AppUnexpandedTooltip>
      </AppUnexpandedWrapper>
    </AppUnexpandedWrapperWrapper>
  );
};

export { UnexpandedApp };
