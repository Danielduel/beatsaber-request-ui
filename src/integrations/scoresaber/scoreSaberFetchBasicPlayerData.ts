import { ScoreSaber } from "./scoreSaberTypes";

const scoreSaberFetchBasicPlayerData = (playerId: string): Promise<ScoreSaber.BasicPlayerResponse> => {
  return new Promise((resolve, reject) => {
    fetch(`https://new.scoresaber.com/api/player/${playerId}/basic`)
      .then((res) => res.json())
      .then(resolve)
      .catch(reject);
  });
}

export { scoreSaberFetchBasicPlayerData };
