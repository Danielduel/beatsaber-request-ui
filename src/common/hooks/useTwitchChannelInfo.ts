import { wrapTwitchApiEndoint } from "../../constants";
import { AuthResponse } from "../../types/AuthResponse";
import { ChannelInfoResponse } from "../../types/ChannelInfoResponse";
import { createConfiguredEventHandler } from "../most/createConfiguredEventHandler";
import { useStreamSubscribe } from "./useStreamSubscribe";
import { TwitchExtAuthStream } from "./useTwitchExtOnAuthorized";

const fetchTwitchChannelInfo = (auth: AuthResponse): Promise<ChannelInfoResponse> => {
  return new Promise((resolve, reject) => {
    return fetch(wrapTwitchApiEndoint(`/kraken/channels/${auth.channelId}`), {
      method: "GET",
      headers: {
        "Accept": "application/vnd.twitchtv.v5+json",
        "Client-ID": auth.clientId
      }
    })
      .then((response) => response.json())
      .then((data) => resolve(data))
      .catch((err) => {
        console.error(err);
        return reject(null);
      });
  });
};

function useTwitchChannelInfo(twitchExtAuth$: TwitchExtAuthStream) {
  const { handler, stream: data$ } = createConfiguredEventHandler<ChannelInfoResponse>();
  useStreamSubscribe(twitchExtAuth$, (auth) => {
    fetchTwitchChannelInfo(auth).then(handler);
  });

  return [data$] as const;
}

export { useTwitchChannelInfo, fetchTwitchChannelInfo };
