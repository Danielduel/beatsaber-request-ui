import styled from "styled-components";
import React from "react";

const ColorSample = styled.div.attrs((props) => ({
  style: {
    background: props.color
  }
}))`
  width: 2rem;
  height: 1rem;
`;

const ColorDescriptionContainer = styled.div`
  display: flex;
`;

type ColorDescriptionProps = {
  description: string;
  color: string;
};

export const ColorDescription = (props: ColorDescriptionProps): JSX.Element => {
  return (
    <ColorDescriptionContainer>
      <div>{props.description}</div>
      <ColorSample color={props.color} />
    </ColorDescriptionContainer>
  );
};
