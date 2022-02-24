import React from "react";
import styled from "styled-components";
import { head, intersperse, tail } from "ramda";
import LanguageSelector from "../../components/LanguageSelector/LanguageSelector";
import { GithubLogo } from "./GithubLogo";
import { ReportIcon } from "./ReportIcon";
import { VersionIcon } from "./VersionIcon";
import { ResearchIcon } from "./ResearchIcon";
import { TranslationIcon } from "./TranslationIcon";
import { wrapWithLi } from "../../common/utils/wrapWith";
import { decapitateMapTail } from "../../common/utils/decapitate";

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

const _LinkWrapper = styled.a`
  max-width: 200px;
  text-overflow: ellipsis;
  overflow: hidden;
`;
const Link = ({ href, text }: { href: string; text: string }) => {
  return (
    <_LinkWrapper target="_blank" href={href}>
      {text}
    </_LinkWrapper>
  );
};
const link = (text: string, href: string) => <Link text={text} href={href} />;

const ul = (rows: React.ReactNode[][]) => {
  return <ul>{rows.map(decapitateMapTail(wrapWithLi))}</ul>;
};

const infoRows: React.ReactNode[][] = [
  [<VersionIcon key="icon" />, "Version: 0.0.10 (very alpha)"],
  [
    <ReportIcon key="icon" />,
    "You can post issues or feature requests here:",
    link("Link to GH issues", "https://github.com/Duelsik/beatsaber-request-ui/issues")
  ],
  [
    <GithubLogo key="icon" />,
    "This extension is opensource!",
    link("Link to repository", "https://github.com/Duelsik/beatsaber-request-ui")
  ],
  [
    <TranslationIcon key="icon" />,
    "If you want to help with translations - feel free to create an issue on github to get in touch"
  ],
  [
    <ResearchIcon key="icon" />,
    "This project uses 3rd party resources:",
    ul([
      [
        "Other projects:",
        link("BeatSaver (BS Map service)", "https://beatsaver.com/"),
        link("ScoreSaber (BS Score service)", "https://scoresaber.com/"),
        link("BeatFollower (BS playlist manager and sm)", "https://www.beatfollower.com/")
      ],
      [
        "Graphics:",
        link("Github logo icon", "https://www.flaticon.com/free-icon/github-logo_25231"),
        link("Report icon", "https://icon-icons.com/icon/message-report/151198"),
        link("Version icon", "https://www.iconfinder.com/icons/3209198/episode_event_front_statement_version_icon"),
        link("Translation icon", "https://www.flaticon.com/free-icon/translation_2793765"),
        link("This icon to the left", "https://www.flaticon.com/free-icon/research_2271541"),
        link("Copy icon", "https://www.flaticon.com/free-icon/copy_2911213"),
        link("Loading animation", "https://loading.io/"),
        link(
          "Exclamation mark icon",
          "https://www.kindpng.com/imgv/iixoxmh_black-exclamation-mark-png-transparent-png/"
        ),
        link(
          "Question mark icon",
          "https://www.pngarea.com/view/e5f64df6_question-mark-png-question-mark-free-icon-png/"
        ),
        link("Gif used on configuration page", "https://i.giphy.com/media/obN7DdnUWxuyqz5qZS/giphy.webp")
      ]
    ])
  ]
];

const renderInfoRowArr = (infoRowItemArr: React.ReactNode[]): JSX.Element => {
  const icon = head(infoRowItemArr);
  const content = tail(infoRowItemArr);
  return (
    <InfoRow>
      <InfoIconWrapper>{icon}</InfoIconWrapper>
      <span>{intersperse(<br />, content)}</span>
    </InfoRow>
  );
};

const InfoPageContent = () => {
  return (
    <InfoPageWrapper>
      <LanguageSelector />
      {infoRows.map(renderInfoRowArr)}
    </InfoPageWrapper>
  );
};

export default function InfoPage(): JSX.Element {
  return <InfoPageContent />;
}
