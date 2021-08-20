// TODO - Rewrite this mess using some tool for such work
// This file is one big "xD" - don't do forms like this kids

import React from "react";
import "../../App.css";
import styled from "styled-components";
import { LayoutRowBase } from "../../components/LayoutRow/LayoutRow";
import AppEnvContext, { ConfigBroadcaster } from "../../AppEnvContext";
import { GroupButton } from "../../components/Buttons/GroupButton";
import { Button, ButtonAsItem } from "../../components/Buttons/Button";

type TwitchConfigInputRowProps = {
  name: string;
  type: React.InputHTMLAttributes<HTMLInputElement>["type"];
  default: any;
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

const _BroadcasterConfigPage = ({
  configBroadcaster
}: {
  configBroadcaster: ConfigBroadcaster | null;
}): JSX.Element => {
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
        Twitch.ext.configuration.set("broadcaster", "2", data);
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
          <ExplainationRow>Extension as overlay is shown directly on top of your stream footage</ExplainationRow>
          <ExplainationRow>Extension as panel can be added as a panel in your description</ExplainationRow>
          <ExplainationRow>
            Extension will be available as mobile extension (icon above the chat) in Twitch App for Android
          </ExplainationRow>
          <ExplainationRow>
            Apple mobile devices (iPads, iPhones) require additional licensing from developer side which I don&lsquo;t
            own for private use at this moment. Extension will be blocked by those devices.
          </ExplainationRow>
          <ExplainationRow>
            Worth noting - extension as overlay will NOT run if stream category (game) is not set to &quot;Beat Saber&quot; and
            stream is not currently running.
          </ExplainationRow>
        </div>
        <GroupButton
          group={[
            {
              active: panelOrOverlay === "panel",
              onClick: () => setPanelOrOverlay("panel"),
              text: "Panel"
            },
            {
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
            <ExplainationRow>Highly adviced to use infrequently used spot.</ExplainationRow>
            <ExplainationRow>
              Worth noting how extension works if somebody will have problems in the chat:
              <br />
              Extension in overlay mode starts as a small bubble which fades away after couple seconds.
              <br />
              Viewer can hover over bubble location to see it again and then click it. <br />
              Clicking "maximizes" extension. <br />
              Then, after using extension, user can click close button in top right corner to make it bubble again.
            </ExplainationRow>
          </div>
          <GroupButton
            group={[
              {
                active: overlayPlacement === "topLeft",
                onClick: () => setOverlayPlacement("topLeft"),
                text: "↖ Top left"
              },
              {
                active: overlayPlacement === "topRight",
                onClick: () => setOverlayPlacement("topRight"),
                text: "↗ Top right"
              },
              {
                active: overlayPlacement === "bottomLeft",
                onClick: () => setOverlayPlacement("bottomLeft"),
                text: "↙ Bottom left"
              },
              {
                active: overlayPlacement === "bottomRight",
                onClick: () => setOverlayPlacement("bottomRight"),
                text: "↘ Bottom right"
              },
              {
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
            <ButtonAsItem text="Send positions" onClick={handleSubmit} />
          </div>
        </FormRow>
      )}
    </FormContainer>
  );
};

export default function BroadcasterConfigPage(): JSX.Element {
  return (
    <AppEnvContext.Consumer>
      {(context) => <_BroadcasterConfigPage configBroadcaster={context.configBroadcaster} />}
    </AppEnvContext.Consumer>
  );
}
