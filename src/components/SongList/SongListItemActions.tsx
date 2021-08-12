import React from "react";
import styled from "styled-components";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { Translation } from "react-i18next";
import { CopyIcon } from "../../common/icons/CopyIcon";
import { SongListItemContext } from "./SongListItemContext";
import { Button } from "../Buttons/Button";

const CopyButton = styled(Button)`
  margin-left: 12px;
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
  const { copied, setCopied } = React.useContext(SongListItemContext);
  return (
    <SongListItemActionGroupWrapper>
      <CopyToClipboard text={`!bsr ${bsrKey}`} onCopy={() => setCopied(true)}>
        <CopyButton style={{ backgroundColor: isRanked ? "var(--background-secondary-buttonover)" : "invalid-color" }}>
          <CopyButtonText>
            <Translation>{(t) => (copied ? t("Copied") : t("Copy"))}</Translation>
          </CopyButtonText>
          <CopyIcon />
        </CopyButton>
      </CopyToClipboard>
    </SongListItemActionGroupWrapper>
  );
};

export { SongListItemActions };
