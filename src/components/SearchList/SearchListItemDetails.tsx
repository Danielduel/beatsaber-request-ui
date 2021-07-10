import React from "react";
import { SearchListItemActions } from "./SearchListItemActions";
import { SearchListItemCoverImage } from "./SearchListItemCoverImage";
import {
  SearchListItemDetailsFullwidthItem,
  SearchListItemDetailsSmallItem
} from "./SearchListItemDetails/SearchListItemDetailsCommon";
import { SearchListItemDetailsWrapper } from "./SearchListItemDetails/SearchListItemDetailsWrapper";

type SearchListItemDetailsProps = {
  coverURL: string;
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
  coverURL,
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
      <SearchListItemCoverImage coverURL={coverURL} />
      <SearchListItemActions bsrKey={bsrKey} isRanked={isRanked} />
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
