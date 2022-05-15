type ChannelInfoItem = {
  broadcaster_id: string;
  broadcaster_language: string;
  broadcaster_login: string;
  broadcaster_name: string;
  delay: number;
  game_id: string; // BeatSaber is "503116"
  game_name: string; // BeatSaber is "Beat Saber";
  title: string;
};

export type ChannelInfoResponse = {
  data: ChannelInfoItem[];
  // OLD KRAKEN API (I want to keep that around in the repo)
  // broadcaster_language: string;
  // broadcaster_software: string;
  // broadcaster_type: string;
  // created_at: string;
  // description: string;
  // display_name: string;
  // followers: number;
  // game: "Beat Saber" | string;
  // language: string;
  // logo: string; // url
  // mature: boolean;
  // name: string;
  // partner: boolean;
  // privacy_options_enabled: boolean;
  // private_video: boolean;
  // profile_banner: string;
  // profile_banner_background_color: string;
  // status: string; // stream desc
  // updated_at: string;
  // url: string;
  // video_banner: string;
  // views: number
  // _id: string;
};
