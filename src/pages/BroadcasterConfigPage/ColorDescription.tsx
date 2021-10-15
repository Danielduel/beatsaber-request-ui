import styled from "styled-components";
import React from "react";

type ColorSampleProps = {
  color: string;
};

const ColorSample = styled.div`
  width: 2em;
  height: 1em;
  border: 1px solid black;
  background: ${({ color }: ColorSampleProps) => color};
`;

const ColorDescriptionContainer = styled.div`
  display: flex;
  margin: 1em;
`;

const ColorDescriptionLabel = styled.div`
  width: 10em;
`;

type ColorDescriptionProps = {
  description: string;
  color: string;
};

export const ColorDescription = ({ color, description }: ColorDescriptionProps): JSX.Element => {
  return (
    <ColorDescriptionContainer>
      <ColorDescriptionLabel>{description}</ColorDescriptionLabel>
      <ColorSample color={color} />
    </ColorDescriptionContainer>
  );
};
