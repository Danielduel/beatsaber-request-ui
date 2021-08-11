import React from "react";
import styled from "styled-components";
// @ts-ignore-next-line
import loadingGif from "./static/loading.gif";
import baseImg from "./static/base.png";
import notfoundImg from "./static/notfound.png";

const SongListItemCoverImageWrapper = styled.div`
  grid-area: cover-image;
  width: 91px;
  height: 91px;
  min-width: 91px;
  max-width: 91px;

  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  border-right: 1px solid var(--border);

  & > img {
    width: 91px;
    height: 91px;
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

const SongListItemCoverImageImg = styled.img`
  background-position: center;
  background-size: contain;
  background-image: url(${baseImg});
`;

const SongListItemCoverImageImgBg = styled.img`
  opacity: 0;
  transition: opacity 0.3s linear;
`;

const SongListItemCoverImageLoading = styled.img`
  position: absolute;
  transition: opacity 0.3s linear;
  opacity: 1;
`;

const SongListItemCoverImage = ({ coverURL }: { coverURL: string }): JSX.Element => {
  const loaderRef = React.useRef<null | HTMLImageElement>(null);
  const onError = React.useCallback<React.ReactEventHandler<HTMLImageElement>>((event) => {
    event.currentTarget.src = notfoundImg;
    if (loaderRef.current) {
      loaderRef.current.style.opacity = "0";
    }
  }, [loaderRef]);
  const onLoad = React.useCallback(() => {
    if (loaderRef.current) {
      loaderRef.current.style.opacity = "0";
    }
  }, [loaderRef]);

  return (
    <SongListItemCoverImageWrapper>
      <SongListItemCoverImageImg src={coverURL} onLoad={onLoad} onError={onError} />
      <SongListItemCoverImageLoading ref={loaderRef} src={loadingGif} />
    </SongListItemCoverImageWrapper>
  );
};

const SongListItemCoverImageBackground = ({ coverURL }: { coverURL: string }): JSX.Element => {  
  const onLoad = React.useCallback((event) => {
    event.currentTarget.style.opacity = "1";
  }, [])

  return (
    <SongListItemCoverImageBackgroundWrapper>
      <SongListItemCoverImageImgBg src={coverURL} onLoad={onLoad} />
    </SongListItemCoverImageBackgroundWrapper>
  );
};
export { SongListItemCoverImage, SongListItemCoverImageBackground };
