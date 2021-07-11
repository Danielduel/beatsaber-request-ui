import React from "react";
import styled from "styled-components";
import { LayoutRowTall } from "../LayoutRow/LayoutRow";
import { SongListItemActions } from "./SongListItemActions";
import { SongListItemAvailableDifficulties } from "./SongListItemAvailableDifficulties";
import { SongListItemCoverImage } from "./SongListItemCoverImage";
import {
  SongListItemDetailsFullwidthItem,
  SongListItemDetailsSmallItem
} from "./SongListItemDetails/SongListItemDetailsCommon";
import { SongListItemDetailsWrapper } from "./SongListItemDetails/SongListItemDetailsWrapper";

const SongListItemWrapper = styled.div`
  display: flex;
  flex-direction: row;
  font-size: 10px;
  padding-top: 1px;
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
  easy,
  normal,
  hard,
  expert,
  expertPlus
}: SongListItemProps & SongListItemDifficultyProps): JSX.Element => {
  return (
    <LayoutRowTall
      key={hash}
      style={{
        backgroundColor: isRanked ? "var(--background-secondary)" : "invalid-color",
        borderBottom: "1px solid var(--border)"
      }}
    >
      <SongListItemWrapper>
        <SongListItemDetailsWrapper>
          <SongListItemCoverImage coverURL={coverURL} />
          <SongListItemActions bsrKey={bsrKey} isRanked={isRanked} />
          <SongListItemDetailsFullwidthItem variant="title" data={songName} suffix="" />
          <SongListItemDetailsFullwidthItem variant="subtitle" data={songAuthorName} suffix="" />
          <SongListItemDetailsFullwidthItem variant="subtitle" data={levelAuthorName} suffix="" />
          <SongListItemDetailsSmallItem variant="item" data={bsrKey} suffix="🔑" />
          <SongListItemDetailsSmallItem variant="item" data={downloads} suffix="💾" />
          <SongListItemDetailsSmallItem variant="item" data={percentVotes} suffix="💯" />
          <SongListItemDetailsSmallItem variant="item" data={upVotes} suffix="👍" />
          <SongListItemDetailsSmallItem variant="item" data={downVotes} suffix="👎" />
          <SongListItemDetailsSmallItem variant="item" data={isRanked ? "Ranked" : null} suffix="⭐" />
        </SongListItemDetailsWrapper>
        <SongListItemAvailableDifficulties
          easy={easy}
          normal={normal}
          hard={hard}
          expert={expert}
          expertPlus={expertPlus}
        />
      </SongListItemWrapper>
    </LayoutRowTall>
  );
};

export { SongListItem };
