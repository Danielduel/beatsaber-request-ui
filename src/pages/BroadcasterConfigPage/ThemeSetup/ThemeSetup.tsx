import Color from "color";
import React from "react";
import styled from "styled-components";
import { AppWrapper } from "../../../App";
import { GroupButton, GroupButtonProps } from "../../../components/Buttons/GroupButton";
import { ContainedApp } from "../../../ContainedApp";
import { BodyWithNavigation } from "../../../layouts/BodyWithNavigation";
import { ConfigContext } from "../BroadcasterConfigPage";
import { colors } from "../components";
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

const DescriptionWrapper = styled.div`
  margin: 1rem;
  color: ${colors.light};
  font-size: 1.1rem;
  display: flex;
  max-width: 600px;
  flex-shrink: 1;
  flex-direction: column;
`;

const CreatorWrapper = styled.div`
  margin-left: 5rem;
`;

const StyledGroupButtonWrapper = styled.div`
  transform: rotate(-90deg);
  z-index: 9999;
  left: -0.5rem;
  top: 7.5rem;
  position: absolute;
`;

const StyledGroupButton = styled(GroupButton)`
  margin: 1rem 0 1rem 2rem;
  --background-input-active: #999;
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
  const [creatorKind, setCreatorKind] = React.useState<CreatorKind>("manual");
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
      <DescriptionWrapper>
        You can change colors used inside the panel
        <StyledGroupButtonWrapper>
          <StyledGroupButton group={groupButtonGroup} />
        </StyledGroupButtonWrapper>
        <CreatorWrapper>
          {creatorKind === "auto" && <ColorSchemeAutoCreator />}
          {creatorKind === "manual" && <ColorSchemeManualCreator />}
        </CreatorWrapper>
        <ContainerAppWrapper
          themePrimaryColor={themePrimaryColor.value}
          themeSecondaryColor={themeSecondaryColor.value}
          themeAccentColor={themeAccentColor.value}
          themeWarningColor={themeWarningColor.value}
        >
          <ContainedApp />
        </ContainerAppWrapper>
      </DescriptionWrapper>
    </>
  );
};
