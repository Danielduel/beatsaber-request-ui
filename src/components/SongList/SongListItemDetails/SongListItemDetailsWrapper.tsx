import styled from "styled-components";

const dots = (number: number) => new Array(number + 1).map(() => " ").join(". ");

const SongListItemDetailsWrapper = styled.div`
  display: grid;
  width: 100%;
  --fullwidth-span: 3;
  --small-span: 1;

  grid-template-areas:
    "${dots(3)}" /* title */
    "${dots(3)}" /* artist */
    "${dots(3)}" /* mapper */
    "cover-image . action-group" /* details... */
    "cover-image . action-group" /* details... */
    "cover-image . action-group" /* details... */
    "cover-image . action-group" /* details... */
    "cover-image . action-group" /* details... */
    "cover-image . action-group" /* details... */;

  @media (min-width: 380px) {
    --fullwidth-span: 6;
    --small-span: 2;

    grid-template-areas:
      "${dots(6)}" /* title */
      "${dots(6)}" /* artist */
      "${dots(6)}" /* mapper */
      "cover-image ${dots(4)} action-group" /* details... */
      "cover-image ${dots(4)} action-group" /* details... */
      "cover-image ${dots(4)} action-group" /* details... */;
  }

  @media (min-width: 499px) {
    --fullwidth-span: 13;
    --small-span: 4;
    grid-template-areas:
      "cover-image ${dots(13)}" /* title */
      "cover-image ${dots(13)}" /* artist */
      "cover-image ${dots(13)}" /* mapper */
      "cover-image ${dots(12)} action-group" /* details... */
      "cover-image ${dots(12)} action-group" /* details... */;
  }
`;

export { SongListItemDetailsWrapper };
