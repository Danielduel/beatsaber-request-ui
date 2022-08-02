import React from "react";
import Color from "color";
import { ColorDescription } from "./ColorDescription";
import { ColorPicker } from "./ColorPicker";
import { ConfigContext } from "../BroadcasterConfigPage";

const getPrimaryColor = (selectedColor: Color<string>) => selectedColor;
const getSecondaryColor = (selectedColor: Color<string>) => selectedColor.darken(0.3);
const getAccentColor = (selectedColor: Color<string>) => selectedColor.rotate(50);
const getWarningColor = (selectedColor: Color<string>) => selectedColor.saturate(20);

export const ColorSchemeAutoCreator = (): JSX.Element => {
  const { themePrimaryColor, themeSecondaryColor, themeAccentColor, themeWarningColor } =
    React.useContext(ConfigContext);

  const [selectedColor, setSelectedColor] = React.useState(themePrimaryColor.value);

  React.useEffect(() => {
    themePrimaryColor.setValue(getPrimaryColor(selectedColor));
    themeSecondaryColor.setValue(getSecondaryColor(selectedColor));
    themeAccentColor.setValue(getAccentColor(selectedColor));
    themeWarningColor.setValue(getWarningColor(selectedColor));
  }, [selectedColor]);

  return (
    <div>
      <ColorPicker
        fontWeight="bold"
        label="Select color:"
        selectedColor={themePrimaryColor.value}
        setSelectedColor={setSelectedColor}
      />
      <ColorDescription color={themePrimaryColor.value.string()} description="Primary color" />
      <ColorDescription color={themeSecondaryColor.value.string()} description="Secondary color" />
      <ColorDescription color={themeAccentColor.value.string()} description="Accent color" />
      <ColorDescription color={themeWarningColor.value.string()} description="Warning color" />
    </div>
  );
};
