import axios from "axios";
import { useQueries } from "react-query";
import { SpotifyUser } from "../interfaces/spotifyInterfaces";
import userInfoQueryInterface from "../interfaces/userInfoQueryInterface";

interface UseSpotifyReturn {
  user?: SpotifyUser;
  loading: boolean;
  error?: string;
}

export default function useSpotifyUser(
  userQueryInfo: userInfoQueryInterface
): UseSpotifyReturn {
  try {
    let user: any = {};

    const userQueries = useQueries([
      {
        queryKey: ["user"],
        queryFn: getUserInfo,
      },
      {
        queryKey: ["playlists"],
        queryFn: getUserPlaylists,
      },
      {
        queryKey: ["recents"],
        queryFn: getUserRecentPlays,
      },
      {
        queryKey: ["tracks"],
        queryFn: getUserTracks,
      },
      {
        queryKey: ["topTracks"],
        queryFn: getUserTopTracks,
      },
    ]);
    if (userQueries.every((query) => query.status === "success")) {
      user.userInfo = userQueries[0].data;
      user.userPlaylists = userQueries[1].data;
      user.userRecentPlays = userQueries[2].data;
      user.userTracks = userQueries[3].data;
      user.userTopTracks = userQueries[4].data;
      return { user: user, loading: false };
    }

    return { loading: true };
  } catch (err) {
    console.log(err);
    return { loading: true, error: "Something Went Wrong!" };
  }
}

let getUserInfo = async () => {
  //* Current_User Spotipy API Endpoint
  //* No props needed
  const res = await axios.get("/api/user_info");
  return res.data;
};
let getUserPlaylists = async () => {
  //* Current_User_Playlists Spotipy API Endpoint
  //* Limit of 50 playlist in one request
  const res = await axios.get("/api/user_playlists");
  return res.data;
};
let getUserRecentPlays = async () => {
  //* Current_User_Recently_Played Spotipy API Endpoint
  //* After and Before in UNIX timestamp in ms
  //* Will try to offset
  const res = await axios.get("/api/user_recent_plays");
  return res.data;
};
let getUserTracks = async () => {
  //* Current_User_Recently_Saved_Tracks Spotipy API Endpoint
  //* Limit 20
  const res = await axios.get("/api/user_tracks");
  return res.data;
};
let getUserTopTracks = async () => {
  //* Current_User_Top_Tracks Spotipy API Endpoint
  //* Limit 20
  //* time_range of values [short_term, medium_term(default), long_term]
  const res = await axios.get("/api/user_top_tracks");
  return res.data;
};
