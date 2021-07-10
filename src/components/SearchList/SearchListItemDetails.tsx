import React from "react";
import styled, { css } from "styled-components";

type SearchListItemDetailsSpanVariant = "title" | "subtitle" | "item";
type SearchListItemDetailsSpanProps = {
  variant: SearchListItemDetailsSpanVariant;
};
const SearchListItemDetailsSpan = styled.span<SearchListItemDetailsSpanProps>`
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
const SearchListItemDetailsFullwidthItemWrapper = styled.div`
  grid-column: span var(--columns);
  grid-row: span 1;
`;
const SearchListItemDetailsFullwidthItem = ({
  data,
  suffix,
  variant
}: {
  data: string | null | undefined;
  suffix: string;
  variant: SearchListItemDetailsSpanVariant;
}) => {
  if (typeof data === "string" && data.length > 0) {
    return (
      <SearchListItemDetailsFullwidthItemWrapper>
        <SearchListItemDetailsSpan variant={variant}>
          {data}&nbsp;{suffix}
        </SearchListItemDetailsSpan>
      </SearchListItemDetailsFullwidthItemWrapper>
    );
  }
  return null;
};
const SearchListItemDetailsSmallItemWrapper = styled.div`
  grid-column: span 4;
  grid-row: span 1;
`;
const SearchListItemDetailsSmallItem = ({
  data,
  suffix,
  variant
}: {
  data: string | null | undefined | number;
  suffix: string;
  variant: SearchListItemDetailsSpanVariant;
}) => {
  if (typeof data === "string" && data.length > 0) {
    return (
      <SearchListItemDetailsSmallItemWrapper>
        <SearchListItemDetailsSpan variant={variant}>
          {data}&nbsp;{suffix}
        </SearchListItemDetailsSpan>
      </SearchListItemDetailsSmallItemWrapper>
    );
  }

  if (typeof data === "number") {
    return (
      <SearchListItemDetailsSmallItemWrapper>
        <SearchListItemDetailsSpan variant={variant}>
          {data}&nbsp;{suffix}
        </SearchListItemDetailsSpan>
      </SearchListItemDetailsSmallItemWrapper>
    );
  }

  return null;
};
const SearchListItemDetailsWrapper = styled.div`
  display: grid;
  width: 100%;
  --columns: 4;
  grid-template-columns: repeat(4, calc(100% / 4));

  @media (min-width: 380px) {
    --columns: 8;
    grid-template-columns: repeat(8, calc(100% / 8));
  }

  @media (min-width: 499px) {
    --columns: 12;
    grid-template-columns: repeat(12, calc(100% / 12));
  }
`;
type SearchListItemDetailsProps = {
  songName: string;
  songAuthorName: string;
  levelAuthorName: string;
  bsrKey: string;
  downloads: number;
  upVotes: number;
  downVotes: number;
  percentVotes: number;
  isRanked: boolean;
};
const SearchListItemDetails = ({
  songName,
  songAuthorName,
  levelAuthorName,
  bsrKey,
  downloads,
  upVotes,
  downVotes,
  percentVotes,
  isRanked
}: SearchListItemDetailsProps) => {
  return (
    <SearchListItemDetailsWrapper>
      <SearchListItemDetailsFullwidthItem variant="title" data={songName} suffix="" />
      <SearchListItemDetailsFullwidthItem variant="subtitle" data={songAuthorName} suffix="" />
      <SearchListItemDetailsFullwidthItem variant="subtitle" data={levelAuthorName} suffix="" />
      <SearchListItemDetailsSmallItem variant="item" data={bsrKey} suffix="🔑" />
      <SearchListItemDetailsSmallItem variant="item" data={downloads} suffix="💾" />
      <SearchListItemDetailsSmallItem variant="item" data={percentVotes} suffix="💯" />
      <SearchListItemDetailsSmallItem variant="item" data={upVotes} suffix="👍" />
      <SearchListItemDetailsSmallItem variant="item" data={downVotes} suffix="👎" />
      <SearchListItemDetailsSmallItem variant="item" data={isRanked ? "Ranked" : null} suffix="⭐" />
    </SearchListItemDetailsWrapper>
  );
};

export { SearchListItemDetails };
