import styled from "styled-components";

const BodyWithNavigation = styled.div`
  display: grid;
  min-width: 100%;
  min-height: 100%;
  grid-template-columns: 1fr;
  grid-template-rows: var(--navigation-height) 1fr;
`;

export { BodyWithNavigation };
