import mostConfig from "recompose/mostObservableConfig";
import { componentFromStreamWithConfig } from "recompose";

const componentFromConfiguredStream = componentFromStreamWithConfig(mostConfig);

export { componentFromConfiguredStream };
