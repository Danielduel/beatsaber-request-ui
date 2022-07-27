import React from "react";
import { ColorPicker } from "./ColorPicker";
import { ConfigContext } from "../BroadcasterConfigPage";

export const ColorSchemeManualCreator = (): JSX.Element => {
  const {
    themePrimaryColor,
    themeSecondaryColor,
    themeAccentColor,
    themeWarningColor,
    setThemeAccentColor,
    setThemePrimaryColor,
    setThemeSecondaryColor,
    setThemeWarningColor
  } = React.useContext(ConfigContext);

  return (
    <div>
      <ColorPicker label="Primary color:" selectedColor={themePrimaryColor} setSelectedColor={setThemePrimaryColor} />
      <ColorPicker
        label="Secondary color:"
        selectedColor={themeSecondaryColor}
        setSelectedColor={setThemeSecondaryColor}
      />
      <ColorPicker label="Accent color:" selectedColor={themeAccentColor} setSelectedColor={setThemeAccentColor} />
      <ColorPicker label="Warning color:" selectedColor={themeWarningColor} setSelectedColor={setThemeWarningColor} />
    </div>
  );
};
