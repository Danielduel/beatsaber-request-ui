import { Validator } from "fluentvalidation-ts";
import { beProperNumber, beString } from "../utils/validators";

export type BroadcasterConfigurationPanelPosition = {
  x: number;
  y: number;
};

export type BroadcasterConfigurationScoreSaber = {
  id: string;
};

export type BroadcasterConfiguration = {
  panelPosition: BroadcasterConfigurationPanelPosition;

  scoreSaberEnabled: boolean;
  scoreSaber: BroadcasterConfigurationScoreSaber | null;
};

export class PanelPositionBroadcasterConfigurationValidator extends Validator<BroadcasterConfigurationPanelPosition> {
  constructor() {
    super();
    const allowedRange = [-200, 200] as [number, number];

    this.ruleFor("x")
      .notNull()
      .must(beProperNumber)
      .inclusiveBetween(...allowedRange);

    this.ruleFor("y")
      .notNull()
      .must(beProperNumber)
      .inclusiveBetween(...allowedRange);
  }
}
export const panelPositionBroadcasterConfigurationValidator = new PanelPositionBroadcasterConfigurationValidator();

export class ScoreSaberBroadcasterConfigurationValidator extends Validator<BroadcasterConfigurationScoreSaber> {
  constructor() {
    super();

    this.ruleFor("id")
      .notNull()
      .must(beString)
      .maxLength(100)
  }
}
export const scoreSaberBroadcasterConfigurationValidator = new ScoreSaberBroadcasterConfigurationValidator();

export class BroadcasterConfigurationValidator extends Validator<BroadcasterConfiguration> {
  constructor() {
    super();

    this.ruleFor("scoreSaberEnabled").notNull();

    this.ruleFor("scoreSaber")
      .notNull()
      .setValidator(() => scoreSaberBroadcasterConfigurationValidator)
      .unless((config) => !config.scoreSaberEnabled);

    this.ruleFor("panelPosition")
      .notNull()
      .setValidator(() => panelPositionBroadcasterConfigurationValidator);
  }
}
export const broadcasterConfigurationValidator = new BroadcasterConfigurationValidator();
