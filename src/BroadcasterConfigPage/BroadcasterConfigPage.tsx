// TODO - Rewrite this mess using some tool for such work
// This file is one big "xD" - don't do forms like this kids

import React from "react";
import "../App.css";
import AppEnvContext, { ConfigBroadcaster } from "../AppEnvContext";
import LayoutRow from "../common/LayoutRow";

type TwitchConfigInputRowProps = {
  name: string;
  type: React.InputHTMLAttributes<HTMLInputElement>["type"];
  default: any;
  value: string | number | null;
};

const TwitchConfigInputRow = ({ name, type, value }: TwitchConfigInputRowProps) => {
  const [_value, setValue] = React.useState(String(value));
  const handleChange = React.useCallback(
    (e: React.ChangeEvent) => {
      setValue((e.target as HTMLInputElement).value);
    },
    [setValue]
  );
  return (
    <LayoutRow>
      <span>{name}:&nbsp;</span>
      <input onChange={handleChange} placeholder={String(value)} type={type as string} name={name} />
      &nbsp;(actual: {value})
    </LayoutRow>
  );
};

// console.log(Twitch.ext.configuration.set("broadcaster", "1", "somethingelse"));

const _BroadcasterConfigPage = ({ configBroadcaster }: { configBroadcaster: ConfigBroadcaster }): JSX.Element => {
  const handleSubmit = React.useCallback((e: React.FormEvent) => {
    // it's too late(2am) to think about this
    const positionXValue = (document.getElementsByName("positionX")[0] as HTMLInputElement).value;
    const positionYValue = (document.getElementsByName("positionY")[0] as HTMLInputElement).value;
    const submitData = [positionXValue, positionYValue].join("|");
    Twitch.ext.configuration.set("broadcaster", "1", submitData);
  }, []);

  return (
    <form
      onSubmit={handleSubmit}
      style={{ maxWidth: "100%", background: "var(--background)", padding: "20px", boxSizing: "border-box" }}
    >
      <h4>Configuration:</h4>
      <span>(just test, but should work, rather don&apos;t try to break it)</span>
      <p>
        <code>positionX</code> and <code>positionY</code> are percent values positioning inactive bubble on the viewer
        screen. Zeroing both values will make inactive bubble to be top-left. You can pass negative numbers to hide
        bubble.
      </p>
      <TwitchConfigInputRow type="number" name="positionX" default="none" value={configBroadcaster.positionX} />
      <TwitchConfigInputRow type="number" name="positionY" default="none" value={configBroadcaster.positionY} />
      <TwitchConfigInputRow type="submit" name="Send" default="none" value={null} />

      <p>
        <div>Debug data (experimental):</div>
        <code>{JSON.stringify(configBroadcaster, null, 2)}</code>
        <hr />
        <div>Also, feel free to contact me in repository issues in order to make something configurable</div>
        <code>https://github.com/Duelsik/beatsaber-request-ui/issues</code>
      </p>
    </form>
  );
};

export default function BroadcasterConfigPage(): JSX.Element {
  return (
    <AppEnvContext.Consumer>
      {(context) =>
        context.configBroadcaster ? (
          <_BroadcasterConfigPage configBroadcaster={context.configBroadcaster} />
        ) : (
          <p style={{ background: "var(--background)", padding: "20px", boxSizing: "border-box" }}>Loading config</p>
        )
      }
    </AppEnvContext.Consumer>
  );
}
