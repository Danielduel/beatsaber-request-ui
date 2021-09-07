export namespace BroadcasterConfiguration {
  export type PanelPosition = {
    positionX: number;
    positionY: number;
  };
}

export type BroadcasterConfiguration = {
  panelPosition: BroadcasterConfiguration.PanelPosition;
}
