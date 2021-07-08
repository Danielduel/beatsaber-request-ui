// declare const Twitch: any;

import React from "react";
import styled from "styled-components";

import { fetchSongs, isNotNull } from "../../utils";

import { LayoutRowPlaceholder } from "../../components/LayoutRow/LayoutRow";
import SearchInput from "./SearchInput";
import SearchList from "./SearchList";
import { Translation } from "react-i18next";

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

function getMessage(isSearching: boolean, songList: SongListType | null) {
  if (isSearching) return <Translation>{(t) => t("Searching...")}</Translation>;
  if (!songList) return <Translation>{(t) => t("Start searching")}</Translation>;
  if (!songList.docs) return <Translation>{(t) => t("No docs - error")}</Translation>;
  if (!songList.docs.length) return <Translation>{(t) => t("No results")}</Translation>;
  return "";
}

export default function SearchPage(): JSX.Element {
  const [songList, setSongList] = React.useState<SongListType | null>(null);
  const [isSearching, setIsSearching] = React.useState(false);

  const requestSearchSong = (query: string) => {
    setIsSearching(true);
    fetchSongs(query)
      .then(setSongList)
      .then(() => {
        setIsSearching(false);
      });
  };

  const message = getMessage(isSearching, songList);
  const canRenderSearchList = !message && !isSearching;

  return (
    <SearchPageWrapper>
      <SearchInput requestSearchSong={requestSearchSong} />
      {canRenderSearchList && isNotNull(songList) && <SearchList documentList={songList.docs} />}
      {message && <LayoutRowPlaceholder>{message}</LayoutRowPlaceholder>}
    </SearchPageWrapper>
  );
}
