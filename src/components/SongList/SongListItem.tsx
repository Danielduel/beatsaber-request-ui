import React from "react";
import styled from "styled-components";
import { LayoutRowTall } from "../LayoutRow/LayoutRow";
import { SongListItemContext, useSongListItemContextState } from "./SongListItemContext";
import { SongListItemActions } from "./SongListItemActions";
import { SongListItemAvailableDifficulties } from "./SongListItemAvailableDifficulties";
import { SongListItemCoverImage, SongListItemCoverImageBackground } from "./SongListItemCoverImage";
import {
  SongListItemDetailsFullwidthItem,
  SongListItemDetailsSmallItem
} from "./SongListItemDetails/SongListItemDetailsCommon";
import { SongListItemDetailsWrapper } from "./SongListItemDetails/SongListItemDetailsWrapper";
import { Translation } from "react-i18next";
import { Button } from "../Buttons/Button";
import exclamation_mark from "./static/exclamation_mark.png";
import question_mark from "./static/question_mark.png";
import { GroupButton } from "../Buttons/GroupButton";

const SongListItemWrapper = styled(LayoutRowTall)`
  width: 100%;
  min-height: initial;
  padding: initial;
`;
type SongListItemContainerProps = {
  moveToLeft: boolean;
  isRanked: boolean;
};
const SongListItemContainer = styled(LayoutRowTall)`
  background-color: ${({ isRanked }: SongListItemContainerProps) =>
    isRanked ? "var(--background-secondary)" : "invalid-color"};
  border-bottom: 1px solid var(--border);
  transition: margin-left 0.3s linear;
  margin-left: ${({ moveToLeft }: SongListItemContainerProps) => (moveToLeft ? "-150px" : "")};
`;

type SongListItemInfoWrapperProps = {
  variant: "info" | "warn";
};
const SongListItemInfoWrapper = styled.div`
  position: absolute;
  right: 15px;
  width: 120px;
  height: 100%;
  box-sizing: border-box;
  padding: 0 5px;
  border-radius: 20px;
  overflow: hidden;

  background-color: ${({ variant }: SongListItemInfoWrapperProps) => {
    return (variant === "warn" && "var(--background-warn)") || (variant === "info" && "var(--background-info)");
  }};
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  text-align: center;
  font-size: 0.9rem;
  padding-top: 1px;
`;
const SongListItemInfoBgImage = styled.img`
  position: absolute;
  pointer-events: none;
  height: 100%;
  object-position: center;
  opacity: 0.05;
  transform: rotate(30deg);
`;

const SongListItemDetailsContainer = styled.div`
  display: flex;
  flex-direction: row;
  font-size: 10px;
  padding-top: 1px;
`;

const SongListItemCoverWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

type SongListItemProps = {
  hash: string;
  coverURL: string;
  songName: string;
  songAuthorName: string;
  levelAuthorName: string;
  bsrKey: string;
  downloads: number | null;
  upVotes: number | null;
  downVotes: number | null;
  percentVotes: number | null;
  isRanked: boolean;
  isQualified?: boolean;
};
type SongListItemDifficultyProps = {
  easy: boolean;
  normal: boolean;
  hard: boolean;
  expert: boolean;
  expertPlus: boolean;
};
const SongListItem = ({
  hash,
  coverURL,
  songName,
  songAuthorName,
  levelAuthorName,
  bsrKey,
  downloads,
  upVotes,
  downVotes,
  percentVotes,
  isRanked,
  isQualified,
  easy,
  normal,
  hard,
  expert,
  expertPlus
}: SongListItemProps & SongListItemDifficultyProps): JSX.Element => {
  const componentContextState = useSongListItemContextState();
  const { copied, setCopied, askForBeatsaverNavigation, setAskForBeatsaverNavigation } = componentContextState;
  const shouldMoveToLeft = copied || askForBeatsaverNavigation;
  const toggleAskForBeatsaverNavigation = React.useCallback(() => {
    setAskForBeatsaverNavigation(!askForBeatsaverNavigation);
  }, [askForBeatsaverNavigation, setAskForBeatsaverNavigation]);
  return (
    <SongListItemContext.Provider value={componentContextState}>
      <SongListItemWrapper>
        {copied && (
          <SongListItemInfoWrapper variant="warn">
            <SongListItemInfoBgImage src={exclamation_mark} />
            <Translation>{(t) => t("Paste on chat")}</Translation>
            <br />
            <Translation>{(t) => t("to make request")}</Translation>
            <Button onClick={() => setCopied(false)}>
              <Translation>{(t) => t("Done")}</Translation>
            </Button>
          </SongListItemInfoWrapper>
        )}
        {askForBeatsaverNavigation && (
          <SongListItemInfoWrapper variant="info">
            <SongListItemInfoBgImage src={question_mark} />
            <Translation>{(t) => t("Do you want to go to beatsaver page?")}</Translation>
            <GroupButton
              group={[
                {
                  onClick: () => setAskForBeatsaverNavigation(false),
                  text: "Close"
                },
                {
                  onClick: () => {},
                  text: "Go!",
                  href: `https://beatsaver.com/maps/${bsrKey}`
                }
              ]}
            />
          </SongListItemInfoWrapper>
        )}
        <SongListItemContainer key={hash} isRanked={isRanked} moveToLeft={shouldMoveToLeft}>
          <SongListItemCoverImageBackground coverURL={coverURL} />
          <SongListItemDetailsContainer>
            <SongListItemCoverWrapper>
              <SongListItemCoverImage coverURL={coverURL} />
              <SongListItemAvailableDifficulties
                easy={easy}
                normal={normal}
                hard={hard}
                expert={expert}
                expertPlus={expertPlus}
              />
            </SongListItemCoverWrapper>
            <SongListItemDetailsWrapper>
              <SongListItemDetailsFullwidthItem
                variant="title"
                data={songName}
                suffix=""
                onClick={toggleAskForBeatsaverNavigation}
              />
              <SongListItemDetailsFullwidthItem variant="subtitle" data={songAuthorName} suffix="" />
              <SongListItemDetailsFullwidthItem variant="subtitle" data={levelAuthorName} suffix="" />
              <SongListItemDetailsSmallItem variant="item" data={bsrKey} suffix="🔑" />
              <SongListItemDetailsSmallItem variant="item" data={downloads} suffix="💾" />
              <SongListItemDetailsSmallItem variant="item" data={percentVotes} suffix="💯" />
              <SongListItemDetailsSmallItem variant="item" data={upVotes} suffix="👍" />
              <SongListItemDetailsSmallItem variant="item" data={downVotes} suffix="👎" />
              <SongListItemDetailsSmallItem
                variant="item"
                data={(isRanked && "Ranked") || (isQualified && "Qualified") || null}
                suffix="⭐"
              />
              <SongListItemActions bsrKey={bsrKey} isRanked={isRanked} />
            </SongListItemDetailsWrapper>
          </SongListItemDetailsContainer>
        </SongListItemContainer>
      </SongListItemWrapper>
    </SongListItemContext.Provider>
  );
};

export { SongListItem };
