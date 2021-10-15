import React from "react";
import styled from "styled-components";
import Color from "color";

const ColorPickerInput = styled.input`
  padding: 0;
`;

const ColorPickerContainer = styled.div`
  display: flex;
  margin: 1em;
`;

type ColorPickerLabelProps = {
  fontWeight: "normal" | "bold";
};

const ColorPickerLabel = styled.div`
  width: 10em;
  font-weight: ${({ fontWeight }: ColorPickerLabelProps) => fontWeight};
`;

const asInput = (element: Element): HTMLInputElement => {
  return element as HTMLInputElement;
};

type ColorPickerProps = {
  fontWeight?: "normal" | "bold";
  label: string;
  setSelectedColor: React.Dispatch<React.SetStateAction<Color<string>>>;
  selectedColor: Color<string>;
};

export const ColorPicker = ({
  fontWeight = "normal",
  label,
  setSelectedColor,
  selectedColor
}: ColorPickerProps): JSX.Element => {
  const valueRef = React.useRef(selectedColor.hex());
  const [color, setColor] = React.useState(selectedColor.hex());

  const handleChange = React.useCallback(
    (e: React.ChangeEvent) => {
      valueRef.current = asInput(e.target).value;
    },
    [valueRef]
  );

  const handlePickerClose = React.useCallback(
    (e: React.FocusEvent) => {
      const value = valueRef.current;
      setColor(value);
      setSelectedColor(Color(value));
    },
    [valueRef, setColor, setSelectedColor]
  );

  return (
    <ColorPickerContainer>
      <ColorPickerLabel fontWeight={fontWeight}>{label}</ColorPickerLabel>
      <ColorPickerInput type="color" onBlur={handlePickerClose} onChange={handleChange} value={color} />
    </ColorPickerContainer>
  );
};
