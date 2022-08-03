import React from "react";
import { isLocalhost } from "../../constants";
import { AppConfiguration, createAppConfigurationFromConfigs } from "../config/AppConfiguration";
import { BroadcasterConfiguration } from "../config/BroadcasterConfiguration";
import { createConfiguredEventHandler } from "../most/createConfiguredEventHandler";
import { useLocalStorageBroadcasterConfig } from "./useLocalStorageBroadcasterConfig";

type ExtConfig = Pick<typeof Twitch.ext.configuration, "broadcaster" | "developer" | "global">;

export const deserializeConfiguration = (isTwitch: boolean, extConfig: ExtConfig): AppConfiguration | undefined => {
  let broadcasterObject = null;
  const gloablObject = null;
  const developerObject = null;
  try {
    const broadcasterContent = extConfig.broadcaster?.version !== "2" ? "{}" : extConfig.broadcaster?.content;
    console.log(broadcasterContent);
    broadcasterObject = JSON.parse(broadcasterContent) as BroadcasterConfiguration;
  } catch (_) {} // error parsing
  if (!broadcasterObject) return;

  try {
    // left space
  } catch (_) {} // error parsing

  try {
    // left space
  } catch (_) {} // error parsing

  try {
    return createAppConfigurationFromConfigs(isTwitch, broadcasterObject, developerObject, gloablObject);
  } catch (_) {} // validation error
};

function useTwitchExtConfigurationOnChanged() {
  // not sure if app can miss config event due to loading time
  // but I don't know how to handle it without hacks atm
  // so if somebody (most likely me) will have problems with
  // config being not populated - this is most likely the issue

  const { handler, stream: data$ } = createConfiguredEventHandler<AppConfiguration>();
  const { localBroadcasterConfig } = useLocalStorageBroadcasterConfig();

  React.useEffect(() => {
    if (isLocalhost) {
      // this has to be delayed
      setTimeout(() => {
        // v1:
        // handler(appConfigurationFromStrings("overlay|topLeft;ss://76561198023909718", "", ""));
        // handler(appConfigurationFromStrings("overlay|topLeft;", "", ""));
        // handler(appConfigurationFromStrings("panel;ss://76561198023909718", "", ""));
        console.log("📦 Loading config from localStorage")
        const localConfig = deserializeConfiguration(false, {
          broadcaster: { content: localBroadcasterConfig, version: "2" },
          developer: undefined,
          global: undefined
        });

        if (!localConfig) {
          console.error("BSR UI Wrong config (local)");
          return;
        }

        handler(localConfig);
      }, 0);
    }

    Twitch.ext.configuration.onChanged(() => {
      console.log("Twitch ext:");
      console.log(Twitch.ext);
      console.log("Broadcaster content: " + Twitch.ext.configuration.broadcaster?.content);
      console.log("🔗 Loading config from Twitch")

      const newConfig = deserializeConfiguration(true, Twitch.ext.configuration);

      if (!newConfig) {
        console.error("BSR UI Wrong config");
        return;
      }

      handler(newConfig);
    });
  }, []);

  return [data$] as const;
}

export { useTwitchExtConfigurationOnChanged };
