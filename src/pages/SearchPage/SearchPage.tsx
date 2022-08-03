// declare const Twitch: any;

import React from "react";
import styled from "styled-components";

import { LayoutRowPlaceholderTransparent } from "../../components/LayoutRow/LayoutRow";
import SearchInput from "./SearchInput";
import SearchList from "./SearchList";
import { useTranslation } from "react-i18next";
import { usePaginatedData } from "../../common/hooks/usePaginatedData";

export type SongListDocsItemMetadataCharacteristicsDifficultiesEntry = {
  duration: number;
  length: number;
  njs: number;
  njsOffset: number;
  bombs: number;
  notes: number;
  obstacles: number;
};

type SongListDocsItemUploader = {
  id: number;
  name: string;
  hash: string;
  avatar: string; // gravatar url
};

type SongListDocsItemMetadata = {
  bpm: number;
  duration: number;
  songName: string;
  songSubName: string;
  songAuthorName: string;
  levelAuthorName: string;
};

type SongListDocsItemStats = {
  plays: number;
  downloads: number;
  upvotes: number;
  downvotes: number;
  score: number;
};

type SongListDocsItemVersionDiff = {
  njs: number;
  offset: number;
  notes: number;
  bombs: number;
  obstacles: number;
  nps: number;
  length: number;
  characteristic: string;
  difficulty: "Easy" | "Normal" | "Hard" | "Expert" | "ExpertPlus";
  events: number;
  chroma: boolean;
  me: boolean;
  ne: boolean;
  cinema: boolean;
  seconds: number;
  paritySummary: {
    errors: number;
    warns: number;
    resets: number;
  };
};

export type SongListDocsItemVersion = {
  hash: string;
  key: string;
  state: string;
  createdAt: string;
  sageScore: number;
  diffs: SongListDocsItemVersionDiff[];
  downloadURL: string;
  coverURL: string;
  previewURL: string;
};

export type SongListDocsItem = {
  id: string;
  name: string;
  description: string;
  uploader: SongListDocsItemUploader;
  metadata: SongListDocsItemMetadata;
  stats: SongListDocsItemStats;
  uploaded: string;
  automapper: boolean;
  ranked: boolean;
  qualified: boolean;
  versions: SongListDocsItemVersion[];
};

export type SongListType = {
  docs: SongListDocsItem[];
};

const SearchPageFetchMoreButtonWrapper = styled.div`
  margin-top: 10px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const SearchPageFetchMoreButton = styled.button`
  height: 42px;
  padding: 5px 10px;
  border-radius: 20px;
  border: 0px solid transparent;
  background-color: var(--background-input);
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.2rem;
  color: var(--text);
`;

const SearchPageWrapper = styled.div`
  display: grid;
  grid-template-rows: 52px 1fr;
  height: 100%;
`;

const SearchPageFixedMessageWrapper = styled.div`
  position: absolute;
  max-height: 10vh;
  top: 30%;
`;

function getMessage(t: TranslationFunction, wasSearching: boolean, isSearching: boolean, songList: SongListDocsItem[]) {
  if (isSearching) return t("Searching...");
  if (!wasSearching) return t("Start searching");
  if (!songList.length) return t("No results");
  return "";
}

const mapResponsesToItems = (pages: SongListType[]): SongListDocsItem[] => {
  return pages.flatMap((page) => {
    return page.docs.flat();
  });
};

export default function SearchPage(): JSX.Element {
  const [t] = useTranslation();
  const [wasSearching, setWasSearching] = React.useState(false);
  const [query, setQuery] = React.useState("");
  const getUrl = React.useCallback(
    (page) => {
      return `https://api.beatsaver.com/search/text/${page}?q=${query}`;
    },
    [query]
  );

  const [results, isFetching, isError, initialFetch, fetchNextPage, clearData] = usePaginatedData(
    getUrl,
    mapResponsesToItems,
    {
      initialPageNumber: 0
    }
  );

  const submitSearch = React.useCallback(() => {
    clearData();
    setWasSearching(true);
    initialFetch();
  }, [clearData, setWasSearching, initialFetch]);

  const message = getMessage(t, wasSearching, isFetching, results);
  // const canRenderSearchList = !message && !isFetching;

  return (
    <SearchPageWrapper>
      <SearchInput query={query} setQuery={setQuery} submitSearch={submitSearch} />
      <SearchPageFixedMessageWrapper>
        {message && <LayoutRowPlaceholderTransparent>{message}</LayoutRowPlaceholderTransparent>}
        {isError && <LayoutRowPlaceholderTransparent>Error</LayoutRowPlaceholderTransparent>}
      </SearchPageFixedMessageWrapper>
      <SearchList key="list" documentList={results}>
        <SearchPageFetchMoreButtonWrapper>
          <SearchPageFetchMoreButton onClick={() => fetchNextPage()}>
            {isFetching ? "Fetching..." : "Fetch more"}
          </SearchPageFetchMoreButton>
        </SearchPageFetchMoreButtonWrapper>
      </SearchList>
    </SearchPageWrapper>
  );
}
