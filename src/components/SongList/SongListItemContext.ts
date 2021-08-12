import React from "react";

const defaultContextState = {
  copied: false,
  setCopied: (_: boolean) => void 0,
  askForBeatsaverNavigation: false,
  setAskForBeatsaverNavigation: (_: boolean) => void 0
};

let lastResetingActionSetState = (_: boolean) => {};

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

function useSongListItemContextState() {
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
