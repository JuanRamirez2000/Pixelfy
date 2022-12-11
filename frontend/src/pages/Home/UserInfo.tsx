import { useEffect } from "react";
import useSpotifyUser from "../../hooks/useSpotifyUser";
import { SpotifyUserTopTracks } from "../../interfaces/spotifyInterfaces";
import userInfoQueryInterface from "../../interfaces/userInfoQueryInterface";

export default function UserInfo({
  setSelectedTracks,
}: {
  setSelectedTracks: any;
}) {
  const userQuery: userInfoQueryInterface = {
    numberOfPlaylists: 10,
    recentPlays: 20,
    savedTracks: 20,
    topTracks: 20,
    timeRange: "medium_term",
  };
  const { user, loading, error } = useSpotifyUser(userQuery);

  useEffect(() => {
    if (user?.userTopTracks) {
      setSelectedTracks(user.userTopTracks as SpotifyUserTopTracks);
    }
  }, [user]);

  return (
    <section>
      {!loading ? (
        <div>
          <h1> Welcome {user?.userInfo.display_name} </h1>
          <img
            src={user?.userInfo.images[0].url}
            alt={user?.userInfo.display_name as string}
          />
          {/* 
          <button
            onClick={() => {
              setSelectedTracks(user?.userTopTracks);
            }}
          >
            Find Moods
          </button>
          */}
        </div>
      ) : (
        <p>Loading</p>
      )}
    </section>
  );
}
