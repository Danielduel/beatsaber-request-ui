function _isLocalhost(): boolean {
  // I am assuming that development is done in standard browser
  if (!window) return false; // most likely in app
  if (!window.location) return false; // most likely in weird browser
  if (window.location.host.startsWith("localhost")) return true;
  return false;
}
export const isLocalhost = _isLocalhost();
export const twitchApiEndpoint = "https://api.twitch.tv";
export function wrapTwitchApiEndoint(url: string) {
  if (!isLocalhost) return twitchApiEndpoint + url;
  return url;
}
export const UNRANKED = [97223, 20506, 102179, 102180]; // wtf Umbra xD
