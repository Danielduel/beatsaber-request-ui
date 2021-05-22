import React from "react";
import LayoutRow from "../common/LayoutRow";
import MagnifyingGlassIcon from "../common/icons/MagnifyingGlassIcon";
import { useTranslation } from "react-i18next";
import styled from "styled-components";

const SearchButton = styled.button`
  outline: none;
  box-sizing: border-box;
  height: 40px;
  padding: 4px 20px;
  margin-left: 12px;
  border-radius: 20px;
  border: 0px solid transparent;
  cursor: pointer;

  font-weight: normal;
  font-size: 1.1rem;
  color: var(--text-secondary);
  background-color: var(--background-input);

  opacity: ${({ disabled }: { disabled: boolean }) => (disabled ? "0.5" : "0.9")};

  &:hover {
    opacity: ${({ disabled }: { disabled: boolean }) => (disabled ? "0.6" : "1")};
  }
`;

export default function ItemList({ requestSearchSong }: { requestSearchSong: (query: string) => void }): JSX.Element {
  const [query, setQuery] = React.useState("");
  const [t] = useTranslation();

  return (
    <LayoutRow isPageHeader>
      <input
        className="SearchPage-input"
        autoFocus
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
      <SearchButton disabled={!query.trim().length} onClick={() => requestSearchSong(query)}>
        {t("Search")}
      </SearchButton>
    </LayoutRow>
  );
}
