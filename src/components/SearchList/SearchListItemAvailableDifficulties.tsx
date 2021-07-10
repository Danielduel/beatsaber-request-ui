import React from "react";
import styled, { css } from "styled-components";

type SearchListItemAvailableDifficultiesDifficultyBadgeVariant = "E" | "N" | "H" | "X" | "X+";
const SearchListItemAvailableDifficultiesDifficultyBadge = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bolder;
  margin-top: 3px;
  margin-left: 3px;
  border-radius: 4px;

  width: 20px;
  height: 20px;
  ${({ variant }: { variant: SearchListItemAvailableDifficultiesDifficultyBadgeVariant }) => {
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
const SearchListItemAvailableDifficultiesWrapper = styled.div`
  position: initial;
  bottom: 0;
  right: 0;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: flex-end;
  margin: 3px;

  @media (min-width: 499px) {
    position: absolute;
    top: 0;
    bottom: initial;
    right: 0;
    height: initial;
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: flex-end;
    justify-content: flex-end;
  }
`;
type SearchListItemAvailableDifficultiesProps = {
  easy: boolean;
  normal: boolean;
  hard: boolean;
  expert: boolean;
  expertPlus: boolean;
};
const SearchListItemAvailableDifficulties = ({
  easy,
  normal,
  hard,
  expert,
  expertPlus
}: SearchListItemAvailableDifficultiesProps) => {
  return (
    <SearchListItemAvailableDifficultiesWrapper>
      {easy && (
        <SearchListItemAvailableDifficultiesDifficultyBadge variant="E">
          E
        </SearchListItemAvailableDifficultiesDifficultyBadge>
      )}
      {normal && (
        <SearchListItemAvailableDifficultiesDifficultyBadge variant="N">
          N
        </SearchListItemAvailableDifficultiesDifficultyBadge>
      )}
      {hard && (
        <SearchListItemAvailableDifficultiesDifficultyBadge variant="H">
          H
        </SearchListItemAvailableDifficultiesDifficultyBadge>
      )}
      {expert && (
        <SearchListItemAvailableDifficultiesDifficultyBadge variant="X">
          X
        </SearchListItemAvailableDifficultiesDifficultyBadge>
      )}
      {expertPlus && (
        <SearchListItemAvailableDifficultiesDifficultyBadge variant="X+">
          X+
        </SearchListItemAvailableDifficultiesDifficultyBadge>
      )}
    </SearchListItemAvailableDifficultiesWrapper>
  );
};

export { SearchListItemAvailableDifficulties };
