import React from "react";
import { isLocalhost } from "../../constants";
import { AppConfiguration } from "../config/AppConfiguration";
import { appConfigurationFromStrings } from "../config/appConfigurationFromString";
import { createConfiguredEventHandler } from "../most/createConfiguredEventHandler";
import { stringOrDefault } from "../utils/defaults";

function useTwitchExtConfigurationOnChanged() {
  // not sure if app can miss config event due to loading time
  // but I don't know how to handle it without hacks atm
  // so if somebody (most likely me) will have problems with
  // config being not populated - this is most likely the issue

  const { handler, stream: data$ } = createConfiguredEventHandler<AppConfiguration>();

  React.useEffect(() => {
    if (isLocalhost) {
      // this has to be delayed
      setTimeout(() => {
        handler(appConfigurationFromStrings("overlay|topLeft;ss://76561198023909718", "", ""));
      }, 0);
    }

    Twitch.ext.configuration.onChanged(() => {
      handler(
        appConfigurationFromStrings(
          stringOrDefault(Twitch.ext.configuration.broadcaster?.content, ""),
          stringOrDefault(Twitch.ext.configuration.developer?.content, ""),
          stringOrDefault(Twitch.ext.configuration.global?.content, "")
        )
      );
    });
  }, []);

  return [data$] as const;
}

export { useTwitchExtConfigurationOnChanged };
