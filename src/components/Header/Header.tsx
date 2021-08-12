import React from "react";
import { Link, useLocation } from "react-router-dom";
import styled from "styled-components";
import InfoIcon from "../../common/icons/InfoIcon";
import { CloseButton } from "../Buttons/CloseButton";
import { LayoutRowPrimary } from "../LayoutRow/LayoutRow";

import beatfollowerLogo from "./static/beatfollower.png";
import beatsaverLogo from "./static/beatsaver.png";

const ChildrenContainer = styled.div`
  display: flex;
  box-sizing: border-box;
  overflow: hidden;
  margin: 8px 20px 0px 20px;
  align-items: center;
`;

const HeaderLinkWrapper = styled.span`
  border: 0px solid transparent;
  background-color: ${({ highcontrast, active }: { highcontrast?: boolean; active?: boolean }) =>
    highcontrast ? (active ? "var(--background-icon-pressed)" : "var(--background-icon-notpressed)") : "#fff"};
  box-sizing: border-box;
  width: 45px;
  min-width: 45px;
  height: 35px;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  border-radius: 20px;
  overflow: hidden;
`;

const NavigationImage = styled.img`
  width: ${({ small }: { small?: boolean }) => (small ? "20px" : "30px")};
  height: auto;
`;

const NavigationText = styled.div`
  display: inline-flex;
  box-sizing: border-box;
  overflow: hidden;
  width: ${({ active }: { active: boolean }) => (active ? "120px" : "0px")};

  margin-right: 10px;
  margin-left: 10px;
  color: white;
  font-size: 1.2rem;
  transition: width 0.1s linear;

  align-items: center;
  height: 100%;

  @media (max-width: 350px) {
    width: 0;
    margin-right: 0;
    margin-left: 0;
  }
`;

const NavigationLink = styled(Link)`
  display: inline-flex;
  justify-items: center;
  align-items: center;

  white-space: nowrap;
  flex-shrink: 1;
  width: ${({ active }: { active: boolean }) => (active ? "initial" : "60px")};

  @media (max-width: 350px) {
    width: 60px;
  }

  &,
  &:active,
  &:visited {
    color: white;
    text-decoration: none;
  }
`;

type HeaderLinkProps = {
  to: string;
  text: string;
  children: JSX.Element | JSX.Element[];
};
const HeaderLink = ({ children, to, text }: HeaderLinkProps) => {
  const location = useLocation();
  return (
    <NavigationLink to={to} active={location.pathname === to}>
      <HeaderLinkWrapper active={location.pathname === to} highcontrast>
        {children}
      </HeaderLinkWrapper>
      <NavigationText active={location.pathname === to}>{text}</NavigationText>
    </NavigationLink>
  );
};

type HeaderProps = {
  togglePanel: ((state: boolean) => void) | null;
  children?: JSX.Element | JSX.Element[];
};
const Header = ({ togglePanel, children }: HeaderProps): JSX.Element => {
  const handleClose = React.useCallback(() => {
    togglePanel && togglePanel(false);
  }, [togglePanel])

  return (
    <LayoutRowPrimary>
      <ChildrenContainer>
        <HeaderLink to="/" text="BeatSaver">
          <NavigationImage small src={beatsaverLogo} />
        </HeaderLink>
        <HeaderLink to="/beatfollower" text="BeatFollower">
          <NavigationImage src={beatfollowerLogo} />
        </HeaderLink>
        <HeaderLink to="/info" text="Settings">
          <InfoIcon />
        </HeaderLink>
        {children}
        {togglePanel && <CloseButton onClick={handleClose} />}
      </ChildrenContainer>
    </LayoutRowPrimary>
  );
};

export default Header;
