import React from "react";
import ReactDOM from "react-dom";
import BroadcasterConfigPage from "./BroadcasterConfigPage/BroadcasterConfigPage";
import * as serviceWorker from "./serviceWorker";
import { createWrappedProvider } from "./AppEnvContext";

const WrappedProvider = createWrappedProvider({
  frameConfig: true
});

ReactDOM.render(
  <React.StrictMode>
    <WrappedProvider>
      <BroadcasterConfigPage />
    </WrappedProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
