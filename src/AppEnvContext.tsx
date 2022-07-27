import React, { PropsWithChildren } from "react";
import { isLocalhost } from "./constants";
import {
  RankedRecordMap,
  scoreSaberImportRankedMapsData,
  transformRankedResponse
} from "./integrations/scoresaber/scoreSaberImportRankedMapsData";
import { useRefetchingData } from "./common/hooks/useRefetchingData";
import { useTwitchExtOnAuthorized } from "./common/hooks/useTwitchExtOnAuthorized";
import { useTwitchChannelInfo } from "./common/hooks/useTwitchChannelInfo";
import { useStreamSubscribe } from "./common/hooks/useStreamSubscribe";
import { useTwitchExtConfigurationOnChanged } from "./common/hooks/useTwitchExtConfigurationOnChanged";
import { AppConfiguration } from "./common/config/AppConfiguration";

const defaultState = {
  frameFullvideo: false,
  frameMobile: false,
  frameConfig: false,
  framePanel: false,
  frameLive: false,
  srmBridgeChannel: null as string | null,
  userId: null as string | null,
  rankedHashes: {} as RankedRecordMap,
  contextGame: isLocalhost ? "Beat Saber" : "",
  configuration: null as AppConfiguration | null
};

export type AppEnv = typeof defaultState;
export type PartialAppEnv = Partial<AppEnv>;

export const createAppEnvContextState = (overrides: PartialAppEnv): AppEnv => ({
  ...defaultState,
  ...overrides
});

const AppEnvContext = React.createContext(defaultState);

export function createWrappedProvider(overrides: PartialAppEnv) {
  const initialState = createAppEnvContextState(overrides);

  return function WrappedProvider({ children }: PropsWithChildren<Record<string, any>>): JSX.Element {
    const [twitchExtAuth$] = useTwitchExtOnAuthorized();
    const [twitchChannelInfo$] = useTwitchChannelInfo(twitchExtAuth$);
    const [state, setState] = React.useState(initialState);
    const [rankedData$] = useRefetchingData(scoreSaberImportRankedMapsData);
    const [twitchExtConfiguration$] = useTwitchExtConfigurationOnChanged();

    useStreamSubscribe(twitchExtAuth$, (auth) => {
      setState((_oldState) => ({ ..._oldState, srmBridgeChannel: auth.channelId, userId: auth.userId }));
    });

    useStreamSubscribe(twitchChannelInfo$, (channelInfo) => {
      console.log("channelInfo", channelInfo);
      // defensive code, not sure how stable this api is
      if (channelInfo && channelInfo.data && channelInfo.data[0] && channelInfo.data[0].game_name) {
        setState((_oldState) => ({ ..._oldState, contextGame: channelInfo.data[0].game_name }));
      }
    });

    useStreamSubscribe(rankedData$, (rankedData) => {
      const rankedHashes = transformRankedResponse(rankedData);
      setState((_oldState) => ({ ..._oldState, rankedHashes }));
    });

    useStreamSubscribe(twitchExtConfiguration$, (configuration) => {
      setState((_oldState) => ({ ..._oldState, configuration }));
    });

    return <AppEnvContext.Provider value={state}>{children}</AppEnvContext.Provider>;
  };
}

export default AppEnvContext;
