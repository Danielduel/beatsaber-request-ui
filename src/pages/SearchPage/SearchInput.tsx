import React from "react";
import { LayoutRowBase } from "../../components/LayoutRow/LayoutRow";
import MagnifyingGlassIcon from "../../common/icons/MagnifyingGlassIcon";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import AppEnvContext from "../../AppEnvContext";
import { shadowizeFont } from "../../common/styles/shadowizeFont";

const PageHeaderLayoutRow = styled(LayoutRowBase)`
  display: flex;
  padding: 10px 8px 0px 8px;
`;

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
  transition: opacity 0.3s;

  opacity: ${({ disabled }: { disabled: boolean }) => (disabled ? "0.5" : "0.9")};

  &:hover {
    opacity: ${({ disabled }: { disabled: boolean }) => (disabled ? "0.6" : "1")};
  }
`;

const ClearButton = styled.span`
  ${shadowizeFont}

  line-height: 0;
  background: var(--background);
  margin-left: -37px;
  margin-top: 2px;
  border: 1px solid var(--background-primary);
  border-radius: 50%;
  padding: 4px;
  opacity: 0.9;
  cursor: pointer;
  width: 36px;
  height: 36px;
  position: absolute;
  display: inline-flex;
  align-items: center;
  justify-content: center;

  box-sizing: border-box;

  &:hover {
    opacity: 1;
  }
`;

const SearchInput = styled.input`
  padding-right: 40px;
  outline: none;
  width: 100%;

  height: 40px;
  border: 0px solid transparent;
  border-radius: 30px;
  background: var(--background-input);

  padding: 9px 0px 8px 53px;
  color: var(--text);
  font-size: 1.1em;
  box-sizing: border-box;

  & + svg {
    position: absolute;
    left: 24px;
    top: 15px;
  }
`;

const SearchInputGroup = styled.div`
  flex: 260 0;
`;

export default function ItemList({ requestSearchSong }: { requestSearchSong: (query: string) => void }): JSX.Element {
  const [query, setQuery] = React.useState("");
  const [t] = useTranslation();

  const searchInputOnChange = React.useCallback((event) => setQuery(event.target.value), [setQuery]);
  const searchInputOnKeyUp = React.useCallback(
    (e) => {
      if (e.key === "Enter") {
        requestSearchSong(query);
      }
    },
    [requestSearchSong, query]
  );
  const searchClearOnClick = React.useCallback(() => setQuery(""), [setQuery]);
  const searchSubmitOnClick = React.useCallback(() => requestSearchSong(query), [query, requestSearchSong]);

  return (
    <PageHeaderLayoutRow>
      <SearchInputGroup>
        <SearchInput
          autoFocus
          value={query}
          placeholder={t("Enter song name")}
          onChange={searchInputOnChange}
          onKeyUp={searchInputOnKeyUp}
        />
        <MagnifyingGlassIcon />
        {query.length ? <ClearButton onClick={searchClearOnClick}>❌</ClearButton> : null}
      </SearchInputGroup>
      <SearchButton disabled={!query.trim().length} onClick={searchSubmitOnClick}>
        <MagnifyingGlassIcon />
      </SearchButton>
    </PageHeaderLayoutRow>
  );
}
