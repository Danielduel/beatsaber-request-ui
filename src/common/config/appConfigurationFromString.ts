import { AppConfiguration } from "./AppConfiguration";
import { broadcasterConfigFromString } from "./broadcasterConfig/broadcasterConfigFromString";

function appConfigurationFromStrings(
  broadcasterString: string,
  developerString: string,
  globalString: string
): AppConfiguration {
  console.log("AppConfiguration: " + broadcasterString);
  return {
    broadcaster: broadcasterConfigFromString(broadcasterString),
    developer: null,
    global: null
  };
}

export { appConfigurationFromStrings };
