import React from "react";
import AppEnvContext, { RankedRecordMap } from "../../AppEnvContext";
import { SongListItem } from "../../components/SongList/SongListItem";
import { SongListDocsItem } from "./SearchPage";
import { SongListContainer } from "../../components/SongList/SongListContainer";

// Trimmed LowerCase
const stringTLC = (s: string) => s.toLocaleLowerCase().trim();

const autoMappers = ["Beat Sage", "Deep Saber"];
const autoMappersTLC = autoMappers.map(stringTLC);

const isCreatedByAutomapper = (docData: SongListDocsItem) => {
  const songNameTLC = stringTLC(docData.metadata.songName);
  const songAuthorNameTLC = stringTLC(docData.metadata.songAuthorName);
  const levelAuthorNameTLC = stringTLC(docData.metadata.levelAuthorName);

  return autoMappersTLC.some((autoMapperTLC) => {
    return (
      songNameTLC.includes(autoMapperTLC) ||
      songAuthorNameTLC.includes(autoMapperTLC) ||
      levelAuthorNameTLC.includes(autoMapperTLC)
    );
  });
};

const Item = (rankedHashes: RankedRecordMap) => {
  const _Item = (docData: SongListDocsItem) => {
    const coverURL = `https://beatsaver.com${docData.coverURL}`;
    const allVotes = docData.stats.upVotes + docData.stats.downVotes;
    const percentVotes = ~~((docData.stats.upVotes / allVotes) * 1000) / 10;

    const shouldBeHidden = isCreatedByAutomapper(docData);

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

export default function ItemList({ documentList }: { documentList: SongListDocsItem[] }): JSX.Element {
  return (
    <AppEnvContext.Consumer>
      {(context) => <_ItemList documentList={documentList} rankedHashes={context.rankedHashes} />}
    </AppEnvContext.Consumer>
  );
}
