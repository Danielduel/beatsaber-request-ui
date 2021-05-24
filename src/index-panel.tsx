import React from "react";
import ReactDOM from "react-dom";
import { PanelApp } from "./App";
import "./index.css";
import * as serviceWorker from "./serviceWorker";
import AppEnvContext, { createAppEnvContextState } from "./AppEnvContext";

const appEnvContextState = createAppEnvContextState({
  framePanel: true
});

ReactDOM.render(
  <React.StrictMode>
    <AppEnvContext.Provider value={appEnvContextState}>
      <PanelApp />
    </AppEnvContext.Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
