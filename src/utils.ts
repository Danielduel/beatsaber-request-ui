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
