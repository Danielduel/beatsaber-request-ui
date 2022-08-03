import useLocalStorage from "use-local-storage";

const CONFIG_NAME = "Duelsik/beatsaber-request-ui/config/broadcaster";

export const useLocalStorageBroadcasterConfig = () => {
  const [localStorage, setLocalStorage] = useLocalStorage(CONFIG_NAME, "", { syncData: true });

  return {
    localBroadcasterConfig: localStorage,
    setLocalBroadcasterConfig: setLocalStorage
  };
};
