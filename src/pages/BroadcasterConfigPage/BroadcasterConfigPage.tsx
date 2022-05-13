// TODO - Rewrite this mess using some tool for such work
// This file is one big "xD" - don't do forms like this kids

import React, { ChangeEvent } from "react";
import "../../App.css";
import styled from "styled-components";
import { LayoutRowBase } from "../../components/LayoutRow/LayoutRow";
import { GroupButton } from "../../components/Buttons/GroupButton";
import { ButtonAsItem, ButtonLink } from "../../components/Buttons/Button";
import { ColorSchemeAutoCreator } from "./ThemeSetup/ColorSchemeAutoCreator";
import { ColorSchemeManualCreator } from "./ThemeSetup/ColorSchemeManualCreator";
import { ScoreSaberBar } from "../../components/ScoreSaberBar/ScoreSaberBar";
import { ExplainationRow, FormContainer, FormRow, QuestionRow, SuccessRow, TwitchConfigInputRow } from "./components";
import { isLocalhost } from "../../constants";
import { ScoreSaberSetup } from "./ScoreSaberSetup/ScoreSaberSetup";

// console.log(Twitch.ext.configuration.set("broadcaster", "1", "somethingelse"));
type SerializationData = {
  scoreSaberId: string;
  colorScheme: null | "auto" | "manual";
  panelOrOverlay: null | "panel" | "overlay";
  overlayPlacement: null | "topLeft" | "bottomLeft" | "topRight" | "bottomRight" | "custom";
  customOverlayPlacementX: null | number;
  customOverlayPlacementY: null | number;
};

const a = "asd";

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

export default function BroadcasterConfigPage(): JSX.Element {
  React.useLayoutEffect(() => {
    if (isLocalhost) {
      document.body.style.background = "black";
    }
  }, []);
  return <_BroadcasterConfigPage />;
}
