import React from "react";
import styled, { css } from "styled-components";

type SongListItemDetailsSpanVariant = "title" | "subtitle" | "item";
type SongListItemDetailsSpanProps = {
  variant: SongListItemDetailsSpanVariant;
};
const SongListItemDetailsSpan = styled.span`
  ${({ variant }: SongListItemDetailsSpanProps) => {
    switch (variant) {
      case "title":
        return css`
          word-break: break-all;
          font-size: 1.2rem;
          color: var(--text);
        `;
      case "subtitle":
        return css`
          word-break: break-all;
          font-size: 0.7rem;
          color: var(--text-secondary);
          margin-left: 5px;
        `;
      case "item":
        return css`
          font-size: 1rem;
          color: var(--text);
          margin-left: 5px;
        `;
    }
  }}
`;

type SongListItemDetailsCommonProps = {
  data: string | null | undefined | number;
  suffix: string;
  variant: SongListItemDetailsSpanVariant;
};
const SongListItemDetailsCommon = (WrapperComponent: React.FunctionComponent) => {
  const memoRender = ({ variant, data, suffix }: SongListItemDetailsCommonProps) => (
    <WrapperComponent>
      <SongListItemDetailsSpan variant={variant}>
        {data}&nbsp;{suffix}
      </SongListItemDetailsSpan>
    </WrapperComponent>
  );

  const _SongListItemDetailsCommon = (props: SongListItemDetailsCommonProps) => {
    const { data } = props;

    if (typeof data === "string" && data.length > 0) {
      return memoRender(props);
    }

    if (typeof data === "number") {
      return memoRender(props);
    }

    return null;
  };
  return _SongListItemDetailsCommon;
};

const SongListItemDetailsFullwidthItemWrapper = styled.div`
  margin-left: 5px;
  grid-column: span var(--fullwidth-span);
  grid-row: span 1;
`;
const _SongListItemDetailsFullwidthItem = SongListItemDetailsCommon(SongListItemDetailsFullwidthItemWrapper);
const SongListItemDetailsFullwidthItem = (
  props: SongListItemDetailsCommonProps
): ReturnType<typeof _SongListItemDetailsFullwidthItem> => {
  return _SongListItemDetailsFullwidthItem(props);
};
const SongListItemDetailsSmallItemWrapper = styled.div`
  margin-left: 10px;
  grid-column: span var(--small-span);
  grid-row: span 1;
`;
const _SongListItemDetailsSmallItem = SongListItemDetailsCommon(SongListItemDetailsSmallItemWrapper);
const SongListItemDetailsSmallItem = (
  props: SongListItemDetailsCommonProps
): ReturnType<typeof _SongListItemDetailsSmallItem> => {
  return _SongListItemDetailsSmallItem(props);
};

export { SongListItemDetailsFullwidthItem, SongListItemDetailsSmallItem };
