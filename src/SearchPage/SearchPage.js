import React from 'react';
import styled from 'styled-components';

import {
  fetchSongs
} from '../utils';

import LayoutRow from '../common/LayoutRow';
import SearchInput from './SearchInput';
import SearchList from './SearchList';


const SearchPageWrapper = styled.div`
  display: grid;
  grid-template-rows: 52px 1fr;
  height: 100%;
`;

function getMessage(isSearching, songList) {
  if (isSearching) return "Searching..."
  if (!songList) return "Start searching"
  if (!songList.docs) return "No docs - error"
  if (!songList.docs.length) return "No results"
  return '';
}

export default function SearchPage() {
  const [songList, setSongList] = React.useState(() => null);
  const [isSearching, setIsSearching] = React.useState(() => false);

  const requestSearchSong = (query) => {
    setIsSearching(true);
    fetchSongs(query)
      .then(setSongList)
      .then(() => { setIsSearching(false) });
  };

  const message = getMessage(isSearching, songList);
  const canRenderSearchList = !message && songList && !isSearching;

  return (
    <SearchPageWrapper>
      <SearchInput
        requestSearchSong={requestSearchSong}
      />
      { canRenderSearchList && <SearchList documentList={songList.docs} /> }
      { message && <LayoutRow placeholder>{ message }</LayoutRow> }
    </SearchPageWrapper>
  );
}
