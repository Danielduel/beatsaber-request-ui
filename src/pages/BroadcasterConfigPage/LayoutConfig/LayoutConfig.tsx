import React from "react";
import styled from "styled-components";

import ruler_horizontal_solid from "./ruler_horizontal_solid.svg";
import ruler_vertical_solid from "./ruler_vertical_solid.svg";

import top_left from "./top_left.svg";
import top_right from "./top_right.svg";
import bottom_left from "./bottom_left.svg";
import bottom_right from "./bottom_right.svg";
import custom from "./custom.svg";
import custom_marker from "./custom_marker.svg";
import { colors } from "../components";
import { ConfigContext } from "../BroadcasterConfigPage";

const LayoutConfigOptionsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin: auto;
  max-width: 50rem;
`;

const LayoutOptionWrapper = styled.div`
  min-width: 15rem;
  margin: auto;
  min-width: ${({ wide }: { wide?: boolean }) => wide ? "100%" : "50%"};
`;

const LayoutOptionContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 2rem;
`;

const LayoutOptionBody = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 1rem;
  border-radius: 1rem;
  border: 0.25rem dotted ${({ active }: { active: boolean }) => active ? colors.accent : "transparent"};
  background-color: ${colors.darker};
`;


const LayoutTitle = styled.div`
  color: ${colors.light};
  font-size: 1.2rem;
  margin-top: 1rem;
`;
const LayoutIcon = styled.img`
  width: 10rem;
`;

type LayoutOptionProps = {
  icon: any;
  wide?: boolean;
  id: string;
  label: string;
};
const LayoutOption = ({ icon, wide, id, label, children }: React.PropsWithChildren<LayoutOptionProps>) => {
  const { layoutActiveId, setLayoutActiveId } = React.useContext(ConfigContext);
  const active = layoutActiveId === id;

  const onClick = React.useCallback(() => {
    setLayoutActiveId(id);
  }, [ setLayoutActiveId, id ])

  return (
    <LayoutOptionWrapper wide={wide}>
      <LayoutOptionContainer onClick={onClick}>
        <LayoutOptionBody active={active}>
          <LayoutIcon src={icon} />
          <LayoutTitle>{ label }</LayoutTitle>
          { active && children }
        </LayoutOptionBody>
      </LayoutOptionContainer>
    </LayoutOptionWrapper>
  );
};

const PreciseMatrix = styled.div`
  position: relative;
  margin-top: 1rem;
  width: 160px;
  height: 90px;
  background-color: #fff;
`;
const preciseTranslate = (
  { layoutPreciseX, layoutPreciseY }:
  { layoutPreciseX: number; layoutPreciseY: number; }) => {

  return `transform: translate(${160 * layoutPreciseX / 100}px, ${90 * layoutPreciseY / 100}px) translate(-50%, -50%);`
};
const PreciseMarker = styled.img`
  position: absolute;
  pointer-events: none;
  ${preciseTranslate};
`;
const PreciseInputIcon = styled.img`
  position: absolute;
  filter: invert();
  width: 1.5rem;
  height: 1.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  left: 0;
  top: 0;
  transform: translate(25%, 25%);
`;
const PreciseInputContainer = styled.div`
  position: relative;
  border: 0.125rem solid ${colors.shade};
  box-sizing: border-box;
  width: 160px;
`;
const PreciseInput = styled.input`
  box-sizing: border-box;
  width: 160px;
  font-size: 1.5rem;
  height: 2rem;
  padding: 0.125rem 1rem 0.125rem 3rem;
  border: none;
  margin-top: 0.25rem;
  background: none;
  color: ${colors.light};
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
`;
const PreciseOptionDetails = () => {
  const {
    layoutPreciseX, setLayoutPreciseX,
    layoutPreciseY, setLayoutPreciseY
  } = React.useContext(ConfigContext);

  const matrixOnClick = React.useCallback((ev: React.MouseEvent) => {
    const { top, left, width, height } = ev.currentTarget.getBoundingClientRect();
    const { pageX, pageY } = ev;
    const x = pageX - left;
    const y = pageY - top;

    setLayoutPreciseX(~~((x / width) * 100));
    setLayoutPreciseY(~~((y / height) * 100));
  }, [ setLayoutPreciseX, setLayoutPreciseY ]);

  const onChangeX = React.useCallback((ev: React.ChangeEvent<HTMLInputElement>) => {
    setLayoutPreciseX(+ev.currentTarget.value);
  }, [ setLayoutPreciseX ]);
  
  const onChangeY = React.useCallback((ev: React.ChangeEvent<HTMLInputElement>) => {
    setLayoutPreciseX(+ev.currentTarget.value);
  }, [ setLayoutPreciseX ]);

  return (
    <>
      <PreciseMatrix onClick={matrixOnClick}>
        <PreciseMarker src={custom_marker} layoutPreciseX={layoutPreciseX} layoutPreciseY={layoutPreciseY} />
      </PreciseMatrix>
      <PreciseInputContainer>
        <PreciseInput onChange={onChangeX} step="1" min="0" max="100" type="number" value={layoutPreciseX} />
        <PreciseInputIcon src={ruler_horizontal_solid} />
      </PreciseInputContainer>
      <PreciseInputContainer>
        <PreciseInput onChange={onChangeY} step="1" min="0" max="100" type="number" value={layoutPreciseY} />
        <PreciseInputIcon src={ruler_vertical_solid} />
      </PreciseInputContainer>
    </>
  );
}

export const LayoutConfig = () => {
  return (
    <LayoutConfigOptionsContainer>
      <LayoutOption icon={top_left} id="top_left" label="Top left" />
      <LayoutOption icon={top_right} id="top_right" label="Top right" />
      <LayoutOption icon={bottom_left} id="bottom_left" label="Bottom left" />
      <LayoutOption icon={bottom_right} id="bottom_right" label="Bottom right" />
      <LayoutOption icon={custom} wide id="custom" label="Precise">
        <PreciseOptionDetails />
      </LayoutOption>
    </LayoutConfigOptionsContainer>
  );
};
