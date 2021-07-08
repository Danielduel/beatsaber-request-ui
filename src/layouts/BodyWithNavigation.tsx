import styled from "styled-components";
import { hideScrollbars } from "../common/styles/hideScrollbars";

const BodyWithNavigation = styled.div`
  display: grid;
  min-width: 100%;
  min-height: 100%;
  grid-template-columns: 1fr;
  grid-template-rows: var(--navigation-height) var(--body-height);
  background-color: var(--background);
`;

const BodyWithNavigationBody = styled.div`
  height: var(--body-height);
  overflow-y: auto;
  overflow-x: hidden;

  ${hideScrollbars}
`;

export { BodyWithNavigation, BodyWithNavigationBody };
