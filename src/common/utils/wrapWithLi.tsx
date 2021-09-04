import React from "react";

const wrapWithLi = <T extends React.ReactNode>(item: T, index: number) => {
  return <li key={index}>{item}</li>;
};

export { wrapWithLi };
