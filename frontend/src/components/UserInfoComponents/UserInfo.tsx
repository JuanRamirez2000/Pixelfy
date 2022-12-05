import useSpotifyUser from "../../hooks/useSpotifyUser";
import { SpotifyUser } from "../../interfaces/spotifyInterfaces";
import userInfoQueryInterface from "../../interfaces/userInfoQueryInterface";

export default function UserInfo() {
  const userQuery: userInfoQueryInterface = {
    numberOfPlaylists: 10,
    recentPlays: 20,
    savedTracks: 20,
    topTracks: 20,
    timeRange: "medium_term",
  };

  const user: SpotifyUser = useSpotifyUser(userQuery);
  console.log(user);
  return (
    <div>
      <p></p>
    </div>
  );
}
