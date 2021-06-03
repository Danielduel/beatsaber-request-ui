import React, { PropsWithChildren } from "react";
import * as Rx from "rxjs";
import { AuthResponse } from "./types/AuthResponse.d";
import { ChannelInfoResponse } from "./types/ChannelInfoResponse";
import { RawConfigResponse } from "./types/RawConfigResponse";
declare let Twitch: any;

const authObservable: Rx.Observable<AuthResponse> = Rx.from(
  new Promise<AuthResponse>((resolve) =>
    Twitch.ext.onAuthorized((auth: AuthResponse) => {
      resolve(auth);
    })
  )
);

const channelInfoObservable = Rx.from(
  new Promise<ChannelInfoResponse>((resolve, reject) => {
    authObservable.subscribe((auth) => {
      return fetch(`/kraken/channels/${auth.channelId}`, {
        method: "GET",
        headers: {
          "Accept": "application/vnd.twitchtv.v5+json",
          "Client-ID": auth.clientId
        }
      })
        .then((response) => response.json() as Promise<ChannelInfoResponse>)
        .then((data) => resolve(data))
        .catch((err) => {
          console.error(err);
          return reject(null);
        });
    });
  })
);

const channelExtConfigObservable = Rx.from(
  new Promise((resolve, reject) => {
    // https://api.twitch.tv/extensions/<client ID>/configurations/channels/<channel ID>
    authObservable.subscribe((auth) => {
      return fetch(`/extensions/${auth.clientId}/configurations/channels/${auth.channelId}`, {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${auth.token}`,
          "client-id": auth.clientId,
          "content-type": "application/json"
        }
      })
        .then((response) => response.json())
        .then((data) => resolve(data))
        .catch((err) => {
          console.error(err);
          return reject(null);
        });
    });
  })
);

const defaultState = {
  frameFullvideo: false,
  frameMobile: false,
  frameConfig: false,
  framePanel: false,
  frameLive: false,
  contextGame: "",
  configBroadcaster: null as ConfigBroadcaster | null
};

export type AppEnv = typeof defaultState;
export type PartialAppEnv = Partial<AppEnv>;

export const createAppEnvContextState = (overrides: PartialAppEnv): AppEnv => ({
  ...defaultState,
  ...overrides
});

const AppEnvContext = React.createContext(defaultState);

export type ConfigBroadcaster = {
  positionX: number;
  positionY: number;
};
const getBroadcasterConfig = (config: RawConfigResponse) =>
  Object.entries(config).find(([, value]) => value.segment.segment_type === "broadcaster");
const numberOrDefault = (something: any, def: number) => (isNaN(something) ? def : Number(something));
const getAndParseBroadcasterConfig = (config: RawConfigResponse): ConfigBroadcaster => {
  const broadcasterConfigEntry = getBroadcasterConfig(config);
  if (broadcasterConfigEntry) {
    const [, broadcasterConfig] = broadcasterConfigEntry;
    const content = broadcasterConfig.record.content;
    const readArr = content.split("|");

    return {
      positionX: numberOrDefault(readArr[0], 5),
      positionY: numberOrDefault(readArr[1], 5)
    };
  }
  return {
    positionX: 5,
    positionY: 5
  };
};

export function createWrappedProvider(overrides: PartialAppEnv) {
  return function WrappedProvider({ children }: PropsWithChildren<Record<string, any>>): JSX.Element {
    const initialState = createAppEnvContextState(overrides);
    const [state, setState] = React.useState(initialState);
    React.useEffect(() => {
      channelInfoObservable.subscribe((channelInfo) => {
        setState((_oldState) => ({ ..._oldState, contextGame: channelInfo.game }));
      });

      channelExtConfigObservable.subscribe((configData) => {
        console.log("Config data", configData);
        // TODO - check if configData is RawConfigResponse or an Error
        const configBroadcaster = getAndParseBroadcasterConfig(configData as RawConfigResponse);
        setState((_oldState) => ({ ..._oldState, configBroadcaster }));
      });
    }, []);

    return <AppEnvContext.Provider value={state}>{children}</AppEnvContext.Provider>;
  };
}

export default AppEnvContext;
