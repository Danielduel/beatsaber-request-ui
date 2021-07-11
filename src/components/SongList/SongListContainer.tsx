import styled from "styled-components";
import { hideScrollbars } from "../../common/styles/hideScrollbars";

const SongListContainer = styled.div`
  box-sizing: border-box;
  height: calc(100vh - (var(--navigation-height) * 2));
  padding-bottom: 1rem;
  overflow-y: scroll;

  ${hideScrollbars}
`;

export { SongListContainer };
