import React from "react";
import styled from "styled-components";

const SearchListItemCoverImageWrapper = styled.div`
  grid-area: cover-image;

  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  border-right: 1px solid var(--border);

  & > img {
    width: 91px;
    max-height: 91px;
  }
`;

const SearchListItemCoverImage = ({ coverURL }: { coverURL: string }) => {
  return (
    <SearchListItemCoverImageWrapper>
      <img src={coverURL} />
    </SearchListItemCoverImageWrapper>
  );
};

export { SearchListItemCoverImage };
