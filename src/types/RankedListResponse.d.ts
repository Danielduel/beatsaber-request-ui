export type RankedDiffEnum = |
  "_ExpertPlus_SoloStandard" |
  "_Expert_SoloStandard" |
  "_Hard_SoloStandard" |
  "_Normal_SoloStandard" |
  "_Easy_SoloStandard";
export type RankedListResponseItem = {
  uid: number;
  id: string; // hash "1F723CED1FF1748A947972A603532D15BB8F6804",
  name: string;
  songSubName: string;
  songAuthorName: string;
  levelAuthorName: string;
  bpm: number;
  diff: RankedDiffEnum;
  scores: string;
  scores_day: number;
  ranked: number; // bool-like
  stars: nuber;
  image: string; // cover image
};
export type RankedListResponse = {
  songs: RankedListResponseItem[];
};
