import React from "react";
import { Stream, Subscriber, Subscription } from "most";

function useStreamSubscribe<T>(
  data$: Stream<T>,
  _next: Subscriber<T>["next"],
  _complete: Subscriber<T>["complete"] = () => undefined,
  _error: Subscriber<T>["error"] = () => undefined
) {
  const [subscription, setSubscription] = React.useState<Subscription<T>>();
  const next = React.useCallback(_next, [_next]);
  const complete = React.useCallback(_complete, [_complete]);
  const error = React.useCallback(_error, [_error]);

  React.useEffect(() => {
    if (subscription) {
      subscription.unsubscribe();
    }
    const _subscription = data$.subscribe({
      complete,
      error,
      next
    });
    setSubscription(_subscription);
  }, []);
}

export { useStreamSubscribe };
