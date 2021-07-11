import React from "react";
import { SongListContainer } from "../../components/SongList/SongListContainer";

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

export default function BeatfollowerPage(): JSX.Element {
  const [results, setResults] = React.useState<null | BeatfollowerTopPlayedResponse>(null);

  React.useEffect(() => {
    fetch("https://api.beatfollower.com/top/played/Week")
      .then((res) => res.json())
      .then((data) => setResults(data));
  }, []);

  return <SongListContainer>{JSON.stringify(results)}</SongListContainer>;
}
