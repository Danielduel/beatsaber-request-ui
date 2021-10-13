import mostConfig from "recompose/mostObservableConfig";
import { mapPropsStreamWithConfig } from "recompose";

const mapPropsConfiguredStream = mapPropsStreamWithConfig(mostConfig);

export { mapPropsConfiguredStream };
