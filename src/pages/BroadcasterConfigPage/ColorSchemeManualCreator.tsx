import React from "react";
import { ColorPicker } from "./ColorPicker";
import Color from "color";

export const ColorSchemeManualCreator = (): JSX.Element => {
  const [primaryColor, setPrimaryColor] = React.useState(Color("#b161d0"));
  const [secondaryColor, setSecondaryColor] = React.useState(Color("#9939bf"));
  const [accentColor, setAccentColor] = React.useState(Color("#cd8c36"));
  const [warningColor, setWarningColor] = React.useState(Color("#d0297d"));

  return (
    <div>
      <ColorPicker label="Primary color:" selectedColor={primaryColor} setSelectedColor={setPrimaryColor} />
      <ColorPicker label="Secondary color:" selectedColor={secondaryColor} setSelectedColor={setSecondaryColor} />
      <ColorPicker label="Accent color:" selectedColor={accentColor} setSelectedColor={setAccentColor} />
      <ColorPicker label="Warning color:" selectedColor={warningColor} setSelectedColor={setWarningColor} />
    </div>
  );
};
