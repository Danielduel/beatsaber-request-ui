import React from "react";
import styled from "styled-components";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { useTranslation } from "react-i18next";
import { CopyIcon } from "../../common/icons/CopyIcon";
import { SongListItemContext } from "./SongListItemContext";
import { Button } from "../Buttons/Button";
import AppEnvContext from "../../AppEnvContext";
import { ForwardIcon } from "../../common/icons/ForwardIcon";

const RequestButton = styled(Button)`
  margin-left: 12px;
`;

const CopyButton = styled(Button)`
  margin-left: 12px;
`;

const ForwardIconStyled = styled(ForwardIcon)`
  transform: scale(1);
  display: inline;
`;

const RequestButtonText = styled.span`
  margin-right: 5px;
`;

const CopyButtonText = styled.span`
  margin-right: 5px;
`;

const SongListItemActionGroupWrapper = styled.div`
  grid-area: action-group;

  margin-left: auto;
  margin-right: 10px;
  flex: 100 0;
  align-self: center;
  text-align: center;
  min-width: 90px;
`;

type SongListItemActionsProps = {
  bsrKey: string;
  isRanked: boolean;
};
const SongListItemActions = ({ bsrKey, isRanked }: SongListItemActionsProps): JSX.Element => {
  const [t] = useTranslation();
  const { srmBridgeChannel, userId } = React.useContext(AppEnvContext);
  const { copied, setCopied } = React.useContext(SongListItemContext);
  const useBridge = true;
  if (useBridge) {
    const endpoint = "https://srm-bridge.test:9092/request";
    return (
      <SongListItemActionGroupWrapper>
        <RequestButton
          style={{ backgroundColor: isRanked ? "var(--background-secondary-buttonover)" : "invalid-color" }}
          onClick={() =>
            fetch(endpoint, {
              method: "POST",
              headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
              },
              body: JSON.stringify({
                srmBridgeChannel,
                bsrKey,
                userId
              })
            })
          }
        >
          <RequestButtonText>Request</RequestButtonText>
          <ForwardIconStyled />
        </RequestButton>
      </SongListItemActionGroupWrapper>
    );
  }

  return (
    <SongListItemActionGroupWrapper>
      <CopyToClipboard text={`!bsr ${bsrKey}`} onCopy={() => setCopied(true)}>
        <CopyButton style={{ backgroundColor: isRanked ? "var(--background-secondary-buttonover)" : "invalid-color" }}>
          <CopyButtonText>{copied ? t("Copied") : t("Copy")}</CopyButtonText>
          <CopyIcon />
        </CopyButton>
      </CopyToClipboard>
    </SongListItemActionGroupWrapper>
  );
};

export { SongListItemActions };
