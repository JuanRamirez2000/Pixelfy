import axios from "axios";

export default function SpotifySignOutButton({
  setUserLoggedIn,
  setUserProfile,
}: {
  setUserLoggedIn: React.Dispatch<boolean>;
  setUserProfile: React.Dispatch<string>;
}) {
  let signOutFromSpotify = () => {
    console.log("Stuff Happens");
  };
  return (
    <div>
      <button onClick={signOutFromSpotify}>Sign Out</button>
    </div>
  );
}
