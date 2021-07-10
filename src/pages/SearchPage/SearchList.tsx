import React from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { Translation } from "react-i18next";
import styled from "styled-components";
import AppEnvContext, { RankedRecordMap } from "../../AppEnvContext";
import { hideScrollbars } from "../../common/styles/hideScrollbars";
import { LayoutRowTall, LayoutRowBase } from "../../components/LayoutRow/LayoutRow";
import { SearchListItemDetails } from "../../components/SearchList/SearchListItemDetails";
import { SongListDocsItem } from "./SearchPage";
import { CopyIcon } from "./CopyIcon";

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

const CopyButton = styled.button`
  outline: none;
  box-sizing: border-box;
  height: 40px;
  padding: 10px 10px;
  margin-left: 12px;
  border-radius: 20px;
  border: 0px solid transparent;
  cursor: pointer;

  font-weight: normal;
  font-size: 0.8rem;
  color: var(--text);
  background-color: var(--background-input);
  opacity: 0.9;

  display: inline-flex;
  justify-content: space-between;
  align-items: center;
  transition: width 0.03s linear;

  & > svg {
    width: 20px;
    height: 20px;
  }

  &:hover {
    opacity: 1;
  }
`;

const CopyButtonText = styled.span`
  margin-right: 5px;
`;

const PostCopyTooltip = styled.div`
  position: absolute;
  margin-top: 2px;
  height: 90%;
  top: 0;
  right: 3px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #ddd;
  padding: 0 10px;
  border: 0px solid transparent;
  border-radius: 10px;
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

const SearchListItemCoverImageWrapper = styled.div`
  height: 91px;
  width: 91px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-right: 1px solid var(--border);

  & > img {
    width: 91px;
    max-height: 91px;
  }
`;
const SearchListItemCoverImage = ({ coverURL }: { coverURL: string }) => {
  return (
    <SearchListItemCoverImageWrapper>
      <img src={coverURL} />
    </SearchListItemCoverImageWrapper>
  );
};

const SearchListItemWrapper = styled.div`
  display: flex;
  flex-direction: row;
  font-size: 10px;
  padding-top: 1px;
`;
const Item = (rankedHashes: RankedRecordMap, framePanel: boolean, frameFullvideo: boolean) => {
  const _Item = (docData: SongListDocsItem) => {
    const [copied, setCopied] = React.useState(false);
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
          <SearchListItemCoverImage coverURL={coverURL} />
          <SearchListItemDetails
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
          <div className="doc__cta">
            {!copied ? (
              <CopyToClipboard text={`!bsr ${docData.key}`} onCopy={() => setCopied(true)}>
                <CopyButton
                  style={{ backgroundColor: isRanked ? "var(--background-secondary-buttonover)" : "invalid-color" }}
                >
                  <CopyButtonText>
                    <Translation>{(t) => t("Copy")}</Translation>
                  </CopyButtonText>
                  <CopyIcon />
                </CopyButton>
              </CopyToClipboard>
            ) : (
              <PostCopyTooltip>
                <Translation>{(t) => t("Paste on chat")}</Translation>
                <br />
                <Translation>{(t) => t("to make request")}</Translation>
              </PostCopyTooltip>
            )}
          </div>
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
