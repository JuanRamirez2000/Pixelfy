interface SpotifyUser {
  userInfo: SpotifyUserInfo;
  userPlaylists: SpotifyUserPlaylists;
  userRecentPlays: SpotifyUserRecentPlays;
  userTopTracks: SpotifyUserTopTracks;
  userTracks: SpotifyUserTracks;
}

interface Image {
  url: string;
  height: number;
  width: number;
}

interface Playlist {
  collaborative: boolean;
  description: string;
  external_urls: {
    spotify: string;
  };
  href: string;
  id: string;
  images: Image[];
  name: string;
  owner: SpotifyUserInfo;
  primary_color: any;
  public: boolean;
  snapshot_id: string;
  tracks: {
    href: string;
    total: number;
  };
  type: string;
  uri: string;
}

interface Album {
  album_type: string;
  artists: Artist[];
  available_markets: string[];
  external_urls: {
    spotify: string;
  };
  href: string;
  id: string;
  images: Image[];
  name: string;
  release_date: string | any;
  release_date_precision: string;
  total_tracks: number;
  type: string;
  uri: string;
}

interface Artist {
  external_urls: {
    spotify: string;
  };
  href: string;
  id: string;
  name: string;
  type: string;
  uri: string;
}

interface Track {
  album: Album;
  artists: Artist[];
  available_markets: string[];
  disc_number: number;
  duration: number;
  explicit: boolean;
  external_ids: {
    isrc: string;
    ean: string;
    ups: string;
  };
  external_urls: {
    spotify: string;
  };
  href: string;
  id: string;
  is_local: boolean;
  name: string;
  popularity: number;
  preview_url: string;
  track_number: number;
  type: string;
  uri: string;
}

interface TrackAudioFeatures {
  acousticness: number;
  analysis_url: string;
  danceability: string;
  duration_ms: number;
  energy: number;
  id: string;
  instrumentalness: number;
  key: number;
  liveliness: number;
  loudness: number;
  mode: number;
  speechiness: number;
  tempo: number;
  time_signature: number;
  track_href: string;
  type: string;
  uri: string;
  valence: number;
}

interface TrackFeatures {
  trackArtist: string;
  trackFeatures: TrackAudioFeatures;
  trackName: string;
  trackPopularity: number;
}

interface SpotifyUserInfo {
  display_name: string | null;
  id: string;
  uri: string;
  external_urls: {
    spotify: string;
  };
  followers: {
    href: null;
    total: number;
  };
  images: Image[];
  type: string;
}

interface SpotifyUserPlaylists {
  href: string;
  items: Playlist[];
  limit: number;
  next: string | null;
  offset: number;
  previous: string | null;
  total: number;
}

interface SpotifyUserRecentPlays {
  cursors: {
    after: string;
    before: string;
  };
  href: string;
  limit: number;
  next: string | null;
  total: number;
  items: {
    context: {
      external_urls: {
        spotify: string;
      };
      href: string;
      type: string;
      uri: string;
    };
    href: string;
    type: string;
    uri: string;
    played_at: string | any;
    track: Track;
  }[];
}
interface SpotifyUserTracks {
  href: string;
  items: Track[];
  limit: number;
  next: string | null;
  offset: number;
  previous: string | null;
  total: number;
}

type SpotifyUserTopTracks = SpotifyUserTracks;

export type {
  SpotifyUser,
  SpotifyUserInfo,
  SpotifyUserPlaylists,
  SpotifyUserRecentPlays,
  SpotifyUserTopTracks,
  SpotifyUserTracks,
  Track,
  TrackFeatures,
};
