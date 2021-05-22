import React from "react";
import LayoutRow from "../common/LayoutRow";
import MagnifyingGlassIcon from "../common/icons/MagnifyingGlassIcon";
import { useTranslation } from "react-i18next";

export default function ItemList({ requestSearchSong }: { requestSearchSong: (query: string) => void }) {
  const [query, setQuery] = React.useState("");
  const [t] = useTranslation();

  return (
    <LayoutRow isPageHeader>
      <input
        className="SearchPage-input"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        placeholder={t("Enter song name")}
        onKeyUp={(e) => {
          if (e.key === "Enter") {
            requestSearchSong(query);
          }
        }}
      />
      <MagnifyingGlassIcon />
      <button className="SearchPage-button" onClick={() => requestSearchSong(query)}>
        {t("Search")}
      </button>
    </LayoutRow>
  );
}
