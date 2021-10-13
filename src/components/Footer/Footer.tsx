import React, { useContext } from "react";
import AppEnvContext from "../../AppEnvContext";
import { ScoreSaberBar } from "../ScoreSaberBar/ScoreSaberBar";
import { FooterWrapper } from "./FooterWrapper";

type FooterProps = {
  shouldRenderFooter: boolean;
};

const Footer = ({ shouldRenderFooter }: FooterProps): JSX.Element => {
  const { configuration } = useContext(AppEnvContext);
  if (!configuration || !configuration.broadcaster.scoreSaber) {
    return <></>;
  }

  return (
    <FooterWrapper shouldRenderFooter={shouldRenderFooter}>
      <ScoreSaberBar scoreSaberId={configuration.broadcaster.scoreSaber.id} />
    </FooterWrapper>
  );
};

export { Footer };
export type { FooterProps };
