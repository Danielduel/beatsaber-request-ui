import React, { ChangeEvent } from "react";
import styled, { css } from "styled-components";
import { ButtonLink } from "../../../components/Buttons/Button";
import { ScoreSaberBar } from "../../../components/ScoreSaberBar/ScoreSaberBar";
import { ConfigContext } from "../BroadcasterConfigPage";
import { colors, LinkLogo } from "../components";
import scoreSaberLogo from "./ss-logo.svg";

type ToggleProps = {
  toggled?: boolean;
};
const toggledStyles = ({toggled}: ToggleProps) => toggled
  ? css`
    background-color: ${colors.light};
    &:after {
      background-color: ${colors.accent};
      right: 0;
    }
  `
  : css`
    background-color: ${colors.shade};
    &:after {
      background-color: ${colors.dark};
      left: 0;
    }
  `;
const Toggle = styled.div`
display: inline-block;
transform: translateY(0.5rem);
  &:after {
    top: 0;
    border-radius: 50%;
    position: absolute;
    height: 1.5rem;
    width: 1.5rem;
    margin-top: 0.05rem;
    content: " ";
    transition: background-color 0.25s linear;
  }
  position: relative;
  width: 2.5rem;
  height: 1.8rem;
  border-radius: 1rem;
  box-sizing: border-box;
  border: 0.125rem solid ${colors.darker};
  transition: background-color 0.25s linear;

  ${toggledStyles}
`;

const ScoreSaberWrapper = styled.div`
  color: ${colors.light};
  margin: 1rem;
`;

const BarContainer = styled.div`
  width: 500px;
  background-color: ${colors.darker};
`;

const ScoreSaberInput = styled.input`
  width: 30rem;
  border-radius: 1rem 1rem 0 0 ;
`;

const ScoreSaberDetails = () => {
  const {scoreSaberId, setScoreSaberId} = React.useContext(ConfigContext);

  const scoreSaberLinkOnChange = React.useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const link = e.target.value;
      const splitLink = link.split("/");
      const id = splitLink.find((part) => Number(part));
      if (!id) {
        e.target.value = "";
      } else {
        setScoreSaberId(id);
      }
    },
    [setScoreSaberId]
  );

  return (
    <>
      <br />
      <br />
      Please find yourself on ScoreSaber rankings, go into your profile and copy-paste the url to your profile
      <br />
      <br />
      <ButtonLink href="https://scoresaber.com/rankings" target="_blank">
      <LinkLogo src={scoreSaberLogo} />
      &nbsp; Go to ScoreSaber ranking search
      </ButtonLink>
      <br />
      <br />
      Paste the link to the field below
      <br />
      <br />
      <ScoreSaberInput onChange={scoreSaberLinkOnChange} />
      <BarContainer>
        <ScoreSaberBar scoreSaberId={scoreSaberId} withoutReload />
      </BarContainer>
    </>
  );
}

export const ScoreSaberConfig = () => {
  const { scoreSaberEnabled, setScoreSaberEnabled } = React.useContext(ConfigContext);

  const toggleOnClick = React.useCallback(() => {
    setScoreSaberEnabled(!scoreSaberEnabled)
  }, [ setScoreSaberEnabled, scoreSaberEnabled ])

  return (
    <ScoreSaberWrapper>
      ScoreSaber bar shows your current ranking at the bottom of the widget.<br />
      It looks like this:

      <br />
      <br />

      <BarContainer>
        <ScoreSaberBar scoreSaberId="76561198023909718" />
      </BarContainer>

      Do you want to enable ScoreSaber bar? <Toggle onClick={toggleOnClick} toggled={scoreSaberEnabled} />

      { scoreSaberEnabled && <ScoreSaberDetails />}
    </ScoreSaberWrapper>
  );
};

