import React from "react";
import styled from "styled-components";

const InfoPageWrapper = styled.div`
  display: flex;
  align-items: center;
  padding: 20px 10px;
`;

export default function InfoPage(): JSX.Element {
  return (
    <InfoPageWrapper>
      Version: 0.0.4 (very alpha)
      <br />
      <br />
      <br />
      You can post issues or feature requests here: https://github.com/Duelsik/beatsaber-request-ui/issues
      <br />
      <br />
      <br />
      This extension is opensource! https://github.com/Duelsik/beatsaber-request-ui
      <br />
      <br />
      <br />
      If you want to help with translations - feel free to create an issue on github to get in touch
    </InfoPageWrapper>
  );
}
