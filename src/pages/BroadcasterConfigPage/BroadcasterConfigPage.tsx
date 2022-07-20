// TODO - Rewrite this mess using some tool for such work
// This file is one big "xD" - don't do forms like this kids

import React, { PropsWithChildren } from "react";
import "../../App.css";
import styled from "styled-components";
import "overlayscrollbars/css/OverlayScrollbars.css";
import { OverlayScrollbarsComponent } from "overlayscrollbars-react";
import { LayoutRowBase } from "../../components/LayoutRow/LayoutRow";
import { GroupButton } from "../../components/Buttons/GroupButton";
import { ButtonAsItem, ButtonLink } from "../../components/Buttons/Button";
import { ColorSchemeAutoCreator } from "./ThemeSetup/ColorSchemeAutoCreator";
import { ColorSchemeManualCreator } from "./ThemeSetup/ColorSchemeManualCreator";
import {
  colors,
  ExplainationRow,
  FormContainer,
  FormRow,
  QuestionRow,
  SuccessRow,
  TwitchConfigInputRow
} from "./components";
import { isLocalhost } from "../../constants";
import { ScoreSaberConfig } from "./ScoreSaberConfig/ScoreSaberConfig";
import { LayoutConfig } from "./LayoutConfig/LayoutConfig";

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

const _BroadcasterConfigPage = (): JSX.Element => {
  const [wasSubmitted, setWasSubmitted] = React.useState(false);
  const [scoreSaberId, setScoreSaberId] = React.useState("");
  const [panelOrOverlay, setPanelOrOverlay] = React.useState<SerializationData["panelOrOverlay"]>(null);
  const [overlayPlacement, setOverlayPlacement] = React.useState<SerializationData["overlayPlacement"]>(null);
  const [colorScheme, setColorScheme] = React.useState<SerializationData["colorScheme"]>(null);
  const [customOverlayPlacementX, setCustomOverlayPlacementX] =
    React.useState<SerializationData["customOverlayPlacementX"]>(null);
  const [customOverlayPlacementY, setCustomOverlayPlacementY] =
    React.useState<SerializationData["customOverlayPlacementY"]>(null);
  const handleSubmit = React.useCallback(
    (e: React.FormEvent | React.MouseEvent) => {
      e.preventDefault();
      const data = serializeData({
        colorScheme,
        scoreSaberId,
        panelOrOverlay,
        overlayPlacement,
        customOverlayPlacementX,
        customOverlayPlacementY
      });
      console.log(data);
      if (data) {
        setWasSubmitted(true);
        Twitch.ext.configuration.set("broadcaster", "2", data);
      } else {
        setWasSubmitted(false);
      }
    },
    [panelOrOverlay, overlayPlacement, customOverlayPlacementX, customOverlayPlacementY, scoreSaberId]
  );

  return (
    <FormContainer onSubmit={handleSubmit}>
      <h4>Configuration:</h4>
      <FormRow>
        <QuestionRow>Do you want to use extension as a panel or overlay?</QuestionRow>
        <div>
          <ExplainationRow>
            Configuring the extension as an overlay will place it directly over the stream.
          </ExplainationRow>
          <ExplainationRow>
            Configuring the extension as a panel will allow you to add it as a panel in your description.
          </ExplainationRow>
          <ExplainationRow>
            Additionally, for both options - the extension will be available as mobile extension (icon above the chat)
            in Twitch App for Android.
          </ExplainationRow>
          <ExplainationRow>
            Apple devices (iPads, iPhones) require additional developer licensing that I don&lsquo;t have at the moment,
            so the extension will not work on these devices.
          </ExplainationRow>
          <ExplainationRow>
            Note that the overlay will only run if the stream category is set to &quot;Beat Saber&quot; and the stream
            is running.
          </ExplainationRow>
          <ExplainationRow>Highly advised to go for &quot;panel&quot; option.</ExplainationRow>
        </div>
        <GroupButton
          group={[
            {
              kind: "button",
              active: panelOrOverlay === "panel",
              onClick: () => setPanelOrOverlay("panel"),
              text: "Panel"
            },
            {
              kind: "button",
              active: panelOrOverlay === "overlay",
              onClick: () => setPanelOrOverlay("overlay"),
              text: "Overlay"
            }
          ]}
        />
      </FormRow>

      {panelOrOverlay === "overlay" && (
        <FormRow>
          <QuestionRow>Where do you want to place extension in minimized form?</QuestionRow>
          <div>
            <ExplainationRow>
              Place the extension in a spot that won&lsquo;t obstruct elements of the stream.
            </ExplainationRow>
            <ExplainationRow>
              Worth noting how extension works if somebody will have problems in the chat:
              <br />
              The extension in overlay mode starts as a small bubble which fades away after couple seconds.
              <br />
              The overlay will start as a small bubble that appears when mousing over stream. Clicking on the bubble
              will open the overlay, allowing you to search for songs to request. Exit out of the overlay with the
              &quot;X&quot; on the top right.
            </ExplainationRow>
          </div>
          <GroupButton
            group={[
              {
                kind: "button",
                active: overlayPlacement === "topLeft",
                onClick: () => setOverlayPlacement("topLeft"),
                text: "↖ Top left"
              },
              {
                kind: "button",
                active: overlayPlacement === "topRight",
                onClick: () => setOverlayPlacement("topRight"),
                text: "↗ Top right"
              },
              {
                kind: "button",
                active: overlayPlacement === "bottomLeft",
                onClick: () => setOverlayPlacement("bottomLeft"),
                text: "↙ Bottom left"
              },
              {
                kind: "button",
                active: overlayPlacement === "bottomRight",
                onClick: () => setOverlayPlacement("bottomRight"),
                text: "↘ Bottom right"
              },
              {
                kind: "button",
                active: overlayPlacement === "custom",
                onClick: () => setOverlayPlacement("custom"),
                text: "🖉 Custom"
              }
            ]}
          />
        </FormRow>
      )}

      {panelOrOverlay === "overlay" && overlayPlacement === "custom" && (
        <FormRow>
          <QuestionRow>Custom position, where exactly?</QuestionRow>
          <div>
            <ExplainationRow>
              While using customly positioned overlay you have to provide percentages for horizontal and vertical
              placement.
              <br />
              Placement is calculated from top-left, so passing two zeros you will get extension in very top left corner
              of stream.
              <br />
              Passing two 100 will be bottom right corner.
              <br />
              You can pass negative numbers and numbers over 100 to have specific effects or to hide bubble.
              <br />
              Todo: create calculator here to make it easier in some future version
            </ExplainationRow>
          </div>
          <div>
            <TwitchConfigInputRow
              type="number"
              name="positionX"
              default="none"
              setValue={setCustomOverlayPlacementX}
              value={customOverlayPlacementX || 0}
            />
            <TwitchConfigInputRow
              type="number"
              name="positionY"
              default="none"
              setValue={setCustomOverlayPlacementY}
              value={customOverlayPlacementY || 0}
            />
          </div>
          <div>
            <ButtonAsItem kind="button" text="Send positions" onClick={handleSubmit} />
          </div>
        </FormRow>
      )}

      {wasSubmitted && (
        <FormRow>
          <SuccessRow>
            <img src="https://i.giphy.com/media/obN7DdnUWxuyqz5qZS/giphy.webp" height="100" />
            <div>
              <b>Everything is perfect</b>, though... future versions may affect the configuration and cause the
              extension to not load. Check this configuration page if the extension stops working for you
            </div>
          </SuccessRow>
        </FormRow>
      )}
      <ScoreSaberSetup handleSubmit={handleSubmit} scoreSaberId={scoreSaberId} setScoreSaberId={setScoreSaberId} />

      <FormRow>
        <QuestionRow>Define your own color scheme</QuestionRow>
        <ExplainationRow>
          You can generate your color scheme basing on leading color or create scheme manually.
        </ExplainationRow>
        <GroupButton
          group={[
            {
              kind: "button",
              active: colorScheme === "auto",
              onClick: () => setColorScheme("auto"),
              text: "Auto"
            },
            {
              kind: "button",
              active: colorScheme === "manual",
              onClick: () => setColorScheme("manual"),
              text: "Manual"
            }
          ]}
        />
        {colorScheme === "auto" && <ColorSchemeAutoCreator />}
        {colorScheme === "manual" && <ColorSchemeManualCreator />}
      </FormRow>
    </FormContainer>
  );
};

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
  const [activeId, setActiveId] = React.useState("scoresaber");
  
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
    scoreSaberEnabled, setScoreSaberEnabled,
    scoreSaberId, setScoreSaberId
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
  const { activeId, setActiveId } = React.useContext(ConfigContext);

  switch (activeId) {
    case "layout":
      return <LayoutConfig />;
    case "scoresaber":
      return <ScoreSaberConfig />;
  }

  return <></>;
};

const menuItem = (label: string, id: string) => ({ label, id });
const menuItems = [menuItem("Layout", "layout"), menuItem("ScoreSaber", "scoresaber"), menuItem("Theme", "theme")];

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
            <OverlayScrollbarsComponent options={{ scrollbars: { autoHide: "scroll" }, clipAlways: false }} >
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
