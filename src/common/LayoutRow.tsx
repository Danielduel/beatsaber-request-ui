import React, { CSSProperties, PropsWithChildren } from "react";

type LayoutRowProps = PropsWithChildren<{
  isPrimary?: boolean;
  placeholder?: boolean;
  isPageHeader?: boolean;
  hasBorderBottom?: boolean;
  style?: CSSProperties;
}>;

const LayoutRow = ({
  children,
  isPrimary,
  placeholder,
  isPageHeader,
  hasBorderBottom,
  style
}: LayoutRowProps): JSX.Element => {
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
