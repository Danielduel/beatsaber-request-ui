import { Stream } from "most";
import mostConfig from "recompose/mostObservableConfig";
import { createEventHandlerWithConfig } from "recompose";

function createConfiguredEventHandler<T>(): {
  handler: (value: T) => void;
  stream: Stream<T>;
} {
  return createEventHandlerWithConfig(mostConfig)<T, Stream<T>>();
}

export { createConfiguredEventHandler };
