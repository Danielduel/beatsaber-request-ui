import React, { PropsWithChildren } from "react";
import * as Rx from "rxjs";
import { wrapTwitchApiEndoint, UNRANKED } from "./constants";
import { AuthResponse } from "./types/AuthResponse.d";
import { ChannelInfoResponse } from "./types/ChannelInfoResponse";
import { RankedListResponse } from "./types/RankedListResponse";
import { RawConfigResponse } from "./types/RawConfigResponse";

const rankedObservable: Rx.Observable<RankedListResponse> = Rx.from(
  new Promise<RankedListResponse>((resolve, reject) =>
    // fetch("https://scoresaber.com/api.php?function=get-leaderboards&cat=1&limit=9999&ranked=1&page=1")
    // scoresaber has cors policy on this resource, loading that dynamically per version
    import("./types/RankedListResponseMock.json")
      .then((data) => resolve(data as RankedListResponse))
      .catch((err) => {
        console.error(err);
        reject(err);
      })
  )
);

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
      return fetch(wrapTwitchApiEndoint(`/kraken/channels/${auth.channelId}`), {
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
      return fetch(wrapTwitchApiEndoint(`/extensions/${auth.clientId}/configurations/channels/${auth.channelId}`), {
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

const configurationConfigObservable = Rx.from(
  new Promise((resolve, reject) => {
    Twitch.ext.configuration.onChanged(() => {
      return resolve(Twitch.ext.configuration.broadcaster?.content);
    });
  })
);

export type RankedRecordMap = Record<string, any>;
const defaultState = {
  frameFullvideo: false,
  frameMobile: false,
  frameConfig: false,
  framePanel: false,
  frameLive: false,
  rankedHashes: {} as RankedRecordMap,
  contextGame: "",
  configBroadcaster: null as ConfigBroadcaster | null
};

const transformRankedResponse = (response: RankedListResponse): RankedRecordMap => {
  const intermediateData = response.songs
    .filter((song) => !UNRANKED.includes(song.uid))
    .map((song) => ({ hash: song.id }));

  return intermediateData.reduce(
    (result, item) => ({
      ...result,
      [item.hash.toLowerCase()]: {}
    }),
    {}
  );
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
const defaultBroadcasterConfig: ConfigBroadcaster = {
  positionX: 5,
  positionY: 5
};
const getAndParseBroadcasterConfig = (config: RawConfigResponse): ConfigBroadcaster => {
  const broadcasterConfigEntry = getBroadcasterConfig(config);
  if (broadcasterConfigEntry) {
    const [, broadcasterConfig] = broadcasterConfigEntry;
    const content = broadcasterConfig.record.content;
    const readArr = content.split("|");

    return {
      positionX: numberOrDefault(readArr[0], defaultBroadcasterConfig.positionX),
      positionY: numberOrDefault(readArr[1], defaultBroadcasterConfig.positionY)
    };
  }
  return defaultBroadcasterConfig;
};

export function createWrappedProvider(overrides: PartialAppEnv) {
  const initialState = createAppEnvContextState(overrides);
  type SetConfigState = React.Dispatch<React.SetStateAction<typeof initialState>>;
  const configDataSubscribe = (setState: SetConfigState) => (configData: any) => {
    if (!configData) return;
    // TODO - check if configData is RawConfigResponse or an Error
    const configBroadcaster = getAndParseBroadcasterConfig(configData as RawConfigResponse);
    if (!configBroadcaster) {
      // bad config -> set default
      setState((_oldState) => ({ ..._oldState, configBroadcaster: defaultBroadcasterConfig }));
    }
    setState((_oldState) => ({ ..._oldState, configBroadcaster }));
  }

  return function WrappedProvider({ children }: PropsWithChildren<Record<string, any>>): JSX.Element {
    const [state, setState] = React.useState(initialState);
    React.useEffect(() => {
      channelExtConfigObservable.subscribe(configDataSubscribe(setState));
      configurationConfigObservable.subscribe(configDataSubscribe(setState));
      channelInfoObservable.subscribe((channelInfo) => {
        setState((_oldState) => ({ ..._oldState, contextGame: channelInfo.game }));
      });

      rankedObservable.subscribe((rankedData) => {
        const rankedHashes = transformRankedResponse(rankedData);
        if (!rankedHashes) return;
        setState((_oldState) => ({ ..._oldState, rankedHashes }));
      });
    }, []);

    return <AppEnvContext.Provider value={state}>{children}</AppEnvContext.Provider>;
  };
}

export default AppEnvContext;
