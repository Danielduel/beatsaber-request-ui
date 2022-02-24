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

    useStreamSubscribe(twitchChannelInfo$, (channelInfo) => {
      setState((_oldState) => ({ ..._oldState, contextGame: channelInfo.game }));
    });

    useStreamSubscribe(rankedData$, (rankedData) => {
      console.log("got ranked data");
      const rankedHashes = transformRankedResponse(rankedData);
      setState((_oldState) => ({ ..._oldState, rankedHashes }));
    });

    useStreamSubscribe(twitchExtConfiguration$, (configuration) => {
      console.log(configuration);
      setState((_oldState) => ({ ..._oldState, configuration }));
    });

    return <AppEnvContext.Provider value={state}>{children}</AppEnvContext.Provider>;
  };
}

export default AppEnvContext;
