import React from "react";
import { SongListItem } from "../../components/SongList/SongListItem";
import { SongListDocsItem, SongListDocsItemVersion } from "./SearchPage";
import { SongListContainer } from "../../components/SongList/SongListContainer";
import { isCreatedByAutomapper } from "../../utils";

const getDiffs = (lastVersion: SongListDocsItemVersion) => {
  if (!lastVersion) return;
  const { diffs } = lastVersion;

  if (!diffs) return;
  const easy = diffs.some((diff) => diff.difficulty === "Easy");
  const normal = diffs.some((diff) => diff.difficulty === "Normal");
  const hard = diffs.some((diff) => diff.difficulty === "Hard");
  const expert = diffs.some((diff) => diff.difficulty === "Expert");
  const expertPlus = diffs.some((diff) => diff.difficulty === "ExpertPlus");

  return {
    easy,
    normal,
    hard,
    expert,
    expertPlus
  };
};

const Item = () => {
  const _Item = (docData: SongListDocsItem) => {
    const allvotes = docData.stats.upvotes + docData.stats.downvotes;
    const percentVotes = ~~((docData.stats.upvotes / allvotes) * 1000) / 10;
    const lastVersion = docData.versions[docData.versions.length - 1];
    const coverURL = lastVersion.coverURL;

    const shouldBeHidden = isCreatedByAutomapper(
      docData.metadata.songName,
      docData.metadata.songAuthorName,
      docData.metadata.levelAuthorName
    );

    if (shouldBeHidden) return <></>;

    const diffs = getDiffs(lastVersion);

    const isRanked = docData.ranked;
    const isQualified = docData.qualified;

    return (
      <SongListItem
        hash={lastVersion.hash}
        coverURL={coverURL}
        songName={docData.metadata.songName}
        songAuthorName={docData.metadata.songAuthorName}
        levelAuthorName={docData.metadata.levelAuthorName}
        bsrKey={docData.id}
        downloads={docData.stats.downloads}
        upVotes={docData.stats.upvotes}
        downVotes={docData.stats.downvotes}
        percentVotes={percentVotes}
        isRanked={isRanked}
        isQualified={isQualified}
        easy={!!diffs?.easy}
        normal={!!diffs?.normal}
        hard={!!diffs?.hard}
        expert={!!diffs?.expert}
        expertPlus={!!diffs?.expertPlus}
      />
    );
  };
  return _Item;
};

const _ItemList = ({
  documentList,
  children
}: {
  documentList: SongListDocsItem[];
  children?: JSX.Element | JSX.Element[];
}) => {
  const renderedItems = documentList.map(Item());

  return (
    <SongListContainer>
      {renderedItems}
      {renderedItems.length > 0 && children}
    </SongListContainer>
  );
};

export default function SearchList({
  documentList,
  children
}: {
  documentList: SongListDocsItem[];
  children?: JSX.Element | JSX.Element[];
}): JSX.Element {
  return <_ItemList documentList={documentList}>{children}</_ItemList>;
}
