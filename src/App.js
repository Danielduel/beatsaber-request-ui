import React from 'react';
import styled from 'styled-components';
import {
  MemoryRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import './App.css';
import './SearchPage/SearchPage.css';

import MagnifyingGlassIcon from "./common/icons/MagnifyingGlassIcon";
import InfoIcon from "./common/icons/InfoIcon";
import Header from './Header/Header';
import SearchPage from './SearchPage/SearchPage';
import InfoPage from "./InfoPage/InfoPage";

const AppWrapper = styled.div`
  transition: margin-left 1s;

  height: 100vh;
  width: 500px;

  grid-template-rows: 52px 1fr;

  display: grid;
`;

const AppPageContainer = styled.div`
  background-color: var(--background);
`;

const AppUnexpandedWrapper = styled.div`
  opacity: 1;
  background: #5f2c82;
  background: -webkit-linear-gradient(to right, #5f2c82, transparent);
  background: linear-gradient(to right, #5f2c82, transparent);

  position: fixed;
  width: 70px;
  top: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  
  transition: opacity .8s ease-in-out;

  &:not(:hover) {
    opacity: 0;
  }
`;

const AppUnexpandedChevron = styled.i`
  position: relative;
  display: block;
  transform: rotateZ(-90deg);
  height: 100px; /*height should be double border*/
  width: 100px;
  margin-top: -40px;

  &::before,
  &::after {
    position: absolute;
    display: block;
    content: "";
    border: 50px solid transparent; /*adjust size*/
  }

  /*Change the four instances of 'top' below to rotate (top/right/bottom/left)*/
  &::before {
    top: 5px;
    border-top-color: #fff; /* Chevron Color*/
  }
  &::after {
    top: -5px; /*adjust thickness*/
    border-top-color: #5f2c82; /*Match background colour*/
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

function App() {
  const [ isExpanded, setExpanded ] = React.useState(true);

  if (isExpanded) {
    return (
      <Router>
        <AppWrapper>
          <Header hidePanel={() => setExpanded(false)}>
            <HeaderLinkWrapper><Link to="/"><MagnifyingGlassIcon /></Link></HeaderLinkWrapper>
            <HeaderLinkWrapper><Link to="/info"><InfoIcon /></Link></HeaderLinkWrapper>
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
  }

  return (
    <AppUnexpandedWrapper
      onClick={() => setExpanded(true)}
    >
      <AppUnexpandedChevron />
    </AppUnexpandedWrapper>
  )
}


export default App;
