import React, { PropsWithChildren } from "react";
import { from, Observable } from "rxjs";
import { AuthResponse } from "./types/AuthResponse.d";
import { ChannelInfoResponse } from "./types/ChannelInfoResponse";
declare let Twitch: any;

const authObservable: Observable<AuthResponse> = from(
  new Promise<AuthResponse>((resolve) =>
    Twitch.ext.onAuthorized((auth: AuthResponse) => {
      resolve(auth);
    })
  )
);

const channelInfoObservable = from(
  new Promise<ChannelInfoResponse>((resolve, reject) => {
    authObservable.forEach((auth) => {
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

const defaultState = {
  frameFullvideo: false,
  frameMobile: false,
  frameConfig: false,
  framePanel: false,
  frameLive: false,
  contextGame: ""
};

export type AppEnv = typeof defaultState;
export type PartialAppEnv = Partial<AppEnv>;

export const createAppEnvContextState = (overrides: PartialAppEnv): AppEnv => ({
  ...defaultState,
  ...overrides
});

const AppEnvContext = React.createContext(defaultState);

export function createWrappedProvider(overrides: PartialAppEnv) {
  return function WrappedProvider({ children }: PropsWithChildren<Record<string, any>>): JSX.Element {
    const initialState = createAppEnvContextState(overrides);
    const [state, setState] = React.useState(initialState);
    React.useEffect(() => {
      channelInfoObservable.subscribe((channelInfo) => {
        setState((_oldState) => ({ ..._oldState, contextGame: channelInfo.game }));
      });
    }, []);

    return <AppEnvContext.Provider value={state}>{children}</AppEnvContext.Provider>;
  };
}

export default AppEnvContext;
