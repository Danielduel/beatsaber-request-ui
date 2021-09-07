// TODO - Rewrite this mess using some tool for such work
// This file is one big "xD" - don't do forms like this kids

import React from "react";
import "../../App.css";
import styled from "styled-components";
import { LayoutRowBase } from "../../components/LayoutRow/LayoutRow";
import { GroupButton } from "../../components/Buttons/GroupButton";
import { ButtonAsItem } from "../../components/Buttons/Button";

type TwitchConfigInputRowProps = {
  name: string;
  type: React.InputHTMLAttributes<HTMLInputElement>["type"];
  default?: string;
  value: string | number | null;
  setValue: React.Dispatch<React.SetStateAction<number | null>>;
};

const FormContainer = styled.form`
  width: 100%;
  padding: 20px;
  box-sizing: border-box;
  background: var(--background);
`;

const FormRow = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  margin-top: 10px;
  & > *:last-child {
    margin-left: 50px;
  }
`;

const SuccessRow = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  margin-top: 10px;

  & > img {
    margin-right: 20px;
  }
  & > div {
    width: 300px;
  }
`;

const QuestionRow = styled.div`
  font-size: 1.1rem;
  font-weight: bold;
  max-width: 700px;
  margin-bottom: 15px;
`;

const ExplainationRow = styled.div`
  max-width: 700px;
  margin-bottom: 10px;
  margin-left: 5px;
`;

const TwitchConfigInputRow = ({ name, type, value, setValue }: TwitchConfigInputRowProps) => {
  const handleChange = React.useCallback(
    (e: React.ChangeEvent) => {
      setValue(+(e.target as HTMLInputElement).value);
    },
    [setValue]
  );
  return (
    <LayoutRowBase>
      <span>{name}:&nbsp;</span>
      <input onChange={handleChange} placeholder={String(value)} type={type as string} name={name} />
    </LayoutRowBase>
  );
};

// console.log(Twitch.ext.configuration.set("broadcaster", "1", "somethingelse"));
type SerializationData = {
  panelOrOverlay: null | "panel" | "overlay";
  overlayPlacement: null | "topLeft" | "bottomLeft" | "topRight" | "bottomRight" | "custom";
  customOverlayPlacementX: null | number;
  customOverlayPlacementY: null | number;
};

function serializeData({
  panelOrOverlay,
  overlayPlacement,
  customOverlayPlacementX,
  customOverlayPlacementY
}: SerializationData) {
  if (panelOrOverlay === "panel") {
    return "panel";
  }

  if (panelOrOverlay === "overlay" && overlayPlacement !== null) {
    if (overlayPlacement === "custom") {
      if (
        customOverlayPlacementX !== null &&
        customOverlayPlacementY !== null &&
        !isNaN(customOverlayPlacementX) &&
        !isNaN(customOverlayPlacementY)
      ) {
        return `overlay|custom|${customOverlayPlacementX}|${customOverlayPlacementY}`;
      }
      return;
    }
    return `overlay|${overlayPlacement}`;
  }

  return;
}

const _BroadcasterConfigPage = (): JSX.Element => {
  const [wasSubmitted, setWasSubmitted] = React.useState(false);
  const [panelOrOverlay, setPanelOrOverlay] = React.useState<SerializationData["panelOrOverlay"]>(null);
  const [overlayPlacement, setOverlayPlacement] = React.useState<SerializationData["overlayPlacement"]>(null);
  const [customOverlayPlacementX, setCustomOverlayPlacementX] =
    React.useState<SerializationData["customOverlayPlacementX"]>(null);
  const [customOverlayPlacementY, setCustomOverlayPlacementY] =
    React.useState<SerializationData["customOverlayPlacementY"]>(null);
  const handleSubmit = React.useCallback(
    (e: React.FormEvent | React.MouseEvent) => {
      e.preventDefault();
      const data = serializeData({
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
    [panelOrOverlay, overlayPlacement, customOverlayPlacementX, customOverlayPlacementY]
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
    </FormContainer>
  );
};

export default function BroadcasterConfigPage(): JSX.Element {
  return <_BroadcasterConfigPage />;
}
