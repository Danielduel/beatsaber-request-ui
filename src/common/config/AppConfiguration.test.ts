import { AppConfiguration, appConfigurationValidator } from "./AppConfiguration";

describe("AppConfigurationValidator", () => {
  const defaultAppConfiguration: AppConfiguration = {
    broadcaster: {
      panelPosition: { x: 0, y: 0 },
      scoreSaber: { id: "test" },
      scoreSaberEnabled: true
    },
    developer: null,
    global: null
  };

  describe("🟢 Should pass on", () => {
    const validAppConfigurations = [
      { ...defaultAppConfiguration }
    ] as AppConfiguration[];

    validAppConfigurations.forEach(validConfig => {
      const result = appConfigurationValidator.validate(validConfig);

      test(`${validConfig}`, () => {
        expect(result).not.toHaveProperty("broadcaster");
        expect(result).not.toHaveProperty("developer");
        expect(result).not.toHaveProperty("global");
      })
    });
  });
});
