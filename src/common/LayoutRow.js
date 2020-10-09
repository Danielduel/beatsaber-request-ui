import React from 'react';

export default function LayoutRow({
  children,
  isPrimary,
  placeholder,
  isPageHeader,
  hasBorderBottom
}) {
  const classNames = `
    LayoutRow-Container
    ${isPrimary ? 'primary' : ''}
    ${isPageHeader ? 'pageHeader' : ''}
    ${hasBorderBottom ? 'borderBottom' : ''}
    ${placeholder ? 'placeholder' : ''}
  `;
  return ( 
    <div className={classNames}>
      { children }
    </div>
  );
}
