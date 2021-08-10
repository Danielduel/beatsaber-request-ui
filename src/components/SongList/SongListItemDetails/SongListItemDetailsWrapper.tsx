import styled from "styled-components";

const repeat = (number: number, stringToRepeat: string) =>
  new Array(number + 1).map(() => " ").join(stringToRepeat + " ");
const dots = (number: number) => new Array(number + 1).map(() => " ").join(". ");

const SongListItemDetailsWrapper = styled.div`
  display: grid;
  width: 100%;
  --fullwidth-span: 1;
  --small-span: 1;
  grid-template-areas:
    "${dots(1)}"
    "${dots(1)}"
    "${dots(1)}"
    "${dots(1)}"
    "${dots(1)}"
    "${dots(1)}"
    "${dots(1)}"
    "${dots(1)}"
    "${dots(1)}"
    "${dots(1)}"
    "${dots(1)}"
    "${dots(1)}"
    "${repeat(1, "action-group")}" /* details... */;

  @media (min-width: 250px) {
    --fullwidth-span: 4;
    --small-span: 2;

    grid-template-areas:
      "${dots(4)}"
      "${dots(4)}"
      "${dots(4)}"
      "${dots(4)}"
      "${dots(4)}"
      "${dots(4)}"
      "${dots(4)}"
      "${dots(4)}"
      "${dots(4)}"
      "${dots(4)}"
      "${dots(4)}"
      "${dots(4)}"
      "${repeat(4, "action-group")}" /* details... */;
  }

  @media (min-width: 380px) {
    --fullwidth-span: 6;
    --small-span: 2;

    grid-template-areas:
      "${dots(6)}"
      "${dots(6)}"
      "${dots(6)}"
      "${dots(6)}"
      "${dots(6)}"
      "${dots(6)}"
      "${dots(6)}"
      "${dots(6)}"
      "${dots(6)}"
      "${dots(6)}"
      "${dots(6)}"
      "${dots(6)}"
      "${dots(6)}"
      "${repeat(6, "action-group")}" /* details... */;
  }

  @media (min-width: 499px) {
    --fullwidth-span: 13;
    --small-span: 4;
    grid-template-areas:
      "${dots(13)}" /* title */
      "${dots(13)}" /* artist */
      "${dots(13)}" /* mapper */
      "${dots(13)}" /* mapper */
      "${dots(13)}" /* mapper */
      "${repeat(13, "action-group")}";
  }
`;

export { SongListItemDetailsWrapper };
