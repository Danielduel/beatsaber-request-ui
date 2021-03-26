import React from "react";
import LayoutRow from "../common/LayoutRow";
import MagnifyingGlassIcon from "../common/icons/MagnifyingGlassIcon";

export default function ItemList({ requestSearchSong }: { requestSearchSong: (query: string) => void }) {
  const [query, setQuery] = React.useState("");

  return (
    <LayoutRow isPageHeader>
      <input
        className="SearchPage-input"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        placeholder="Enter song name"
        onKeyUp={(e) => {
          if (e.key === "Enter") {
            requestSearchSong(query);
          }
        }}
      />
      <MagnifyingGlassIcon />
      <button className="SearchPage-button" onClick={() => requestSearchSong(query)}>
        Search
      </button>
    </LayoutRow>
  );
}
