import { BroadcasterConfiguration, BroadcasterConfigurationPanelPosition, BroadcasterConfigurationScoreSaber, broadcasterConfigurationValidator, panelPositionBroadcasterConfigurationValidator, scoreSaberBroadcasterConfigurationValidator } from "./BroadcasterConfiguration";
const bigNumber = 1e+69;

describe("ScoreSaberBroadcasterConfigurationValidator", () => {
  describe("🟢 Should pass on", () => {

    const validScoreSaberConfigs: BroadcasterConfigurationScoreSaber[] = [
      {
        id: "Something"
      }
    ];
  
    validScoreSaberConfigs.forEach(validConfig => {
      const result = scoreSaberBroadcasterConfigurationValidator.validate(validConfig);
  
      test(`${JSON.stringify(validConfig)}`, () => {
        expect(result).not.toHaveProperty("id");
      })
    });
  });

  describe("🔴 Should fail on", () => {
    const invalidScoreSaberConfigs = [
      {
        id: null
      },
      {
        id: 12
      },
      {
        id: true
      },
      {
        id: false
      },
      {
        id: undefined
      },
      {
        id: [ "Jera cute" ]
      },
      {
        id: []
      },
      {
        id: NaN
      },
      {
        id: () => "hehe"
      },
      {}
    ] as unknown[] as BroadcasterConfigurationScoreSaber[];
  
    invalidScoreSaberConfigs.forEach(invalidConfig => {
      const result = scoreSaberBroadcasterConfigurationValidator.validate(invalidConfig);
  
      test(`${JSON.stringify(invalidConfig)}`, () => {
        expect(result).toHaveProperty("id");
      })
    });
  });
});

describe("PanelPositionBroadcasterConfigurationValidator", () => {
  describe("🟢 Should pass on", () => {

    const validScoreSaberConfigs: BroadcasterConfigurationPanelPosition[] = [
      {
        x: 200,
        y: 200
      },
      {
        x: 0,
        y: 0
      },
      {
        x: -200,
        y: -200
      },
      {
        x: 0.5,
        y: 0.5
      }
    ];
  
    validScoreSaberConfigs.forEach(validConfig => {
      const result = panelPositionBroadcasterConfigurationValidator.validate(validConfig);
  
      test(`${JSON.stringify(validConfig)} should pass validation`, () => {
        expect(result).not.toHaveProperty("x");
        expect(result).not.toHaveProperty("y");
      })
    });
  });

  describe("🔴 Should fail on", () => {
    const invalidScoreSaberConfigs = [
      {
        x: -bigNumber,
        y: bigNumber
      },
      {
        x: null,
        y: null
      },
      {
        x: undefined,
        y: undefined
      },
      {}
    ] as unknown[] as BroadcasterConfigurationPanelPosition[];
    const invalidScoreSaberConfigsX = [
      {
        x: -bigNumber,
        y: 200
      }
    ] as unknown[] as BroadcasterConfigurationPanelPosition[];
    const invalidScoreSaberConfigsY = [
      {
        x: 200,
        y: bigNumber
      }
    ] as unknown[] as BroadcasterConfigurationPanelPosition[];
  
    invalidScoreSaberConfigs.forEach(invalidConfig => {
      const result = panelPositionBroadcasterConfigurationValidator.validate(invalidConfig);
  
      test(`${JSON.stringify(invalidConfig)} should fail validation because x`, () => {
        expect(result).toHaveProperty("x");
      });
      test(`${JSON.stringify(invalidConfig)} should fail validation because y`, () => {
        expect(result).toHaveProperty("y");
      });
    });

    invalidScoreSaberConfigsX.forEach(invalidConfig => {
      const result = panelPositionBroadcasterConfigurationValidator.validate(invalidConfig);
  
      test(`${JSON.stringify(invalidConfig)} should fail validation (because x)`, () => {
        expect(result).toHaveProperty("x");
      });
      test(`${JSON.stringify(invalidConfig)} rest should be ok`, () => {
        expect(result).not.toHaveProperty("y");
      });
    });
  
    invalidScoreSaberConfigsY.forEach(invalidConfig => {
      const result = panelPositionBroadcasterConfigurationValidator.validate(invalidConfig);
  
      test(`${JSON.stringify(invalidConfig)} should fail validation (because y)`, () => {
        expect(result).toHaveProperty("y");
      });
      test(`${JSON.stringify(invalidConfig)} rest should be ok`, () => {
        expect(result).not.toHaveProperty("x");
      });
    });
  });
});



describe("BroadcasterConfigurationValidator", () => {
  const defaultConfig: BroadcasterConfiguration = {
    panelPosition: { x: 0, y: 0 },
    scoreSaberEnabled: true,
    scoreSaber: { id: "hehe" }
  };

  describe("🟢 Should pass on", () => {
    const validBroadcasterConfigs: BroadcasterConfiguration[] = [
      {
        ...defaultConfig
      },
      {
        ...defaultConfig,
        scoreSaberEnabled: false,
        scoreSaber: null
      },
      {
        ...defaultConfig,
        scoreSaberEnabled: false,
        scoreSaber: { id: "hehe" } // just want to underline that's legal
      }
    ];
  
    validBroadcasterConfigs.forEach(validConfig => {
      const result = broadcasterConfigurationValidator.validate(validConfig);
  
      test(`${JSON.stringify(validConfig)} should pass validation`, () => {
        expect(result).not.toHaveProperty("panelPosition");
        expect(result).not.toHaveProperty("scoreSaberEnabled");
        expect(result).not.toHaveProperty("scoreSaber");
      })
    });
  });

  describe("🔴 Should fail on", () => {
    describe("When scoresaber is enabled - should fail if scoresaber config is not valid", () => {
      const invalidConfigs = [
        {
          ...defaultConfig,
          scoreSaberEnabled: true, // underline
          scoreSaber: null
        },
        {
          ...defaultConfig,
          scoreSaberEnabled: true, // underline
          scoreSaber: {}
        },
        {
          ...defaultConfig,
          scoreSaberEnabled: true, // underline
          scoreSaber: []
        },
        {
          ...defaultConfig,
          scoreSaberEnabled: true, // underline
          scoreSaber: () => {}
        },
        {
          ...defaultConfig,
          scoreSaberEnabled: true, // underline
          scoreSaber: "Jera"
        },
        {
          ...defaultConfig,
          scoreSaberEnabled: true, // underline
          scoreSaber: 12
        }
      ] as unknown[] as BroadcasterConfiguration[];

      invalidConfigs.forEach(invalidConfig => {
        const result = broadcasterConfigurationValidator.validate(invalidConfig);
    
        test(`${JSON.stringify(invalidConfig)}`, () => {
          expect(result).not.toHaveProperty("panelPosition");
          expect(result).not.toHaveProperty("scoreSaberEnabled");
          expect(result).toHaveProperty("scoreSaber");
        })
      });
    });
  });
});

