import React from "react";
import styled from "styled-components";
import Color from "color";
import { ColorDescription } from "./ColorDescription";

const ColorPicker = styled.div`
  input {
    padding: 1px 2px;
  }
`;

const asInput = (element: Element): HTMLInputElement => {
  return element as HTMLInputElement;
};

export const ColorSchemeCreator = (): JSX.Element => {
  const [color, setColor] = React.useState("#cbc1cf");
  const [selectedColor, setSelectedColor] = React.useState(Color(color));

  const handleChange = React.useCallback((e: React.ChangeEvent) => {
    setColor(asInput(e.target).value);
  }, []);

  const handlePickerClose = React.useCallback(
    (e: React.FocusEvent) => {
      setSelectedColor(Color(color));
    },
    [color]
  );

  return (
    <div>
      <ColorPicker>
        <input type="color" onChange={handleChange} onBlur={handlePickerClose} value={color} />
      </ColorPicker>
      <ColorDescription color={color} description="Primary color" />
      <ColorDescription color={selectedColor.darken(0.2).string()} description="Secondary color" />
      <ColorDescription color={selectedColor.rotate(60).string()} description="Accent color" />
      <ColorDescription color="#df4848" description="Warning color" />
    </div>
  );
};
