import React, { PropsWithChildren } from "react";
import "../../App.css";
import styled from "styled-components";
import "overlayscrollbars/css/OverlayScrollbars.css";
import { OverlayScrollbarsComponent } from "overlayscrollbars-react";
import { colors } from "./components";
import { isLocalhost } from "../../constants";
import { ScoreSaberConfig } from "./ScoreSaberConfig/ScoreSaberConfig";
import { LayoutConfig, LayoutConfigOptionIds } from "./LayoutConfig/LayoutConfig";
import { ThemeSetup } from "./ThemeSetup/ThemeSetup";
import Color from "color";
import { useTwitchExtConfigurationOnChanged } from "../../common/hooks/useTwitchExtConfigurationOnChanged";
import { useStreamSubscribe } from "../../common/hooks/useStreamSubscribe";
import { AppConfiguration } from "../../common/config/AppConfiguration";
import { isDirty, useFormField } from "../../common/hooks/useFormField";
import AppEnvContext from "../../AppEnvContext";
import { useTranslation } from "react-i18next";
import { useLocalStorageBroadcasterConfig } from "../../common/hooks/useLocalStorageBroadcasterConfig";
import {
  BroadcasterConfigurationPanelPosition,
  broadcasterConfigurationValidator
} from "../../common/config/BroadcasterConfiguration";

const ConfigPageLayoutWrapper = styled.div`
  background-color: #333;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  border: 0px solid transparent;
`;

const ConfigPageLayoutContainer = styled.div`
  display: grid;
  height: 100%;
  width: 100%;
  grid-template-columns: 200px 1fr;
`;

const ConfigPageMenu = styled.div`
  background-color: ${colors.darker};
  padding: 1rem 1rem 2rem;
  display: flex;
  flex-direction: column;
  position: relative;
`;
const ConfigPageMenuTitle = styled.div`
  color: ${colors.shade};
  user-select: none;
  font-size: 0.9rem;
  padding: 0.25rem 1rem;
`;

const ConfigPageBody = styled.div`
  width: 100%;
  background-color: ${colors.dark};
`;

export type ConfigContextType = ReturnType<typeof useConfigContextValue>[0];
export const ConfigContext = React.createContext<ConfigContextType>({} as ConfigContextType);
const ConfigPageMenuItemContainer = styled.div`
  user-select: none;
  cursor: pointer;
  margin-top: 0.5rem;
  padding: 0.25rem 1rem;
  color: ${colors.shade};
  border-radius: 0.5rem;
  font-size: 1.2rem;
  &:hover {
    background-color: ${colors.hover};
    color: ${colors.light};
  }
  ${({ active }: { active: boolean }) => active && `background-color: ${colors.accent} !important; color: white;`}
`;
const ConfigPageActionButtonContainer = styled.div`
  position: absolute;
  bottom: 1rem;
  width: 100%;
  display: flex;
  flex-direction: column;
`;
const ConfigPageActionButtonButton = styled(ConfigPageMenuItemContainer)`
  width: calc(100% - 4rem);
  text-align: center;
  border: 0.125rem solid ${colors.darker};
`;

const unwrapScoreSaberId = (link: string) => {
  const splitLink = link.split("/");
  const id = splitLink.find((part) => Number(part));
  return !id ? "" : id;
};

const transformToNumber = (value: string) => {
  // TODO - remove leading zero
  return Number.parseInt(value.trim().split(" ").join(""));
};

const useConfigContextValue = () => {
  const [activeId, setActiveId] = React.useState("layout");

  const layoutActiveId = useFormField("custom" as LayoutConfigOptionIds);
  const layoutPreciseX = useFormField(5 as number, "onchange", () => void 0, transformToNumber);
  const layoutPreciseY = useFormField(5 as number, "onchange", () => void 0, transformToNumber);

  const scoreSaberEnabled = useFormField(false);
  const scoreSaberId = useFormField("", "onchange", () => void 0, unwrapScoreSaberId);

  const themePrimaryColor = useFormField(Color("#b161d0"));
  const themeSecondaryColor = useFormField(Color("#9939bf"));
  const themeAccentColor = useFormField(Color("#cd8c36"));
  const themeWarningColor = useFormField(Color("#d0297d"));

  const [configOnTwitch, setConfigOnTwitch] = React.useState<null | AppConfiguration>(null);
  const [twitchExtConfiguration$] = useTwitchExtConfigurationOnChanged();
  useStreamSubscribe(twitchExtConfiguration$, (configuration) => {
    setConfigOnTwitch(configuration);
  });

  const wasSomethingChanged = isDirty(
    scoreSaberEnabled,
    scoreSaberId,

    layoutActiveId,
    layoutPreciseX,
    layoutPreciseY,

    themePrimaryColor,
    themeSecondaryColor,
    themeAccentColor,
    themeWarningColor
  );

  const isSomethingChanged = wasSomethingChanged;

  const setPristineValues = React.useCallback((appPristine: AppConfiguration | null) => {
    if (!appPristine) return;
    const pristine = appPristine.broadcaster;
    if (!pristine) return;

    const validation = broadcasterConfigurationValidator.validate(pristine);
    console.log("Object for validation", pristine);
    console.log("Validation", validation);

    if (!validation.panelPosition) {
      layoutActiveId.setValueAndPristineValue("custom");
      layoutPreciseX.setValueAndPristineValue(pristine.panelPosition.x);
      layoutPreciseY.setValueAndPristineValue(pristine.panelPosition.y);
      pristine.panelPosition.x === 5 &&
        pristine.panelPosition.y === 5 &&
        layoutActiveId.setValueAndPristineValue("top_left");
      pristine.panelPosition.x === 95 &&
        pristine.panelPosition.y === 5 &&
        layoutActiveId.setValueAndPristineValue("top_right");
      pristine.panelPosition.x === 5 &&
        pristine.panelPosition.y === 95 &&
        layoutActiveId.setValueAndPristineValue("bottom_left");
      pristine.panelPosition.x === 95 &&
        pristine.panelPosition.y === 95 &&
        layoutActiveId.setValueAndPristineValue("bottom_right");
    }

    if (!validation.scoreSaberEnabled) {
      scoreSaberEnabled.setValueAndPristineValue(!!pristine.scoreSaber);
    }

    if (!validation.scoreSaber && pristine.scoreSaber) {
      scoreSaberId.setValueAndPristineValue(pristine.scoreSaber.id);
    }
  }, []);

  return [
    {
      isSomethingChanged,
      configOnTwitch,
      activeId,
      setActiveId,
      layoutActiveId,
      layoutPreciseX,
      layoutPreciseY,
      scoreSaberEnabled,
      scoreSaberId,
      themePrimaryColor,
      themeSecondaryColor,
      themeAccentColor,
      themeWarningColor
    },
    setPristineValues
  ] as const;
};

const ConfigPageMenuItem = ({ label, id }: ReturnType<typeof menuItem>) => {
  const { activeId, setActiveId } = React.useContext(ConfigContext);

  const onClick = React.useCallback(() => {
    setActiveId(id);
  }, [id, setActiveId]);

  return (
    <ConfigPageMenuItemContainer onClick={onClick} active={id === activeId}>
      {label}
    </ConfigPageMenuItemContainer>
  );
};

const ConfigPageBodyRouter = () => {
  const { activeId } = React.useContext(ConfigContext);

  switch (activeId) {
    case "layout":
      return <LayoutConfig />;
    case "scoresaber":
      return <ScoreSaberConfig />;
    case "theme":
      return <ThemeSetup />;
  }

  return <></>;
};

const menuItem = (label: string, id: string) => ({ label, id });
const menuItems = [
  menuItem("Layout", "layout"),
  menuItem("ScoreSaber", "scoresaber"),
  menuItem("Theme", "theme"),
  menuItem("SRM Bridge", "srmbridge")
] as const;

const panelPositionId2panelPosition = (context: ConfigContextType): BroadcasterConfigurationPanelPosition => {
  switch (context.layoutActiveId.value) {
    case "top_left":
      return {
        x: 5,
        y: 5
      };
    case "top_right":
      return {
        x: 95,
        y: 5
      };
    case "bottom_left":
      return {
        x: 5,
        y: 95
      };
    case "bottom_right":
      return {
        x: 95,
        y: 95
      };
    case "custom":
      return {
        x: context.layoutPreciseX.value,
        y: context.layoutPreciseY.value
      };
    default:
      return {
        x: 5,
        y: 5
      };
  }
};

const ConfigContextProvider = ({ children }: PropsWithChildren<Record<string, unknown>>) => {
  const { configuration } = React.useContext(AppEnvContext);

  const [state, setPristineValues] = useConfigContextValue();

  React.useEffect(() => {
    setPristineValues(configuration);
  }, [configuration]);

  return <ConfigContext.Provider value={state}>{children}</ConfigContext.Provider>;
};

const configContextToBroadcasterConfig = (context: ConfigContextType): AppConfiguration["broadcaster"] => {
  return {
    panelPosition: panelPositionId2panelPosition(context),
    scoreSaberEnabled: context.scoreSaberEnabled.value,
    scoreSaber: context.scoreSaberEnabled.value ? { id: context.scoreSaberId.value } : null
  };
};

const useConfigSaveTwitch = (configuration: AppConfiguration | null, setSaving: (v: boolean) => void) => {};

const useConfigSaveLocal = (
  _ConfigContext: ConfigContextType,
  setLocalBroadcasterConfig: (config: string) => void,
  setSaving: (v: boolean) => void
) => {
  setSaving(true);
  setLocalBroadcasterConfig(JSON.stringify(configContextToBroadcasterConfig(_ConfigContext)));
  setSaving(false);
};

const getMessage = (t: TranslationFunction, isTwitch: boolean, saving: boolean) => {
  if (saving) return isTwitch ? t("Saving...") : t("Writing...");

  return isTwitch ? t("Save") : t("Write");
};

const useConfigSave = () => {
  const [t] = useTranslation();
  const { configuration } = React.useContext(AppEnvContext);
  const _ConfigContext = React.useContext(ConfigContext);
  const { localBroadcasterConfig, setLocalBroadcasterConfig } = useLocalStorageBroadcasterConfig();

  const isTwitch = configuration && configuration.isTwitch ? true : false;
  const [saving, setSaving] = React.useState(false);
  const message = getMessage(t, isTwitch, saving);
  const handleClear = React.useCallback(() => setLocalBroadcasterConfig(""), []);
  const canClearSave = isTwitch ? false : !!localBroadcasterConfig;
  return {
    message,
    handleClear,
    canClearSave,
    handleSave: isTwitch
      ? () => useConfigSaveTwitch(configuration, setSaving)
      : () => useConfigSaveLocal(_ConfigContext, setLocalBroadcasterConfig, setSaving)
  };
};

const ConfigPageSaveActions = (): JSX.Element | null => {
  const { isSomethingChanged } = React.useContext(ConfigContext);
  const { message, handleClear, canClearSave, handleSave } = useConfigSave();

  return (
    <ConfigPageActionButtonContainer>
      {canClearSave && (
        <ConfigPageActionButtonButton onClick={handleClear} active>
          Clear
        </ConfigPageActionButtonButton>
      )}
      {isSomethingChanged && (
        <ConfigPageActionButtonButton onClick={handleSave} active>
          {message}
        </ConfigPageActionButtonButton>
      )}
    </ConfigPageActionButtonContainer>
  );
};

const ConfigPageLayout = () => {
  return (
    <ConfigContextProvider>
      <ConfigPageLayoutWrapper>
        <ConfigPageLayoutContainer>
          <ConfigPageMenu>
            <ConfigPageMenuTitle>Settings</ConfigPageMenuTitle>
            {menuItems.map((props) => (
              <ConfigPageMenuItem key={props.id} {...props} />
            ))}
            <ConfigPageSaveActions />
          </ConfigPageMenu>
          <ConfigPageBody>
            <OverlayScrollbarsComponent options={{ scrollbars: { autoHide: "scroll" }, clipAlways: false }}>
              <ConfigPageBodyRouter />
            </OverlayScrollbarsComponent>
          </ConfigPageBody>
        </ConfigPageLayoutContainer>
      </ConfigPageLayoutWrapper>
    </ConfigContextProvider>
  );
};

export default function BroadcasterConfigPage(): JSX.Element {
  React.useLayoutEffect(() => {
    if (isLocalhost) {
      document.body.style.background = "black";
    }
  }, []);

  return <ConfigPageLayout />;
}
