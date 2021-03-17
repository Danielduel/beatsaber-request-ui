import React from 'react';

import {
  fetchSongs
} from '../utils';

import LayoutRow from '../common/LayoutRow';
import SearchInput from './SearchInput';
import SearchList from './SearchList';

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

  const message = getMessage(isSearching, songList)

  return (
    <>
      <SearchInput
        requestSearchSong={requestSearchSong}
      />
      <LayoutRow placeholder></LayoutRow> {/* Hack for background */}
      { !message && songList && !isSearching && <SearchList documentList={songList.docs} /> }
      <LayoutRow placeholder>{ message }</LayoutRow>
    </>
  );
}
