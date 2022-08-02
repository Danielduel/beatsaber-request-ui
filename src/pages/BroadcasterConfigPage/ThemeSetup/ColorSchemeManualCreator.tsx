import React from "react";
import { ColorPicker } from "./ColorPicker";
import { ConfigContext } from "../BroadcasterConfigPage";

export const ColorSchemeManualCreator = (): JSX.Element => {
  const { themePrimaryColor, themeSecondaryColor, themeAccentColor, themeWarningColor } =
    React.useContext(ConfigContext);

  return (
    <div>
      <ColorPicker
        label="Primary color:"
        selectedColor={themePrimaryColor.value}
        setSelectedColor={themePrimaryColor.setValue}
      />
      <ColorPicker
        label="Secondary color:"
        selectedColor={themeSecondaryColor.value}
        setSelectedColor={themeSecondaryColor.setValue}
      />
      <ColorPicker
        label="Accent color:"
        selectedColor={themeAccentColor.value}
        setSelectedColor={themeAccentColor.setValue}
      />
      <ColorPicker
        label="Warning color:"
        selectedColor={themeWarningColor.value}
        setSelectedColor={themeWarningColor.setValue}
      />
    </div>
  );
};
