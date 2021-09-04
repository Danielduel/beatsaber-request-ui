import React from "react";

export const wrapWith =
  (Wrapper: ({}: React.PropsWithChildren<unknown>) => JSX.Element) =>
  <T extends React.ReactNode>(item: T, index: number) => {
    return <Wrapper key={index}>{item}</Wrapper>;
  };

export const liWrapper = ({ children }: React.PropsWithChildren<unknown>) => <li>{children}</li>;
export const wrapWithLi = wrapWith(liWrapper);
