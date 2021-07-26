// declare const Twitch: any;

import React from "react";
import styled from "styled-components";

import { fetchSongs, isNotNull } from "../../utils";

import { LayoutRowPlaceholder } from "../../components/LayoutRow/LayoutRow";
import SearchInput from "./SearchInput";
import SearchList from "./SearchList";
import { Translation } from "react-i18next";
import { usePaginatedData } from "../../components/SongList/usePaginatedData";

export type SongListDocsItemMetadataCharacteristicsDifficultiesEntry = {
  duration: number;
  length: number;
  njs: number;
  njsOffset: number;
  bombs: number;
  notes: number;
  obstacles: number;
};

export type SongListDocsItem = {
  metadata: {
    difficulties: { easy: boolean; expert: boolean; expertPlus: boolean; hard: boolean; normal: boolean };
    duration: number;
    automapper: boolean | null;
    characteristics: [
      {
        difficulties: {
          easy: SongListDocsItemMetadataCharacteristicsDifficultiesEntry | null;
          expert: SongListDocsItemMetadataCharacteristicsDifficultiesEntry | null;
          expertPlus: SongListDocsItemMetadataCharacteristicsDifficultiesEntry | null;
          hard: SongListDocsItemMetadataCharacteristicsDifficultiesEntry | null;
          normal: SongListDocsItemMetadataCharacteristicsDifficultiesEntry | null;
        };
        name: string;
      }
    ];
    levelAuthorName: string;
    songAuthorName: string;
    songName: string;
    songSubName: string;
    bpm: number;
  };
  stats: { downloads: number; plays: number; downVotes: number; upVotes: number; heat: number; rating: number };
  description: string;
  deletedAt: null | string;
  _id: string;
  key: string;
  name: string;
  uploader: { _id: string; username: string };
  hash: string;
  uploaded: string;
  directDownload: string;
  downloadURL: string;
  coverURL: string;
};

export type SongListType = {
  docs: SongListDocsItem[];
};

const SearchPageWrapper = styled.div`
  display: grid;
  grid-template-rows: 52px 1fr;
  height: 100%;
`;

function getMessage(wasSearching: boolean, isSearching: boolean, songList: SongListDocsItem[]) {
  if (isSearching) return <Translation>{(t) => t("Searching...")}</Translation>;
  if (!wasSearching) return <Translation>{(t) => t("Start searching")}</Translation>;
  if (!songList.length) return <Translation>{(t) => t("No results")}</Translation>;
  return "";
}

const mapResponsesToItems = (pages: SongListType[]): SongListDocsItem[] => {
  return pages.flatMap((page) => {
    return page.docs.flat();
  });
};

export default function SearchPage(): JSX.Element {
  const [wasSearching, setWasSearching] = React.useState(false);
  const [query, setQuery] = React.useState("");
  const getUrl = React.useCallback((page) => {
    return `https://beatsaver.com/api/search/text/${page}?q=${query}`;
  }, [query]);

  const [results, isFetching, isError, initialFetch, fetchNextPage, clearData] = usePaginatedData(getUrl, mapResponsesToItems, {
    initialPageNumber: 0
  });

  const submitSearch = React.useCallback(() => {
    clearData();
    setWasSearching(true);
    initialFetch();
  }, [clearData, setWasSearching, initialFetch]);

  const message = getMessage(wasSearching, isFetching, results);
  const canRenderSearchList = !message && !isFetching;

  return (
    <SearchPageWrapper>
      <SearchInput
        query={query}
        setQuery={setQuery}
        submitSearch={submitSearch}
      />
      <SearchList key="list" documentList={results} />
      {message && <LayoutRowPlaceholder>{message}</LayoutRowPlaceholder>}
      {isError && <LayoutRowPlaceholder>Error</LayoutRowPlaceholder>}
      {canRenderSearchList && <button onClick={() => fetchNextPage()}>Fetch more</button>}
    </SearchPageWrapper>
  );
}
