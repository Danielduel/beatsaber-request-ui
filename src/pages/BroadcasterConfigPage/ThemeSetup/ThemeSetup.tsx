import React from "react";
import styled from "styled-components";
import { AppWrapper } from "../../../App";
import { ContainedApp } from "../../../ContainedApp";
import { BodyWithNavigation } from "../../../layouts/BodyWithNavigation";
import { ColorSchemeAutoCreator } from "./ColorSchemeAutoCreator";
import { ColorSchemeManualCreator } from "./ColorSchemeManualCreator";

const ContainerAppWrapper = styled.div`
  --background-primary: orange;

  ${AppWrapper}, ${BodyWithNavigation} {
    min-height: 500px !important;
    max-height: 500px !important;
  }
`;

export const ThemeSetup = () => {
  return (
    <>
      <ColorSchemeAutoCreator />
      <ColorSchemeManualCreator />
      <ContainerAppWrapper>
        <ContainedApp />
      </ContainerAppWrapper>
    </>
  );
};
