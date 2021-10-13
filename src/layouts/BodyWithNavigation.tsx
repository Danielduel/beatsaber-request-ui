import styled from "styled-components";
import { hideScrollbars } from "../common/styles/hideScrollbars";

type BodyWithNavigationProps = {
  shouldRenderFooter: boolean;
};
const BodyWithNavigation = styled.div`
  display: grid;
  min-width: 100%;
  min-height: 100vh;
  max-height: 100vh;
  grid-template-columns: 1fr;
  ${({ shouldRenderFooter }: BodyWithNavigationProps) => {
    return shouldRenderFooter
      ? "grid-template-rows: var(--navigation-height) 1fr var(--footer-height, 0px);"
      : "grid-template-rows: var(--navigation-height) 1fr";
  }}

  background-color: var(--background);
`;

const BodyWithNavigationBody = styled.div`
  overflow-y: auto;
  overflow-x: hidden;

  ${hideScrollbars}
`;

export { BodyWithNavigation, BodyWithNavigationBody };
