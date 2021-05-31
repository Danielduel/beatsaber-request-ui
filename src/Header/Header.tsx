import React from "react";
import { Translation } from "react-i18next";
import styled from "styled-components";
import LayoutRow from "../common/LayoutRow";

const ChildrenContainer = styled.div`
  display: inline-flex;
  margin: auto auto;
  float: right;

  margin-top: 8px;
  margin-right: 10px;
  justify-content: flex-end;
  align-items: flex-end;
`;

const CloseButtonContainer = styled.div`
  background-color: white;
  line-height: 0;
  border-radius: 50%;
  cursor: pointer;
  margin-left: 10px;
`;

type HeaderProps = {
  togglePanel: ((state: boolean) => void) | null;
  children: JSX.Element | JSX.Element[];
};

const Header = ({ togglePanel, children }: HeaderProps): JSX.Element => {
  return (
    <LayoutRow isPrimary>
      <img className="Header-logo" src="https://beatsaver.com/beat_saver_logo_white.a01a4b8f.png" />

      <span className="Header-logotext">
        <Translation>{(t) => t("Powered by")}</Translation>
      </span>
      <ChildrenContainer>
        {children}
        {togglePanel && (
          <CloseButtonContainer onClick={() => togglePanel(false)}>
            <svg width="40" height="35" viewBox="0 0 40 35" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M36.25 0H3.75C1.67969 0 0 1.67969 0 3.75V31.25C0 33.3203 1.67969 35 3.75 35H36.25C38.3203 35 40 33.3203 40 31.25V3.75C40 1.67969 38.3203 0 36.25 0ZM29.7188 22.6953C30.0938 23.0703 30.0938 23.6797 29.7188 24.0547L26.5547 27.2188C26.1797 27.5938 25.5703 27.5938 25.1953 27.2188L20 21.9766L14.8047 27.2188C14.4297 27.5938 13.8203 27.5938 13.4453 27.2188L10.2812 24.0547C9.90625 23.6797 9.90625 23.0703 10.2812 22.6953L15.5234 17.5L10.2812 12.3047C9.90625 11.9297 9.90625 11.3203 10.2812 10.9453L13.4453 7.78125C13.8203 7.40625 14.4297 7.40625 14.8047 7.78125L20 13.0234L25.1953 7.78125C25.5703 7.40625 26.1797 7.40625 26.5547 7.78125L29.7188 10.9453C30.0938 11.3203 30.0938 11.9297 29.7188 12.3047L24.4766 17.5L29.7188 22.6953Z"
                fill="#714B7D"
              />
            </svg>
          </CloseButtonContainer>
        )}
      </ChildrenContainer>
    </LayoutRow>
  );
};

export default Header;
