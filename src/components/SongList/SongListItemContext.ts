import React from "react";

const defaultContextState = {
  copied: false,
  setCopied: (_: boolean) => void 0
};

// Used to tell other items that they aren't currently copied
let lastCopiedSetStateAction = (_: boolean) => {};

function useSongListItemContextState() {
  const [copied, _setCopied] = React.useState(false);
  const setCopied = React.useCallback(
    (value: boolean) => {
      if (value === true) {
        lastCopiedSetStateAction && lastCopiedSetStateAction(false);
        lastCopiedSetStateAction = _setCopied;
      }
      _setCopied(value);
    },
    [_setCopied]
  );

  const returns = {
    copied,
    setCopied
  };

  return returns as typeof defaultContextState;
}

const SongListItemContext = React.createContext<ReturnType<typeof useSongListItemContextState>>(defaultContextState);

export { useSongListItemContextState, SongListItemContext };
