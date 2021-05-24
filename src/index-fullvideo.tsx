import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { FullVideoApp } from "./App";
import * as serviceWorker from "./serviceWorker";
import AppEnvContext, { createAppEnvContextState } from "./AppEnvContext";

const appEnvContextState = createAppEnvContextState({
  frameFullvideo: true
});

ReactDOM.render(
  <React.StrictMode>
    <AppEnvContext.Provider value={appEnvContextState}>
      <FullVideoApp />
    </AppEnvContext.Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
