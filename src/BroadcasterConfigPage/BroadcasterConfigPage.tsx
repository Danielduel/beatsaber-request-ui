import React from "react";
import "../App.css";
import LayoutRow from "../common/LayoutRow";

type TwitchConfigScope = "global" | "broadcaster";

declare let Twitch: {
  ext: {
    configuration: {
      set: (scope: TwitchConfigScope, version: string, value: string) => Promise<any>;
      onChanged: (a: any) => void;
      broadcaster: any;
      developer: any;
      global: any;
    };
  };
};

declare let twitch: any;

// type TwitchConfigInputRowProps = {
//   name: string;
//   type: React.InputHTMLAttributes<HTMLInputElement>["type"]
//   default: any;
//   value: string;
// };

// const TwitchConfigInputRow = ({
//   name,
//   type
// }: TwitchConfigInputRowProps) => {
//   return (
//     <LayoutRow>
//       <input type={type as string} name={name} /><span>Something</span>&nbsp;(actual: )
//     </LayoutRow>
//   );
// };

export default function BroadcasterConfigPage(): JSX.Element {
  // console.log(this);
  Twitch.ext.configuration.onChanged((data: any) => {
    console.log(Twitch.ext.configuration.set("broadcaster", "versionname", "something"));
    console.log(Twitch.ext.configuration.broadcaster);
    console.log(Twitch.ext.configuration.developer);
    console.log(Twitch.ext.configuration.global);
  });
  // console.log(Twitch);
  // console.log(Twitch.ext.configuration.set("broadcaster", "0.0.5", "something"));
  // console.log(Twitch.ext.configuration.set);
  // console.log(Twitch.ext.configuration.broadcaster);
  // console.log(Twitch.ext.configuration.developer);
  // console.log(Twitch.ext.configuration.global);
  return (
    <div>
      <LayoutRow>There are no configuration options asd</LayoutRow>
      {/* <TwitchConfigInputRow type="checkbox" name="test" default="none" value=""/> */}
    </div>
  );
}
