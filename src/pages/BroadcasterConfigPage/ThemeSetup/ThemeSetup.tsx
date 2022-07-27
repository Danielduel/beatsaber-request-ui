import Color from "color";
import React from "react";
import styled from "styled-components";
import { AppWrapper } from "../../../App";
import { GroupButton, GroupButtonProps } from "../../../components/Buttons/GroupButton";
import { ContainedApp } from "../../../ContainedApp";
import { BodyWithNavigation } from "../../../layouts/BodyWithNavigation";
import { ConfigContext } from "../BroadcasterConfigPage";
import { ColorSchemeAutoCreator } from "./ColorSchemeAutoCreator";
import { ColorSchemeManualCreator } from "./ColorSchemeManualCreator";

type ContainerAppProps = {
  themePrimaryColor: Color;
  themeSecondaryColor: Color;
  themeAccentColor: Color;
  themeWarningColor: Color;
};
const colorsFromProps = ({
  themePrimaryColor,
  themeSecondaryColor,
  themeAccentColor,
  themeWarningColor
}: ContainerAppProps) => `
  --background-primary: ${themePrimaryColor};
  --background: ${themeSecondaryColor};
  --background-input: ${themeSecondaryColor};
  --background-icon-notpressed: ${themeAccentColor};
  --background-icon-pressed: ${themeAccentColor};
`;

const ContainerAppWrapper = styled.div`
  ${colorsFromProps}

  ${AppWrapper}, ${BodyWithNavigation} {
    min-height: 500px !important;
    max-height: 500px !important;
  }
`;

type CreatorKind = "manual" | "auto";
export const ThemeSetup = () => {
  const [creatorKind, setCreatorKind] = React.useState<CreatorKind>("auto");
  const groupButtonGroup = React.useMemo<GroupButtonProps["group"]>(() => {
    return [
      {
        text: "Auto",
        kind: "button",

        active: creatorKind !== "auto",
        onClick: () => setCreatorKind("auto")
      },
      {
        text: "Manual",
        kind: "button",
        active: creatorKind !== "manual",
        onClick: () => setCreatorKind("manual")
      }
    ];
  }, [creatorKind, setCreatorKind]);

  const { themePrimaryColor, themeSecondaryColor, themeAccentColor, themeWarningColor } =
    React.useContext(ConfigContext);

  return (
    <>
      <GroupButton group={groupButtonGroup} />
      {creatorKind === "auto" && <ColorSchemeAutoCreator />}
      {creatorKind === "manual" && <ColorSchemeManualCreator />}
      <ContainerAppWrapper
        themePrimaryColor={themePrimaryColor}
        themeSecondaryColor={themeSecondaryColor}
        themeAccentColor={themeAccentColor}
        themeWarningColor={themeWarningColor}
      >
        <ContainedApp />
      </ContainerAppWrapper>
    </>
  );
};
