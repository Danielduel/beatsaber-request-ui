// this file contains parts of app that were unused, but are valuable as an example in future

// const channelExtConfigObservable = Rx.from(
//   new Promise((resolve, reject) => {
//     // https://api.twitch.tv/extensions/<client ID>/configurations/channels/<channel ID>
//     authObservable.subscribe((auth) => {
//       return fetch(wrapTwitchApiEndoint(`/extensions/${auth.clientId}/configurations/channels/${auth.channelId}`), {
//         method: "GET",
//         headers: {
//           "Authorization": `Bearer ${auth.token}`,
//           "client-id": auth.clientId,
//           "content-type": "application/json"
//         }
//       })
//         .then((response) => response.json())
//         .then((data) => resolve(data))
//         .catch((err) => {
//           console.error(err);
//           return reject(null);
//         });
//     });
//   })
// );


// const getBroadcasterConfig = (config: RawConfigResponse) =>
//   Object.entries(config).find(([, value]) => value?.segment?.segment_type === "broadcaster");

// const configDataSegmentedSubscribe = (setState: SetConfigState) => (configData: any) => {
//   if (!configData) return;
//   // TODO - check if configData is RawConfigResponse or an Error
//   const configBroadcaster = getAndParseBroadcasterConfigSegmented(configData as RawConfigResponse);
//   if (!configBroadcaster) {
//     // bad config -> set default // DON'T
//     // setState((_oldState) => ({ ..._oldState, configBroadcaster: defaultBroadcasterConfig }));
//     return;
//   }
//   setState((_oldState) => ({ ..._oldState, configBroadcaster }));
// };
// const configDataSubscribe = (setState: SetConfigState) => (configData: string) => {
//   const configBroadcaster = getAndParseBroadcasterConfig(configData);
//   setState((_oldState) => ({ ..._oldState, configBroadcaster }));
// };

// const getAndParseBroadcasterConfigSegmented = (config: RawConfigResponse): ConfigBroadcaster | null => {
//   const broadcasterConfigEntry = getBroadcasterConfig(config);
//   if (broadcasterConfigEntry) {
//     const [, broadcasterConfig] = broadcasterConfigEntry;
//     const content = broadcasterConfig.record.content;
//     return getAndParseBroadcasterConfig(content);
//   }
//   // return defaultBroadcasterConfig;
//   return null;
// };