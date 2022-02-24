export namespace BroadcasterConfiguration {
  export type PanelPosition = {
    positionX: number;
    positionY: number;
  };

  export type ScoreSaber = {
    id: string
  }
}

export type BroadcasterConfiguration = {
  panelPosition: BroadcasterConfiguration.PanelPosition;
  scoreSaber: BroadcasterConfiguration.ScoreSaber | null;
}
