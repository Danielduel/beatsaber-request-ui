import styled from "styled-components";

const LayoutRowBase = styled.div`
  width: min(100vw, 500px);
  height: 52px;
  background-color: var(--background);
  box-sizing: border-box;
  position: relative;
`;

const LayoutRowTall = styled.div`
  width: min(100vw, 500px);
  min-height: 95px;
  padding: 3px 0;
  background-color: var(--background);
  box-sizing: border-box;
  position: relative;
  overflow: hidden;
`;

const LayoutRowPrimary = styled(LayoutRowBase)`
  background-color: var(--background-primary);
`;

const LayoutRowPlaceholder = styled(LayoutRowBase)`
  font-size: 50px;
  padding-top: 50px;
  color: var(--background-primary);
  font-weight: bolder;
  text-align: center;
  align-self: flex-start;
`;

const LayoutRowPlaceholderTransparent = styled(LayoutRowPlaceholder)`
  background-color: transparent;
`;

export { LayoutRowBase, LayoutRowPrimary, LayoutRowPlaceholder, LayoutRowTall, LayoutRowPlaceholderTransparent };
