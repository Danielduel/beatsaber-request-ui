import React from "react";

type KeyableArrayItem = string | JSX.Element | JSX.Element[];
const implicitlyKeyArrayUsingIndex = (array: KeyableArrayItem[]) => {
  return array.flatMap((item, index) => {
    return [<React.Fragment key={index}>{item}</React.Fragment>];
  });
};

export { implicitlyKeyArrayUsingIndex };
