import React from "react";
import { createConfiguredEventHandler } from "../most/createConfiguredEventHandler";

function useRefetchingData<T>(fetchData: () => Promise<T>, initialFetch = true) {
  const { handler, stream: data$ } = createConfiguredEventHandler<T>();

  const fetchDataCb = React.useCallback(() => {
    fetchData().then(handler);
  }, [fetchData]);

  React.useEffect(() => {
    if (initialFetch) {
      fetchDataCb();
    }
  }, []);

  return [data$, fetchDataCb] as const;
}

export { useRefetchingData };
