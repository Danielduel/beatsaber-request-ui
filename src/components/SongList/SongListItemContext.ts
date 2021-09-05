import React from "react";
import { placeholderDispatch } from "../../common/utils/placeholderDispatch";

type DefaultContextStateType = {
  copied: boolean;
  setCopied: React.Dispatch<React.SetStateAction<boolean>>;
  askForBeatsaverNavigation: boolean;
  setAskForBeatsaverNavigation: React.Dispatch<React.SetStateAction<boolean>>;
};

const defaultContextState: DefaultContextStateType = {
  copied: false,
  setCopied: placeholderDispatch,
  askForBeatsaverNavigation: false,
  setAskForBeatsaverNavigation: placeholderDispatch
};

let lastResetingActionSetState: React.Dispatch<React.SetStateAction<boolean>> = placeholderDispatch;

function useResettingState(initialState: boolean) {
  const [state, _setState] = React.useState(initialState);
  const setState = React.useCallback(
    (value: boolean) => {
      if (value === true) {
        lastResetingActionSetState && lastResetingActionSetState(false);
        lastResetingActionSetState = _setState;
      }
      _setState(value);
    },
    [_setState]
  );
  return [state, setState] as const;
}

function useSongListItemContextState(): typeof defaultContextState {
  const [copied, setCopied] = useResettingState(false);
  const [askForBeatsaverNavigation, setAskForBeatsaverNavigation] = useResettingState(false);

  const returns = {
    copied,
    setCopied,
    askForBeatsaverNavigation,
    setAskForBeatsaverNavigation
  };

  return returns as typeof defaultContextState;
}

const SongListItemContext = React.createContext<ReturnType<typeof useSongListItemContextState>>(defaultContextState);

export { useSongListItemContextState, SongListItemContext };
