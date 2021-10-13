import styled from "styled-components";
import { FooterProps } from "./Footer";

type FooterWrapperProps = Pick<FooterProps, "shouldRenderFooter">;
const FooterWrapper = styled.div`
  ${({ shouldRenderFooter }: FooterWrapperProps) => {
    return shouldRenderFooter ? "" : "display: none;";
  }}
  height: var(--footer-height, 0px);
  background: var(--background-primary);
`;

export { FooterWrapper };
