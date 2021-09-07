import { numberOrDefault } from "../../utils/defaults";
import { BroadcasterConfiguration } from "./BroadcasterConfiguration";

const defaultPanelConfig = {
  positionX: 0,
  positionY: 0
};

function extractPanelConfig(broadcasterConfigString: string): BroadcasterConfiguration.PanelPosition {
  const panelConfigString = broadcasterConfigString
    .split(";")
    .find((part) => ["panel", "overlay"].some((prefix) => part.startsWith(prefix)));

  if (!panelConfigString) {
    return defaultPanelConfig;
  }

  const readArr = panelConfigString.split("|");
  if (readArr[0] === "panel") {
    return defaultPanelConfig;
  }

  if (readArr[0] === "overlay") {
    switch (readArr[1]) {
      case "topLeft":
        return {
          positionX: 2,
          positionY: 2
        };
      case "topRight":
        return {
          positionX: 98,
          positionY: 2
        };
      case "bottomLeft":
        return {
          positionX: 2,
          positionY: 98
        };
      case "bottomRight":
        return {
          positionX: 98,
          positionY: 98
        };
      case "custom":
        return {
          positionX: numberOrDefault(readArr[2], 0),
          positionY: numberOrDefault(readArr[3], 0)
        };
    }
  }
  return defaultPanelConfig;
}

export { extractPanelConfig };
