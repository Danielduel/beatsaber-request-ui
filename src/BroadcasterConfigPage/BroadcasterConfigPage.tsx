import React from "react";
import "../App.css";
import LayoutRow from "../common/LayoutRow";

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
  return (
    <div>
      <LayoutRow>There are no configuration options</LayoutRow>
      {/* <TwitchConfigInputRow type="checkbox" name="test" default="none" value=""/> */}
    </div>
  );
}
