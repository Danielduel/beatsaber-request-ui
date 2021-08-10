import React from "react";
import { SongListContainer } from "../../components/SongList/SongListContainer";
import AppEnvContext, { RankedRecordMap } from "../../AppEnvContext";
import { SongListItem } from "../../components/SongList/SongListItem";
import { isCreatedByAutomapper } from "../../utils";
import { LayoutRowBase } from "../../components/LayoutRow/LayoutRow";
import styled from "styled-components";
import { usePaginatedData } from "../../components/SongList/usePaginatedData";

const BeatfollowerPageContainer = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const SubnavigationContainer = styled.div`
  margin: 10px 5px 2px 5px;
`;

const StyledSelect = styled.select`
  max-width: 100%;
  position: relative;
  box-sizing: border-box;
  height: 40px;
  background-color: var(--background-input);
  border: 1px solid var(--border);
  border-radius: 20px;
  color: var(--text);
  font-size: 1.2rem;
  padding: 5px 40px 5px 20px;

  outline: none;
  -moz-appearance: none; /* Firefox */
  -webkit-appearance: none; /* Safari and Chrome */
  appearance: none;
`;

type BeatfollowerTopPlayedResponseItemBody = {
  _id: string;
  easy: boolean;
  normal: boolean;
  hard: boolean;
  expert: boolean;
  expertPlus: boolean;
  wipMap: boolean;
  ost: boolean;
  songDuration: string;
  songName: string;
  songSubName: string;
  songAuthorName: string;
  levelAuthorName: string;
  hash: string;
  coverUrl: string;
  key: string;
  __v: number;
};
type BeatfollowerTopPlayedResponseItem = {
  count: number;
  song: BeatfollowerTopPlayedResponseItemBody;
};
type BeatfollowerTopPlayedResponse = BeatfollowerTopPlayedResponseItem[];

const Item = (rankedHashes: RankedRecordMap) => {
  const _Item = (_data: BeatfollowerTopPlayedResponseItem) => {
    const data = _data.song;

    const coverURL = `https://beatsaver.com${data.coverUrl}`;
    const shouldBeHidden = isCreatedByAutomapper(data.songName, data.songAuthorName, data.levelAuthorName);

    if (shouldBeHidden) return <></>;

    const isRanked = !!rankedHashes[data.hash.toLowerCase()];
    return (
      <SongListItem
        hash={data.hash}
        coverURL={coverURL}
        songName={data.songName}
        songAuthorName={data.songAuthorName}
        levelAuthorName={data.levelAuthorName}
        bsrKey={data.key}
        downloads={null}
        upVotes={null}
        downVotes={null}
        percentVotes={null}
        isRanked={isRanked}
        easy={!!data.easy}
        normal={!!data.normal}
        hard={!!data.hard}
        expert={!!data.expert}
        expertPlus={!!data.expertPlus}
      />
    );
  };
  return _Item;
};

const _ItemList = ({
  results,
  rankedHashes
}: {
  results: BeatfollowerTopPlayedResponse;
  rankedHashes: RankedRecordMap;
}) => {
  const renderedItems = results.map(Item(rankedHashes));

  return <SongListContainer>{renderedItems}</SongListContainer>;
};

function ItemList({ results }: { results: null | BeatfollowerTopPlayedResponse }): JSX.Element | null {
  if (results) {
    return (
      <AppEnvContext.Consumer>
        {(context) => (
          <_ItemList results={results as BeatfollowerTopPlayedResponse} rankedHashes={context.rankedHashes} />
        )}
      </AppEnvContext.Consumer>
    );
  }
  return null;
}

type TabVariant =
  | "top/played/today"
  | "top/played/week"
  | "top/played/month"
  | "top/played/alltime"
  | "top/recommended/today"
  | "top/recommended/week"
  | "top/recommended/month"
  | "top/recommended/alltime";

const mapResponsesToItems = (pages: BeatfollowerTopPlayedResponse[]): BeatfollowerTopPlayedResponseItem[] => {
  return pages.flatMap((page) => {
    return page.flat();
  });
};

export default function BeatfollowerPage(): JSX.Element {
  const [tab, setTab] = React.useState<TabVariant>("top/played/week");

  const getUrl = React.useCallback(() => {
    return `https://api.beatfollower.com/${tab}`;
  }, [tab]);

  const [results, isFetching, isError, initialFetch, , clearData] = usePaginatedData(getUrl, mapResponsesToItems, {
    initialPageNumber: 0
  });

  React.useEffect(() => {
    initialFetch();
  }, [initialFetch]);

  const selectOnChange = React.useCallback(
    (value: React.ChangeEvent<HTMLSelectElement>) => {
      value?.currentTarget?.blur();
      const newTab = value.target.value;
      clearData();
      setTab(newTab as TabVariant);
    },
    [setTab, clearData]
  );

  return (
    <BeatfollowerPageContainer>
      <LayoutRowBase>
        <SubnavigationContainer>
          <StyledSelect value={tab} onChange={selectOnChange}>
            {/* <option value="recommendation/PiercyTTV/0/50">Recommendations from PiercyTTV</option>
            <option value="recommendation/Danielduel/0/50">Recommendations from Danielduel</option>
            <option value="recommendation/LicensedCrime/0/50">Recommendations from LicensedCrime</option>
            <option value="recommendation/Taragon123/0/50">Recommendations from Taragon123</option>
            <option value="recommendation/phat32/0/50">Recommendations from phat32</option> */}
            <option value="top/played/today">Top played today</option>
            <option value="top/played/week">Top played this week</option>
            <option value="top/played/month">Top played this month</option>
            <option value="top/played/alltime">Top played alltime</option>
            <option value="top/recommended/today">Top recommended today</option>
            <option value="top/recommended/week">Top recommended this week</option>
            <option value="top/recommended/month">Top recommended this month</option>
            <option value="top/recommended/alltime">Top recommended alltime</option>
          </StyledSelect>
        </SubnavigationContainer>
      </LayoutRowBase>
      <SongListContainer>
        <ItemList results={results} />
        {isFetching ?? "Fetching..."}
        {isError ?? "Error!"}
      </SongListContainer>
    </BeatfollowerPageContainer>
  );
}
