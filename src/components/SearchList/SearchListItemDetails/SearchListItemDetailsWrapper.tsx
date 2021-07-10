import styled from "styled-components";

const SearchListItemDetailsWrapper = styled.div`
  display: grid;
  width: 100%;
  --columns: 4;
  grid-template-columns: repeat(4, calc(100% / 4));

  @media (min-width: 380px) {
    --columns: 8;
    grid-template-columns: repeat(8, calc(100% / 8));
  }

  @media (min-width: 499px) {
    --columns: 12;
    grid-template-columns: repeat(12, calc(100% / 12));
  }
`;

export { SearchListItemDetailsWrapper };
