import React from "react";
import styled from "styled-components";
import AppEnvContext, { RankedRecordMap } from "../../AppEnvContext";
import { hideScrollbars } from "../../common/styles/hideScrollbars";
import { LayoutRowTall, LayoutRowBase } from "../../components/LayoutRow/LayoutRow";
import { SearchListItemDetails } from "../../components/SearchList/SearchListItemDetails";
import { SearchListItemAvailableDifficulties } from "../../components/SearchList/SearchListItemAvailableDifficulties";
import { SongListDocsItem } from "./SearchPage";

// Trimmed LowerCase
const stringTLC = (s: string) => s.toLocaleLowerCase().trim();

const autoMappers = ["Beat Sage", "Deep Saber"];
const autoMappersTLC = autoMappers.map(stringTLC);

const SearchListContainer = styled.div`
  box-sizing: border-box;
  height: calc(100vh - (52px * 2));
  padding-bottom: 1rem;
  overflow-y: scroll;

  ${hideScrollbars}
`;

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

const SearchListItemWrapper = styled.div`
  display: flex;
  flex-direction: row;
  font-size: 10px;
  padding-top: 1px;
`;
const Item = (rankedHashes: RankedRecordMap, framePanel: boolean, frameFullvideo: boolean) => {
  const _Item = (docData: SongListDocsItem) => {
    const coverURL = `https://beatsaver.com${docData.coverURL}`;
    const allVotes = docData.stats.upVotes + docData.stats.downVotes;
    const percentVotes = ~~((docData.stats.upVotes / allVotes) * 1000) / 10;

    const shouldBeHidden = isCreatedByAutomapper(docData);

    if (shouldBeHidden) return <></>;

    const isRanked = !!rankedHashes[docData.hash.toLowerCase()];

    return (
      <LayoutRowTall
        key={docData.hash}
        style={{
          backgroundColor: isRanked ? "var(--background-secondary)" : "invalid-color",
          borderBottom: "1px solid var(--border)"
        }}
      >
        <SearchListItemWrapper>
          <SearchListItemDetails
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
          />
          <SearchListItemAvailableDifficulties
            easy={!!docData.metadata.difficulties.easy}
            normal={!!docData.metadata.difficulties.normal}
            hard={!!docData.metadata.difficulties.hard}
            expert={!!docData.metadata.difficulties.expert}
            expertPlus={!!docData.metadata.difficulties.expertPlus}
          />
        </SearchListItemWrapper>
      </LayoutRowTall>
    );
  };
  return _Item;
};

const _ItemList = ({
  documentList,
  rankedHashes,
  framePanel,
  frameFullvideo
}: {
  documentList: SongListDocsItem[];
  rankedHashes: RankedRecordMap;
  framePanel: boolean;
  frameFullvideo: boolean;
}) => {
  const renderedItems = documentList.map(Item(rankedHashes, framePanel, frameFullvideo));

  return (
    <SearchListContainer>
      <LayoutRowBase style={{ marginTop: "-45px" }} />
      {renderedItems}
      {frameFullvideo ? <LayoutRowBase /> : null}
    </SearchListContainer>
  );
};

export default function ItemList({ documentList }: { documentList: SongListDocsItem[] }): JSX.Element {
  return (
    <AppEnvContext.Consumer>
      {(context) => (
        <_ItemList
          documentList={documentList}
          rankedHashes={context.rankedHashes}
          framePanel={context.framePanel}
          frameFullvideo={context.frameFullvideo}
        />
      )}
    </AppEnvContext.Consumer>
  );
}
