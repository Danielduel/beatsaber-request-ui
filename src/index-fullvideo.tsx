import React from "react";
import ReactDOM from "react-dom";
import { FullVideoApp } from "./App";
import * as serviceWorker from "./serviceWorker";
import AppEnvContext, { ConfigBroadcaster, createWrappedProvider } from "./AppEnvContext";

const WrappedProvider = createWrappedProvider({
  frameFullvideo: true
});

ReactDOM.render(
  <React.StrictMode>
    <WrappedProvider>
      <AppEnvContext.Consumer>
        {(context) => {
          console.log(`[BSR UI] Detected game ${context.contextGame}`);
          console.log(`[BSR UI] Got config ${JSON.stringify(context.configBroadcaster)}`);
          const shouldRender = context.contextGame === "Beat Saber" && context.configBroadcaster;
          return shouldRender ? (
            <FullVideoApp configBroadcaster={context.configBroadcaster as ConfigBroadcaster} />
          ) : null;
        }}
      </AppEnvContext.Consumer>
    </WrappedProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
