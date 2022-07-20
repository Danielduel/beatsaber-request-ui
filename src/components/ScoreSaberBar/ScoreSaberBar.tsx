import React from "react";
import emojiFlags from "emoji-flags";
import styled from "styled-components";
import { ScoreSaber } from "../../integrations/scoresaber/scoreSaberTypes";
import { useRefetchingData } from "../../common/hooks/useRefetchingData";
import { scoreSaberFetchBasicPlayerData } from "../../integrations/scoresaber/scoreSaberFetchBasicPlayerData";
import { useStreamSubscribe } from "../../common/hooks/useStreamSubscribe";
import { getScoresaberAvatarUrl } from "../../common/utils/getScoresaberAvatarUrl";
import { Button } from "../Buttons/Button";

type ScoreSaberBarProps = {
  scoreSaberId: string;
  withoutReload?: boolean;
};

const ScoreSaberBarWrapper = styled.div`
  display: flex;
  flex-direction: row;
  height: 100%;
  margin: 0em 0.5em;
  align-items: center;
`;

const ScoreSaberBarWrapperNoResults = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 100%;
  width: 100%;
  padding: 1rem;
`;

const ScoreSaberBarPlayerAvatar = styled.img`
  height: 5em;
  border-radius: 1em;
`;

const ScoreSaberBarPlayerDataContainer = styled.div`
  height: 100%;
  width: 100%;
  padding: 1em 0 0 0.5em;
  box-sizing: border-box;
`;

const ScoreSaberBarPlayerName = styled.div`
  font-size: 1.1em;
`;

const ScoreSaberBarPlayerRanking = styled.div`
  font-size: 0.9em;
`;

const ScoreSaberBarPlayerPP = styled.div`
  font-family: "consolas";
`;

const ScoreSaberBarPlayerActionContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: flex-end;
  justify-content: flex-end;
`;

const ScoreSaberBarPlayerReload = styled(Button)``;

// https://scoresaber.com/imports/images/usr-avatars/76561198023909718.jpg
const _ScoreSaberBar = ({ scoreSaberId, withoutReload }: ScoreSaberBarProps) => {
  const [scoreSaberBasicPlayerData, setScoreSaberBasicPlayerData] =
    React.useState<null | ScoreSaber.BasicPlayerResponse>(null);
  const [scoreSaberBasicPlayerData$, refetchScoreSaberBasicPlayerData] = useRefetchingData(
    scoreSaberFetchBasicPlayerData(scoreSaberId)
  );
  useStreamSubscribe(scoreSaberBasicPlayerData$, setScoreSaberBasicPlayerData);

  if (!scoreSaberBasicPlayerData || !scoreSaberBasicPlayerData.playerInfo) {
    return <ScoreSaberBarWrapperNoResults>Can't find this player</ScoreSaberBarWrapperNoResults>;
  }

  const avatarUrl = getScoresaberAvatarUrl(scoreSaberBasicPlayerData?.playerInfo.avatar ?? "");

  const { playerName, rank, country, countryRank, pp } = scoreSaberBasicPlayerData.playerInfo;
  const emojiFlag = emojiFlags.countryCode(country).emoji ?? "❓";

  return (
    <ScoreSaberBarWrapper>
      <ScoreSaberBarPlayerAvatar src={avatarUrl} />
      <ScoreSaberBarPlayerDataContainer>
        <ScoreSaberBarPlayerName>{playerName}</ScoreSaberBarPlayerName>
        <ScoreSaberBarPlayerRanking>
          🌎 {rank} ({emojiFlag} {countryRank})
        </ScoreSaberBarPlayerRanking>
        <ScoreSaberBarPlayerPP>{pp}pp</ScoreSaberBarPlayerPP>
      </ScoreSaberBarPlayerDataContainer>
      {!withoutReload && (
        <ScoreSaberBarPlayerActionContainer>
          <ScoreSaberBarPlayerReload onClick={refetchScoreSaberBasicPlayerData}>Reload</ScoreSaberBarPlayerReload>
        </ScoreSaberBarPlayerActionContainer>
      )}
    </ScoreSaberBarWrapper>
  );
};

const ScoreSaberBar = ({ scoreSaberId, withoutReload }: ScoreSaberBarProps) => {
  if (!scoreSaberId) {
    return <ScoreSaberBarWrapperNoResults>ScoreSaber ID is empty</ScoreSaberBarWrapperNoResults>;
  }

  return <_ScoreSaberBar scoreSaberId={scoreSaberId} withoutReload={withoutReload} />;
};

export { ScoreSaberBar };
