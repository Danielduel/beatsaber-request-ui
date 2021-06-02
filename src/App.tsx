declare let Twitch: any;

import React, { useCallback } from "react";
import { Translation } from "react-i18next";
import styled from "styled-components";
import { MemoryRouter as Router, Switch, Route, Link } from "react-router-dom";

import "./App.css";
import "./SearchPage/SearchPage.css";

import MagnifyingGlassIcon from "./common/icons/MagnifyingGlassIcon";
import InfoIcon from "./common/icons/InfoIcon";
import Header from "./Header/Header";
import SearchPage from "./SearchPage/SearchPage";
import InfoPage from "./InfoPage/InfoPage";

import "./i18n/init-i18n";

const AppWrapper = styled.div`
  transition: margin-left 1s;

  height: 100vh;
  width: min(100vw, 500px);
  overflow-x: hidden;
  position: relative;

  grid-template-rows: 52px 1fr;

  display: grid;
`;

const AppPageContainer = styled.div`
  background-color: var(--background);
`;

const AppUnexpandedWrapper = styled.div`
  background: #5f2c82;

  animation-name: initialBubbleAnimation;
  animation-duration: 1s;

  position: fixed;
  width: 30px;
  height: 30px;

  transform: translate(-50%, -50%);
  border-radius: 50%;
  border: 4px solid #210633;

  margin: calc(5rem + 35px);

  transition: all 0.3s ease-in-out;

  &:hover {
    height: 70px;
    width: 70px;
  }

  &:hover > div {
    visibility: visible;
    opacity: 1;
  }
`;

const AppUnexpandedTooltip = styled.div`
  width: 200px;
  position: relative;
  top: 50%;
  left: 50%;
  opacity: 0;
  transition: opacity 0.3s ease-in-out;
  background: rgba(255, 255, 255, 0.5);
  padding: 15px 20px;
  animation-name: initialBubbleTooltipAnimation;
  animation-duration: 4s;

  &:before {
    height: 30px;
    width: 5px;
    background: black;
    position: absolute;
    top: 0;
    left: 0;
    content: " ";
  }
  &:after {
    height: 5px;
    width: 30px;
    background: black;
    position: absolute;
    top: 0;
    left: 0;
    content: " ";
  }
`;

const HeaderLinkWrapper = styled.div`
  margin-left: 15px;
  border: 0px solid transparent;
  background-color: #fff;
  box-sizing: border-box;
  width: 45px;
  height: 35px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 20px;
  padding-top: 4px;
`;

type MainAppProps = {
  togglePanel: ((state: boolean) => void) | null;
};

const MainApp = ({ togglePanel }: MainAppProps): JSX.Element => {
  return (
    <Router>
      <AppWrapper>
        <Header togglePanel={togglePanel}>
          <HeaderLinkWrapper>
            <Link to="/">
              <MagnifyingGlassIcon />
            </Link>
          </HeaderLinkWrapper>
          <HeaderLinkWrapper>
            <Link to="/info">
              <InfoIcon />
            </Link>
          </HeaderLinkWrapper>
        </Header>
        <AppPageContainer>
          <Switch>
            <Route exact path="/">
              <SearchPage />
            </Route>
            <Route path="/info">
              <InfoPage />
            </Route>
          </Switch>
        </AppPageContainer>
      </AppWrapper>
    </Router>
  );
};

export function FullVideoApp(): JSX.Element {
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

  return (
    <AppUnexpandedWrapper onClick={() => togglePanel(true)}>
      <AppUnexpandedTooltip>
        <Translation>{(t) => t("Click to open an extension")}</Translation>
        <br />
        <Translation>{(t) => t("this should make it easier to make requests")}</Translation>
      </AppUnexpandedTooltip>
    </AppUnexpandedWrapper>
  );
}

export function MobileApp(): JSX.Element {
  return <MainApp togglePanel={null} />;
}

export function PanelApp(): JSX.Element {
  return <MainApp togglePanel={null} />;
}
