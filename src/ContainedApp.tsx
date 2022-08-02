import React from "react";
import { MobileApp } from "./App";
import { createWrappedProvider } from "./AppEnvContext";

const WrappedProvider = createWrappedProvider({
  frameMobile: true
});

export const ContainedApp = (): JSX.Element => {
  return (
    <WrappedProvider>
      <MobileApp />
    </WrappedProvider>
  );
};
