import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { FullVideoApp } from "./App";
import * as serviceWorker from "./serviceWorker";
import AppEnvContext, { createWrappedProvider } from "./AppEnvContext";

const WrappedProvider = createWrappedProvider({
  frameFullvideo: true
});

ReactDOM.render(
  <React.StrictMode>
    <WrappedProvider>
      <AppEnvContext.Consumer>
        {(context) => {
          console.log(context.contextGame);
          return context.contextGame === "Beat Saber" ? <FullVideoApp /> : null;
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
