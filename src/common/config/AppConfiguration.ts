import { Validator } from "fluentvalidation-ts";
import { ValidationErrors } from "fluentvalidation-ts/dist/ValidationErrors";
import { BroadcasterConfiguration, broadcasterConfigurationValidator } from "./BroadcasterConfiguration";

export type GlobalConfiguration = null;
export type DeveloperConfiguration = null;
export type AppConfiguration = {
  broadcaster: BroadcasterConfiguration;
  developer: DeveloperConfiguration;
  global: GlobalConfiguration;
};

export class AppConfigurationValidator extends Validator<AppConfiguration> {
  constructor() {
    super();

    this.ruleFor("global").equal(null);

    this.ruleFor("developer").equal(null);

    this.ruleFor("broadcaster")
      .notNull()
      .setValidator(() => broadcasterConfigurationValidator);
  }
}

export const appConfigurationValidator = new AppConfigurationValidator();

export const createAppConfigurationFromConfigs = (
  broadcaster: BroadcasterConfiguration,
  developer: DeveloperConfiguration,
  global: GlobalConfiguration
): AppConfiguration => {
  const result: AppConfiguration = {
    broadcaster,
    developer,
    global
  };

  const validationResult = appConfigurationValidator.validate(result);
  const configValid = ["global", "developer", "broadcaster"].some(configKey => Object.keys(validationResult).includes(configKey));

  if (!configValid) throw validationResult;
  return result;
};
