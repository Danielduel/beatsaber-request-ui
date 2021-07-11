import React from "react";
import styled from "styled-components";

const SongListItemCoverImageWrapper = styled.div`
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

const SongListItemCoverImage = ({ coverURL }: { coverURL: string }): JSX.Element => {
  return (
    <SongListItemCoverImageWrapper>
      <img src={coverURL} />
    </SongListItemCoverImageWrapper>
  );
};

export { SongListItemCoverImage };
