import React from 'react';

export default function LayoutRow({
  children,
  isPrimary,
  placeholder,
  isPageHeader,
  hasBorderBottom,

  style
}) {
  const classNames = `
    LayoutRow-Container
    ${isPrimary ? 'primary' : ''}
    ${isPageHeader ? 'pageHeader' : ''}
    ${hasBorderBottom ? 'borderBottom' : ''}
    ${placeholder ? 'placeholder' : ''}
  `;
  return (
    <div style={style} className={classNames}>
      { children }
    </div>
  );
}
