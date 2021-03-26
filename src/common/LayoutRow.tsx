import React, { CSSProperties, FunctionComponent } from "react";

type LayoutRowProps = {
  isPrimary?: boolean;
  placeholder?: boolean;
  isPageHeader?: boolean;
  hasBorderBottom?: boolean;
  style?: CSSProperties;
};

const LayoutRow: FunctionComponent<LayoutRowProps> = ({
  children,
  isPrimary,
  placeholder,
  isPageHeader,
  hasBorderBottom,
  style
}) => {
  const classNames = `
    LayoutRow-Container
    ${isPrimary ? "primary" : ""}
    ${isPageHeader ? "pageHeader" : ""}
    ${hasBorderBottom ? "borderBottom" : ""}
    ${placeholder ? "placeholder" : ""}
  `;
  return (
    <div style={style} className={classNames}>
      {children}
    </div>
  );
};

export default LayoutRow;
