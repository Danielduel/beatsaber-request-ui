import React from "react";
import styled from "styled-components";
import { LayoutRowTall } from "../LayoutRow/LayoutRow";
import { SongListItemActions } from "./SongListItemActions";
import { SongListItemAvailableDifficulties } from "./SongListItemAvailableDifficulties";
import { SongListItemCoverImage, SongListItemCoverImageBackground } from "./SongListItemCoverImage";
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
  return (
    <LayoutRowTall
      key={hash}
      style={{
        backgroundColor: isRanked ? "var(--background-secondary)" : "invalid-color",
        borderBottom: "1px solid var(--border)"
      }}
    >
      <SongListItemWrapper>
        <SongListItemCoverImageBackground coverURL={coverURL} />
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
          <SongListItemDetailsFullwidthItem variant="title" data={songName} suffix="" />
          <SongListItemDetailsFullwidthItem variant="subtitle" data={songAuthorName} suffix="" />
          <SongListItemDetailsFullwidthItem variant="subtitle" data={levelAuthorName} suffix="" />
          <SongListItemDetailsSmallItem variant="item" data={bsrKey} suffix="🔑" />
          <SongListItemDetailsSmallItem variant="item" data={downloads} suffix="💾" />
          <SongListItemDetailsSmallItem variant="item" data={percentVotes} suffix="💯" />
          <SongListItemDetailsSmallItem variant="item" data={upVotes} suffix="👍" />
          <SongListItemDetailsSmallItem variant="item" data={downVotes} suffix="👎" />
          <SongListItemDetailsSmallItem variant="item" data={(isRanked && "Ranked") || (isQualified && "Qualified") || null} suffix="⭐" />
          <SongListItemActions bsrKey={bsrKey} isRanked={isRanked} />
        </SongListItemDetailsWrapper>
      </SongListItemWrapper>
    </LayoutRowTall>
  );
};

export { SongListItem };
