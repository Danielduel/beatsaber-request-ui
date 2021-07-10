import React from "react";
import styled from "styled-components";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { Translation } from "react-i18next";
import { CopyIcon } from "../../common/icons/CopyIcon";

const CopyButton = styled.button`
  outline: none;
  box-sizing: border-box;
  height: 40px;
  padding: 10px 10px;
  margin-left: 12px;
  border-radius: 20px;
  border: 0px solid transparent;
  cursor: pointer;

  font-weight: normal;
  font-size: 0.8rem;
  color: var(--text);
  background-color: var(--background-input);
  opacity: 0.9;

  display: inline-flex;
  justify-content: space-between;
  align-items: center;
  transition: width 0.03s linear;

  & > svg {
    width: 20px;
    height: 20px;
  }

  &:hover {
    opacity: 1;
  }
`;

const CopyButtonText = styled.span`
  margin-right: 5px;
`;

const PostCopyTooltip = styled.div`
  position: absolute;
  margin-top: 2px;
  height: 90%;
  top: 0;
  right: 3px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #ddd;
  padding: 0 10px;
  border: 0px solid transparent;
  border-radius: 10px;
`;

const SearchListItemActionGroupWrapper = styled.div`
  grid-area: action-group;

  margin-left: auto;
  margin-right: 10px;
  flex: 100 0;
  align-self: center;
  text-align: center;
  min-width: 90px;
`;

type SearchListItemActionsProps = {
  bsrKey: string;
  isRanked: boolean;
};
const SearchListItemActions = ({
  bsrKey,
  isRanked
}: SearchListItemActionsProps) => {
  const [copied, setCopied] = React.useState(false);
  return (
    <SearchListItemActionGroupWrapper>
      {!copied ? (
        <CopyToClipboard text={`!bsr ${bsrKey}`} onCopy={() => setCopied(true)}>
          <CopyButton
            style={{ backgroundColor: isRanked ? "var(--background-secondary-buttonover)" : "invalid-color" }}
          >
            <CopyButtonText>
              <Translation>{(t) => t("Copy")}</Translation>
            </CopyButtonText>
            <CopyIcon />
          </CopyButton>
        </CopyToClipboard>
      ) : (
        <PostCopyTooltip>
          <Translation>{(t) => t("Paste on chat")}</Translation>
          <br />
          <Translation>{(t) => t("to make request")}</Translation>
        </PostCopyTooltip>
      )}
    </SearchListItemActionGroupWrapper>
  );
};

export { SearchListItemActions };
