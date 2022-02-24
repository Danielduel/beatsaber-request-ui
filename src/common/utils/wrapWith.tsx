import React from "react";

export const wrapWith = (Wrapper: ({}: React.PropsWithChildren<unknown>) => JSX.Element) =>
  function WrapperWith<T extends React.ReactNode>(item: T, index: number): JSX.Element {
    return <Wrapper key={index}>{item}</Wrapper>;
  };

export const liWrapper = ({ children }: React.PropsWithChildren<unknown>): JSX.Element => <li>{children}</li>;
export const wrapWithLi = wrapWith(liWrapper);
