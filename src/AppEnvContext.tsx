import React from "react";

const defaultState = {
  frameFullvideo: false,
  frameMobile: false,
  frameConfig: false,
  framePanel: false,
  frameLive: false
};

export type AppEnv = typeof defaultState;
export type PartialAppEnv = Partial<AppEnv>;

export const createAppEnvContextState = (overrides: PartialAppEnv) => ({
  ...defaultState,
  ...overrides
});

const AppEnvContext = React.createContext(defaultState);

export default AppEnvContext;
