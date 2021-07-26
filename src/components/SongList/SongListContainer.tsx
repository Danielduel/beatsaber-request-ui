import styled from "styled-components";
import { hideScrollbars } from "../../common/styles/hideScrollbars";

const SongListContainer = styled.div`
  box-sizing: border-box;
  padding-bottom: 1rem;
  overflow-y: scroll;

  ${hideScrollbars}
`;

export { SongListContainer };
