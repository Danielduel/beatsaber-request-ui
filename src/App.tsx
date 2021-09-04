import React, { useCallback } from "react";
import { Translation } from "react-i18next";
import styled from "styled-components";
import { MemoryRouter as Router, Switch, Route } from "react-router-dom";

import "./App.css";

import Header from "./components/Header/Header";
import SearchPage from "./pages/SearchPage/SearchPage";
import InfoPage from "./pages/InfoPage/InfoPage";
import BeatfollowerPage from "./pages/BeatfollowerPage/BeatfollowerPage";

import "./i18n/init-i18n";
import { ConfigBroadcaster } from "./AppEnvContext";
import { BodyWithNavigation, BodyWithNavigationBody } from "./layouts/BodyWithNavigation";
import { UnexpandedApp } from "./components/UnexpandedApp/UnexpandedApp";

const AppWrapper = styled.div`
  transition: margin-left 1s;
  height: 100vh;
  width: min(100vw, 500px);
  overflow-x: hidden;
  position: relative;
`;

type MainAppProps = {
  togglePanel: ((state: boolean) => void) | null;
};

const Navigation = ({ togglePanel }: Pick<MainAppProps, "togglePanel">) => {
  return <Header togglePanel={togglePanel}></Header>;
};

const Routing = () => (
  <BodyWithNavigationBody>
    <Switch>
      <Route exact path="/">
        <SearchPage />
      </Route>
      <Route path="/beatfollower">
        <BeatfollowerPage />
      </Route>
      <Route path="/info">
        <InfoPage />
      </Route>
    </Switch>
  </BodyWithNavigationBody>
);

const MainApp = ({ togglePanel }: MainAppProps): JSX.Element => {
  return (
    <Router>
      <AppWrapper>
        <BodyWithNavigation>
          <Navigation togglePanel={togglePanel} />
          <Routing />
        </BodyWithNavigation>
      </AppWrapper>
    </Router>
  );
};

export function FullVideoApp({ configBroadcaster }: { configBroadcaster: ConfigBroadcaster }): JSX.Element {
  const [isExpanded, setExpanded] = React.useState(false);
  const togglePanel = useCallback(
    (state: boolean) => {
      setExpanded(state);
    },
    [setExpanded]
  );

  if (isExpanded) {
    return <MainApp togglePanel={togglePanel} />;
  }

  return <UnexpandedApp togglePanel={togglePanel} />;
}

export function MobileApp(): JSX.Element {
  return <MainApp togglePanel={null} />;
}

export function PanelApp(): JSX.Element {
  return <MainApp togglePanel={null} />;
}
