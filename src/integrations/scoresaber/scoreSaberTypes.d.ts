/**
  Response example (7 September 2021)
  {
    "playerInfo": {
      "playerId": "76561198023909718",
      "playerName": "Totally common screw.",
      "avatar": "/api/static/avatars/76561198023909718.jpg",
      "rank": 1903,
      "countryRank": 33,
      "pp": 9579.48,
      "country": "PL",
      "role": "",
      "badges": [],
      "history": "2221,2207,2207,2150,2150,2136,2133,2135,2147,2152,2150,2152,2111,2111,2119,2113,2104,2103,2108,2116,2120,2090,2094,2079,2081,2049,2052,2027,2030,2021,2025,2027,1977,1969,1974,1958,1957,1953,1958,1941,1946,1949,1958,1921,1923,1918,1919,1912,1916",
      "permissions": 0,
      "inactive": 0,
      "banned": 0
    }
  }
*/

export namespace ScoreSaber {
  export type PlayerInfo = {
    playerId: string;
    playerName: string;
    avatar: string;
    rank: number;
    countryRank: number;
    pp: number;
    country: string;
    // not sure if "role" is literal enum
    // or just cleartext from backend perspective
    role: string | "Quality Assurance Team";
    badges: unknown[],
    history: string;
    permissions: number; // 0 is no, 2 is Cerret, Umbranox(superadmin) 63, most likely it is couple bit flags
    inactive: number; // most likely 0 or 1
    banned: number; // most likely 0 or 1
  }
  export type BasicPlayerResponse = {
    playerInfo: PlayerInfo
  }
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
    ranked: number; // most likely 0 or 1
    stars: nuber;
    image: string; // cover image
  };
  export type RankedListResponse = {
    songs: RankedListResponseItem[];
  };
}
