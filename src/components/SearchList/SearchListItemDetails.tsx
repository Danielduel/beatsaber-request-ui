import React from "react";
import {
  SearchListItemDetailsFullwidthItem,
  SearchListItemDetailsSmallItem
} from "./SearchListItemDetails/SearchListItemDetailsCommon";
import { SearchListItemDetailsWrapper } from "./SearchListItemDetails/SearchListItemDetailsWrapper";

type SearchListItemDetailsProps = {
  songName: string;
  songAuthorName: string;
  levelAuthorName: string;
  bsrKey: string;
  downloads: number;
  upVotes: number;
  downVotes: number;
  percentVotes: number;
  isRanked: boolean;
};
const SearchListItemDetails = ({
  songName,
  songAuthorName,
  levelAuthorName,
  bsrKey,
  downloads,
  upVotes,
  downVotes,
  percentVotes,
  isRanked
}: SearchListItemDetailsProps) => {
  return (
    <SearchListItemDetailsWrapper>
      <SearchListItemDetailsFullwidthItem variant="title" data={songName} suffix="" />
      <SearchListItemDetailsFullwidthItem variant="subtitle" data={songAuthorName} suffix="" />
      <SearchListItemDetailsFullwidthItem variant="subtitle" data={levelAuthorName} suffix="" />
      <SearchListItemDetailsSmallItem variant="item" data={bsrKey} suffix="🔑" />
      <SearchListItemDetailsSmallItem variant="item" data={downloads} suffix="💾" />
      <SearchListItemDetailsSmallItem variant="item" data={percentVotes} suffix="💯" />
      <SearchListItemDetailsSmallItem variant="item" data={upVotes} suffix="👍" />
      <SearchListItemDetailsSmallItem variant="item" data={downVotes} suffix="👎" />
      <SearchListItemDetailsSmallItem variant="item" data={isRanked ? "Ranked" : null} suffix="⭐" />
    </SearchListItemDetailsWrapper>
  );
};

export { SearchListItemDetails };
