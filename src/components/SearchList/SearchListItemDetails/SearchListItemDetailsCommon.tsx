import React from "react";
import styled, { css } from "styled-components";

type SearchListItemDetailsSpanVariant = "title" | "subtitle" | "item";
type SearchListItemDetailsSpanProps = {
  variant: SearchListItemDetailsSpanVariant;
};
const SearchListItemDetailsSpan = styled.span`
  ${({ variant }: SearchListItemDetailsSpanProps) => {
    switch (variant) {
      case "title":
        return css`
          font-size: 1.2rem;
          color: var(--text);
        `;
      case "subtitle":
        return css`
          font-size: 1.1rem;
          color: var(--text-secondary);
          margin-left: 5px;
        `;
      case "item":
        return css`
          font-size: 1.1rem;
          color: var(--text);
          margin-left: 5px;
        `;
    }
  }}
`;

type SearchListItemDetailsCommonProps = {
  data: string | null | undefined | number;
  suffix: string;
  variant: SearchListItemDetailsSpanVariant;
};
const SearchListItemDetailsCommon = (WrapperComponent: React.FunctionComponent) => {
  const memoRender = ({ variant, data, suffix }: SearchListItemDetailsCommonProps) => (
    <WrapperComponent>
      <SearchListItemDetailsSpan variant={variant}>
        {data}&nbsp;{suffix}
      </SearchListItemDetailsSpan>
    </WrapperComponent>
  );

  const _SearchListItemDetailsCommon = (props: SearchListItemDetailsCommonProps) => {
    const { data } = props;

    if (typeof data === "string" && data.length > 0) {
      return memoRender(props);
    }

    if (typeof data === "number") {
      return memoRender(props);
    }

    return null;
  };
  return _SearchListItemDetailsCommon;
};

const SearchListItemDetailsFullwidthItemWrapper = styled.div`
  grid-column: span var(--columns);
  grid-row: span 1;
`;
const _SearchListItemDetailsFullwidthItem = SearchListItemDetailsCommon(SearchListItemDetailsFullwidthItemWrapper);
const SearchListItemDetailsFullwidthItem = (props: SearchListItemDetailsCommonProps) => {
  return _SearchListItemDetailsFullwidthItem(props);
};
const SearchListItemDetailsSmallItemWrapper = styled.div`
  grid-column: span 4;
  grid-row: span 1;
`;
const _SearchListItemDetailsSmallItem = SearchListItemDetailsCommon(SearchListItemDetailsSmallItemWrapper);
const SearchListItemDetailsSmallItem = (props: SearchListItemDetailsCommonProps) => {
  return _SearchListItemDetailsSmallItem(props);
};

export { SearchListItemDetailsFullwidthItem, SearchListItemDetailsSmallItem };
