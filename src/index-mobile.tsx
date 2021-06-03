import React from "react";
import ReactDOM from "react-dom";
import { MobileApp } from "./App";
import "./index.css";
import * as serviceWorker from "./serviceWorker";
import { createWrappedProvider } from "./AppEnvContext";

const WrappedProvider = createWrappedProvider({
  frameMobile: true
});

ReactDOM.render(
  <React.StrictMode>
    <WrappedProvider>
      <MobileApp />
    </WrappedProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
