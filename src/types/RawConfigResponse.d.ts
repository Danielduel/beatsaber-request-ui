export type RawConfigResponseItem = {
  record: {
    content: string;
    version: "1";
  };
  segment: {
    segment_type: "broadcaster";
    channel_id: string;
  };
}
export type RawConfigResponse = Record<string, RawConfigResponseItem>;
