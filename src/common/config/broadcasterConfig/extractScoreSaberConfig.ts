import { BroadcasterConfiguration } from "./BroadcasterConfiguration";

function extractScoreSaberConfig(broadcasterConfigString: string): BroadcasterConfiguration.ScoreSaber | null {
  const scoreSaberConfig = broadcasterConfigString.split(";").find((part) => part.startsWith("ss://"));

  if (!scoreSaberConfig) {
    return null;
  }

  const withoutPrefix = scoreSaberConfig.split("ss://")[1];
  const readArr = withoutPrefix.split("|");

  return {
    id: readArr[0]
  };
}

export { extractScoreSaberConfig };
