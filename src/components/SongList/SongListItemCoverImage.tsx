import React from "react";
import styled from "styled-components";
import img from "./static/notfound.png";

const SongListItemCoverImageWrapper = styled.div`
  grid-area: cover-image;
  width: 91px;
  min-width: 91px;
  max-width: 91px;

  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  border-right: 1px solid var(--border);

  & > img {
    width: 91px;
    min-width: 91px;
    max-width: 91px;
    max-height: 91px;
  }
`;

const SongListItemCoverImageBackgroundWrapper = styled.div`
  opacity: 0.05;
  position: absolute;
  overflow: hidden;
  width: 100%;
  height: 100%;

  display: flex;
  justify-content: center;
  align-items: center;

  & > img {
    width: 100%;
  }
`;

const SongListItemCoverImage = ({ coverURL }: { coverURL: string }): JSX.Element => {
  const onError = React.useCallback<React.ReactEventHandler<HTMLImageElement>>((event) => {
    event.currentTarget.src = img;
  }, []);
  
  return (
    <SongListItemCoverImageWrapper>
      <img src={coverURL} onError={onError} />
    </SongListItemCoverImageWrapper>
  );
};

const SongListItemCoverImageBackground = ({ coverURL }: { coverURL: string }): JSX.Element => {
  return (
    <SongListItemCoverImageBackgroundWrapper>
      <img src={coverURL} />
    </SongListItemCoverImageBackgroundWrapper>
  );
};
export { SongListItemCoverImage, SongListItemCoverImageBackground };
