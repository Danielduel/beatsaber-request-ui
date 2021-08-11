import React from "react";
import styled from "styled-components";
import LanguageSelector from "../../components/LanguageSelector/LanguageSelector";
import { GithubLogo } from "./GithubLogo";
import { ReportIcon } from "./ReportIcon";
import { VersionIcon } from "./VersionIcon";
import { ResearchIcon } from "./ResearchIcon";
import { TranslationIcon } from "./TranslationIcon";

const InfoPageWrapper = styled.div`
  display: flex;
  align-items: center;
  padding: 20px 10px;
  flex-direction: column;
`;

const InfoIconWrapper = styled.span`
  padding: 5px;
  & > svg {
    width: 40px;
    height: 40px;
  }
`;

const InfoRow = styled.div`
  width: 100%;
  padding: 5px;
  display: grid;
  grid-template-columns: 60px 1fr;
`;

const LinkWrapper = styled.a`
  max-width: 200px;
  text-overflow: ellipsis;
  overflow: hidden;
`;

const InfoPageContent = () => (
  <InfoPageWrapper>
    <LanguageSelector />
    <InfoRow>
      <InfoIconWrapper>
        <VersionIcon />
      </InfoIconWrapper>
      Version: 0.0.7 (very alpha)
    </InfoRow>
    <InfoRow>
      <InfoIconWrapper>
        <ReportIcon />
      </InfoIconWrapper>
      <span>
        You can post issues or feature requests here:
        <br />
        <LinkWrapper href="https://github.com/Duelsik/beatsaber-request-ui/issues">Link to GH issues</LinkWrapper>
      </span>
    </InfoRow>
    <InfoRow>
      <InfoIconWrapper>
        <GithubLogo />
      </InfoIconWrapper>
      <span>
        This extension is opensource!
        <br />
        <LinkWrapper href="https://github.com/Duelsik/beatsaber-request-ui">Link to repository</LinkWrapper>
      </span>
    </InfoRow>
    <InfoRow>
      <InfoIconWrapper>
        <TranslationIcon />
      </InfoIconWrapper>
      If you want to help with translations - feel free to create an issue on github to get in touch
    </InfoRow>
    <InfoRow>
      <InfoIconWrapper>
        <ResearchIcon />
      </InfoIconWrapper>
      <div>
        This project uses 3rd party resources:
        <br />
        <ul>
          Other projects:
          <li>
            <LinkWrapper href="https://beatsaver.com/">BeatSaver (BS Map service)</LinkWrapper>
          </li>
          <li>
            <LinkWrapper href="https://scoresaber.com/">ScoreSaber (BS Score service)</LinkWrapper>
          </li>
          <li>
            <LinkWrapper href="https://www.beatfollower.com/">BeatFollower (BS playlist manager and sm)</LinkWrapper>
          </li>
          Graphics:
          <li>
            <LinkWrapper href="https://www.flaticon.com/free-icon/github-logo_25231">Github logo icon</LinkWrapper>
          </li>
          <li>
            <LinkWrapper href="https://icon-icons.com/icon/message-report/151198">Report icon</LinkWrapper>
          </li>
          <li>
            <LinkWrapper href="https://www.iconfinder.com/icons/3209198/episode_event_front_statement_version_icon">
              Version icon
            </LinkWrapper>
          </li>
          <li>
            <LinkWrapper href="https://www.flaticon.com/free-icon/translation_2793765">Translation icon</LinkWrapper>
          </li>
          <li>
            <LinkWrapper href="https://www.flaticon.com/free-icon/research_2271541">This icon to the left</LinkWrapper>
          </li>
          <li>
            <LinkWrapper href="https://www.flaticon.com/free-icon/copy_2911213">Copy icon</LinkWrapper>
          </li>
          <li>
            <LinkWrapper href="https://loading.io/">Loading animation</LinkWrapper>
          </li>
        </ul>
      </div>
    </InfoRow>
  </InfoPageWrapper>
);

export default function InfoPage(): JSX.Element {
  return <InfoPageContent />;
}
