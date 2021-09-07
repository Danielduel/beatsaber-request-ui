import { Stream } from "most";
import React from "react";
import { AuthResponse } from "../../types/AuthResponse";
import { createConfiguredEventHandler } from "../most/createConfiguredEventHandler";

type TwitchExtAuthStream = Stream<AuthResponse>;

function useTwitchExtOnAuthorized(): readonly [TwitchExtAuthStream] {
  // not sure if app can miss auth event due to loading time
  // but I don't know how to handle it without hacks atm
  // so if somebody (most likely me) will have problems with
  // auth being not populated - this is most likely the issue

  const { handler, stream: data$ } = createConfiguredEventHandler<AuthResponse>();

  React.useEffect(() => {
    Twitch.ext.onAuthorized((auth: AuthResponse) => {
      handler(auth);
    });
  }, []);

  return [data$] as const;
}

export { useTwitchExtOnAuthorized };
export type { TwitchExtAuthStream };
