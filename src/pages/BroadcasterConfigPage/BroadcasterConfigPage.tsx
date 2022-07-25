import React, { PropsWithChildren } from "react";
import "../../App.css";
import styled from "styled-components";
import "overlayscrollbars/css/OverlayScrollbars.css";
import { OverlayScrollbarsComponent } from "overlayscrollbars-react";
import { colors } from "./components";
import { isLocalhost } from "../../constants";
import { ScoreSaberConfig } from "./ScoreSaberConfig/ScoreSaberConfig";
import { LayoutConfig } from "./LayoutConfig/LayoutConfig";
import { ThemeSetup } from "./ThemeSetup/ThemeSetup";

// console.log(Twitch.ext.configuration.set("broadcaster", "1", "somethingelse"));
type SerializationData = {
  scoreSaberId: string;
  colorScheme: null | "auto" | "manual";
  panelOrOverlay: null | "panel" | "overlay";
  overlayPlacement: null | "topLeft" | "bottomLeft" | "topRight" | "bottomRight" | "custom";
  customOverlayPlacementX: null | number;
  customOverlayPlacementY: null | number;
};

function serializeData({
  scoreSaberId,
  panelOrOverlay,
  overlayPlacement,
  customOverlayPlacementX,
  customOverlayPlacementY
}: SerializationData) {
  const separator = ";";
  const scoreSaberData = scoreSaberId ? `${separator}ss://${scoreSaberId}` : "";

  const optionalFields = scoreSaberData;

  if (panelOrOverlay === "panel") {
    return "panel" + optionalFields;
  }

  if (panelOrOverlay === "overlay" && overlayPlacement !== null) {
    if (overlayPlacement === "custom") {
      if (
        customOverlayPlacementX !== null &&
        customOverlayPlacementY !== null &&
        !isNaN(customOverlayPlacementX) &&
        !isNaN(customOverlayPlacementY)
      ) {
        return `overlay|custom|${customOverlayPlacementX}|${customOverlayPlacementY}` + optionalFields;
      }
      return;
    }
    return `overlay|${overlayPlacement}` + optionalFields;
  }

  return;
}

const ConfigPageLayoutWrapper = styled.div`
  background-color: #333;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  border: 0px solid transparent;
`;

const ConfigPageLayoutContainer = styled.div`
  display: grid;
  height: 100%;
  width: 100%;
  grid-template-columns: 200px 1fr;
`;

const ConfigPageMenu = styled.div`
  background-color: ${colors.darker};
  padding: 1rem 1rem 2rem;
`;
const ConfigPageMenuTitle = styled.div`
  color: ${colors.shade};
  user-select: none;
  font-size: 0.9rem;
  padding: 0.25rem 1rem;
`;

const ConfigPageBody = styled.div`
  width: 100%;
  background-color: ${colors.dark};
`;

export type ConfigContextType = ReturnType<typeof useConfigContextValue>;
export const ConfigContext = React.createContext<ConfigContextType>({} as ConfigContextType);
const ConfigPageMenuItemContainer = styled.div`
  user-select: none;
  cursor: pointer;
  margin-top: 0.5rem;
  padding: 0.25rem 1rem;
  color: ${colors.shade};
  border-radius: 0.5rem;
  font-size: 1.2rem;
  &:hover {
    background-color: ${colors.hover};
    color: ${colors.light};
  }
  ${({ active }: { active: boolean }) => active && `background-color: ${colors.accent} !important; color: white;`}
`;

const useConfigContextValue = () => {
  const [activeId, setActiveId] = React.useState("theme");

  const [layoutActiveId, setLayoutActiveId] = React.useState("custom");
  const [layoutPreciseX, setLayoutPreciseX] = React.useState(50);
  const [layoutPreciseY, setLayoutPreciseY] = React.useState(50);

  const [scoreSaberEnabled, setScoreSaberEnabled] = React.useState(false);
  const [scoreSaberId, setScoreSaberId] = React.useState("");

  return {
    activeId,
    setActiveId,
    layoutActiveId,
    setLayoutActiveId,
    layoutPreciseX,
    setLayoutPreciseX,
    layoutPreciseY,
    setLayoutPreciseY,
    scoreSaberEnabled,
    setScoreSaberEnabled,
    scoreSaberId,
    setScoreSaberId
  } as const;
};

const ConfigPageMenuItem = ({ label, id }: ReturnType<typeof menuItem>) => {
  const { activeId, setActiveId } = React.useContext(ConfigContext);

  const onClick = React.useCallback(() => {
    setActiveId(id);
  }, [id, setActiveId]);

  return (
    <ConfigPageMenuItemContainer onClick={onClick} active={id === activeId}>
      {label}
    </ConfigPageMenuItemContainer>
  );
};

const ConfigPageBodyRouter = () => {
  const { activeId } = React.useContext(ConfigContext);

  switch (activeId) {
    case "layout":
      return <LayoutConfig />;
    case "scoresaber":
      return <ScoreSaberConfig />;
    case "theme":
      return <ThemeSetup />;
  }

  return <></>;
};

const menuItem = (label: string, id: string) => ({ label, id });
const menuItems = [
  menuItem("Layout", "layout"),
  menuItem("ScoreSaber", "scoresaber"),
  menuItem("Theme", "theme"),
  menuItem("SRM Bridge", "srmbridge")
];

const ConfigContextProvider = ({ children }: PropsWithChildren<{}>) => {
  const state = useConfigContextValue();

  return <ConfigContext.Provider value={state}>{children}</ConfigContext.Provider>;
};

const ConfigPageLayout = () => {
  return (
    <ConfigContextProvider>
      <ConfigPageLayoutWrapper>
        <ConfigPageLayoutContainer>
          <ConfigPageMenu>
            <ConfigPageMenuTitle>Settings</ConfigPageMenuTitle>
            {menuItems.map((props) => (
              <ConfigPageMenuItem {...props} />
            ))}
          </ConfigPageMenu>
          <ConfigPageBody>
            <OverlayScrollbarsComponent options={{ scrollbars: { autoHide: "scroll" }, clipAlways: false }}>
              <ConfigPageBodyRouter />
            </OverlayScrollbarsComponent>
          </ConfigPageBody>
        </ConfigPageLayoutContainer>
      </ConfigPageLayoutWrapper>
    </ConfigContextProvider>
  );
};

export default function BroadcasterConfigPage(): JSX.Element {
  React.useLayoutEffect(() => {
    if (isLocalhost) {
      document.body.style.background = "black";
    }
  }, []);

  return <ConfigPageLayout />;
}
