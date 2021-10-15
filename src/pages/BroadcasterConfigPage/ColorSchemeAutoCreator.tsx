import React from "react";
import Color from "color";
import { ColorDescription } from "./ColorDescription";
import { ColorPicker } from "./ColorPicker";

export const ColorSchemeAutoCreator = (): JSX.Element => {
  const [selectedColor, setSelectedColor] = React.useState(Color("#cbc1cf"));

  return (
    <div>
      <ColorPicker
        fontWeight="bold"
        label="Select color:"
        selectedColor={selectedColor}
        setSelectedColor={setSelectedColor}
      />
      <ColorDescription color={selectedColor.string()} description="Primary color" />
      <ColorDescription color={selectedColor.darken(0.3).string()} description="Secondary color" />
      <ColorDescription color={selectedColor.rotate(70).string()} description="Accent color" />
      <ColorDescription color="#df4848" description="Warning color" />
    </div>
  );
};
