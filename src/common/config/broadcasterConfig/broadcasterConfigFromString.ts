import { BroadcasterConfiguration } from "./BroadcasterConfiguration";
import { extractPanelConfig } from "./extractPanelConfig";

function broadcasterConfigFromString(broadcasterString: string): BroadcasterConfiguration {
  return {
    panelPosition: extractPanelConfig(broadcasterString)
  };
}

export { broadcasterConfigFromString };
