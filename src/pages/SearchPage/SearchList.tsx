import React from "react";
import AppEnvContext, { RankedRecordMap } from "../../AppEnvContext";
import { SongListItem } from "../../components/SongList/SongListItem";
import { SongListDocsItem } from "./SearchPage";
import { SongListContainer } from "../../components/SongList/SongListContainer";
import { isCreatedByAutomapper } from "../../utils";

const Item = (rankedHashes: RankedRecordMap) => {
  const _Item = (docData: SongListDocsItem) => {
    const coverURL = `https://beatsaver.com${docData.coverURL}`;
    const allVotes = docData.stats.upVotes + docData.stats.downVotes;
    const percentVotes = ~~((docData.stats.upVotes / allVotes) * 1000) / 10;

    const shouldBeHidden = isCreatedByAutomapper(
      docData.metadata.songName,
      docData.metadata.songAuthorName,
      docData.metadata.levelAuthorName
    );

    if (shouldBeHidden) return <></>;

    const isRanked = !!rankedHashes[docData.hash.toLowerCase()];

    return (
      <SongListItem
        hash={docData.hash}
        coverURL={coverURL}
        songName={docData.metadata.songName}
        songAuthorName={docData.metadata.songAuthorName}
        levelAuthorName={docData.metadata.levelAuthorName}
        bsrKey={docData.key}
        downloads={docData.stats.downloads}
        upVotes={docData.stats.upVotes}
        downVotes={docData.stats.downVotes}
        percentVotes={percentVotes}
        isRanked={isRanked}
        easy={!!docData.metadata.difficulties.easy}
        normal={!!docData.metadata.difficulties.normal}
        hard={!!docData.metadata.difficulties.hard}
        expert={!!docData.metadata.difficulties.expert}
        expertPlus={!!docData.metadata.difficulties.expertPlus}
      />
    );
  };
  return _Item;
};

const _ItemList = ({
  documentList,
  rankedHashes
}: {
  documentList: SongListDocsItem[];
  rankedHashes: RankedRecordMap;
}) => {
  const renderedItems = documentList.map(Item(rankedHashes));

  return <SongListContainer>{renderedItems}</SongListContainer>;
};

export default function SearchList({ documentList }: { documentList: SongListDocsItem[] }): JSX.Element {
  return (
    <AppEnvContext.Consumer>
      {(context) => <_ItemList documentList={documentList} rankedHashes={context.rankedHashes} />}
    </AppEnvContext.Consumer>
  );
}
