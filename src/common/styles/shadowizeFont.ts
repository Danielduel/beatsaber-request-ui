import styled, { css } from "styled-components";

const shadowizeFont = css`
  color: transparent;
  text-shadow: 0 0 0 #935ba5;
`;

const ShadowizeFont = styled.span`
  ${shadowizeFont}
`;

export { shadowizeFont, ShadowizeFont };
