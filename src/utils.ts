import { SongListType } from "./pages/SearchPage/SearchPage";

export function fetchSongs(query = "", automapper = "0"): Promise<SongListType> {
  const url = `https://beatsaver.com/api/search/text/0?q=${query}&automapper=${automapper}`;

  return fetch(url)
    .then(function (response) {
      if (response.status !== 200) {
        console.log(`Looks like there was a problem. Status Code: ${response.status}`);
        throw `Looks like there was a problem. Status Code:  ${response.status}`;
      }

      // Examine the text in the response
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      return data;
    })
    .catch(function (err) {
      console.log("Fetch Error :-S", err);
    });
}

export function isNotNull<T>(something: T | null): something is T {
  return something !== null;
}

// Trimmed LowerCase
const stringTLC = (s: string) => s.toLocaleLowerCase().trim();

const autoMappers = ["Beat Sage", "Deep Saber"];
const autoMappersTLC = autoMappers.map(stringTLC);

export const isCreatedByAutomapper = (songName: string, songAuthorName: string, levelAuthorName: string) => {
  const songNameTLC = stringTLC(songName);
  const songAuthorNameTLC = stringTLC(songAuthorName);
  const levelAuthorNameTLC = stringTLC(levelAuthorName);

  return autoMappersTLC.some((autoMapperTLC) => {
    return (
      songNameTLC.includes(autoMapperTLC) ||
      songAuthorNameTLC.includes(autoMapperTLC) ||
      levelAuthorNameTLC.includes(autoMapperTLC)
    );
  });
};
