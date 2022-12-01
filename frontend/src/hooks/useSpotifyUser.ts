import axios from "axios";
import { useQueries } from "react-query";

export default function useSpotifyUsers() {
  const [userQuery, playlistQuery, recentsQuery, tracksQuery, topTracksQuery] =
    useQueries([
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
}

let getUserInfo = async () => {
  const res = await axios.get("/api/userInfo");
  return res.data;
};
let getUserPlaylists = async () => {
  const res = await axios.get("/api/userPlaylists");
  return res.data;
};
let getUserRecentPlays = async () => {
  const res = await axios.get("/api/userRecentPlays");
  return res.data;
};
let getUserTracks = async () => {
  const res = await axios.get("/api/userTracks");
  return res.data;
};
let getUserTopTracks = async () => {
  const res = await axios.get("/api/userTopTracks");
  return res.data;
};
