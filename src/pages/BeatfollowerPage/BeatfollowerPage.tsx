import React from "react";
import { SongListContainer } from "../../components/SongList/SongListContainer";
import AppEnvContext, { RankedRecordMap } from "../../AppEnvContext";
import { SongListItem } from "../../components/SongList/SongListItem";
import { isCreatedByAutomapper } from "../../utils";

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
        {(context) => <_ItemList results={results as BeatfollowerTopPlayedResponse} rankedHashes={context.rankedHashes} />}
      </AppEnvContext.Consumer>
    );
  }
  return null;
}

type TabVariant = "top/played/today" | "top/played/week" | "top/played/month" | "top/played/alltime" | "top/recommended/today" | "top/recommended/week" | "top/recommended/month" | "top/recommended/alltime";
export default function BeatfollowerPage(): JSX.Element {
  const [tab, setTab] = React.useState<TabVariant>("top/played/week")
  const [results, setResults] = React.useState<null | BeatfollowerTopPlayedResponse>(null);

  const selectOnChange = React.useCallback(
    (value: React.ChangeEvent<HTMLSelectElement>) => {
      const newTab = value.target.value;
      setTab(newTab as TabVariant);
    },
    [setTab]
  );

  React.useEffect(() => {
    fetch(`https://api.beatfollower.com/${tab}`)
      .then((res) => res.json())
      .then((data) => setResults(data));
  }, [ tab, setResults ]);

  return (
    <div>
      <div>
        <select value={tab} onChange={selectOnChange}>
          <option value="recommendation/PiercyTTV/0/50">Recommendations from PiercyTTV</option>
          <option value="recommendation/Danielduel/0/50">Recommendations from Danielduel</option>
          <option value="recommendation/Taragon123/0/50">Recommendations from Taragon123</option>
          <option value="recommendation/phat32/0/50">Recommendations from phat32</option>
          <option value="top/played/today">Played today</option>
          <option value="top/played/today">Played today</option>
          <option value="top/played/week">Played week</option>
          <option value="top/played/month">Played month</option>
          <option value="top/played/alltime">Played alltime</option>
          <option value="top/recommended/today">Recommended today</option>
          <option value="top/recommended/week">Recommended week</option>
          <option value="top/recommended/month">Recommended month</option>
          <option value="top/recommended/alltime">Recommended alltime</option>
        </select>
      </div>
      <SongListContainer>
        <ItemList results={results} />
      </SongListContainer>
    </div>
  );
}
