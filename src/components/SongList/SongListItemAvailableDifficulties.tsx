import React from "react";
import styled, { css } from "styled-components";

type SongListItemAvailableDifficultiesDifficultyBadgeVariant = "E" | "N" | "H" | "X" | "X+";
const SongListItemAvailableDifficultiesDifficultyBadge = styled.div`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  font-weight: bolder;
  margin-top: 3px;
  margin-left: 3px;
  border-radius: 4px;

  width: 20px;
  height: 20px;
  ${({ variant }: { variant: SongListItemAvailableDifficultiesDifficultyBadgeVariant }) => {
    switch (variant) {
      case "E":
        return css`
          content: "E";
          background-color: paleturquoise;
        `;
      case "N":
        return css`
          content: "N";
          background-color: lightgreen;
        `;
      case "H":
        return css`
          content: "H";
          background-color: lightyellow;
        `;
      case "X":
        return css`
          content: "X";
          background-color: red;
          color: white;
        `;
      case "X+":
        return css`
          content: "X+";
          background-color: darkred;
          color: white;
        `;
    }
  }}
`;
const SongListItemAvailableDifficultiesWrapper = styled.div`
  height: 100%;
  margin: 5px;
`;
type SongListItemAvailableDifficultiesProps = {
  easy: boolean;
  normal: boolean;
  hard: boolean;
  expert: boolean;
  expertPlus: boolean;
};
const SongListItemAvailableDifficulties = ({
  easy,
  normal,
  hard,
  expert,
  expertPlus
}: SongListItemAvailableDifficultiesProps): JSX.Element => {
  return (
    <SongListItemAvailableDifficultiesWrapper>
      {easy && (
        <SongListItemAvailableDifficultiesDifficultyBadge variant="E">
          E
        </SongListItemAvailableDifficultiesDifficultyBadge>
      )}
      {normal && (
        <SongListItemAvailableDifficultiesDifficultyBadge variant="N">
          N
        </SongListItemAvailableDifficultiesDifficultyBadge>
      )}
      {hard && (
        <SongListItemAvailableDifficultiesDifficultyBadge variant="H">
          H
        </SongListItemAvailableDifficultiesDifficultyBadge>
      )}
      {expert && (
        <SongListItemAvailableDifficultiesDifficultyBadge variant="X">
          X
        </SongListItemAvailableDifficultiesDifficultyBadge>
      )}
      {expertPlus && (
        <SongListItemAvailableDifficultiesDifficultyBadge variant="X+">
          X+
        </SongListItemAvailableDifficultiesDifficultyBadge>
      )}
    </SongListItemAvailableDifficultiesWrapper>
  );
};

export { SongListItemAvailableDifficulties };
