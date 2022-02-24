import { UNRANKED } from "../../constants";
import { ScoreSaber } from "./scoreSaberTypes";

export type RankedRecordMap = Record<string, unknown>;

const transformRankedResponse = (response: ScoreSaber.RankedListResponse): RankedRecordMap => {
  const intermediateData = response.songs
    .filter((song) => !UNRANKED.includes(song.uid))
    .map((song) => ({ hash: song.id }));

  return intermediateData.reduce(
    (result, item) => ({
      ...result,
      [item.hash.toLowerCase()]: {}
    }),
    {}
  );
};

const scoreSaberImportRankedMapsData = (): Promise<ScoreSaber.RankedListResponse> =>
  new Promise<ScoreSaber.RankedListResponse>((resolve, reject) =>
    // fetch("https://scoresaber.com/api.php?function=get-leaderboards&cat=1&limit=9999&ranked=1&page=1")
    // scoresaber has cors policy on this resource, loading that dynamically per version
    import("../../types/RankedListResponseMock.json")
      .then((data) => resolve(data as ScoreSaber.RankedListResponse))
      .catch((err) => {
        console.error(err);
        reject(err);
      })
  );

export { scoreSaberImportRankedMapsData, transformRankedResponse };
