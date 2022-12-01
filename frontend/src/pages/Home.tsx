import { useState } from "react";
import SpotifyLoginButton from "../components/SpotifyLoginButton";
import SpotifySignOutButton from "../components/SpotifySignOutButton";
import UserInfo from "../components/UserInfoComponents/UserInfo";

export default function Home() {
  //! Integrate spotify-login button
  const [userLoggedIn, setUserLoggedIn] = useState<boolean>(false);

  return (
    <section>
      {!userLoggedIn ? (
        <div>
          <h2 className="text-3xl"> Please Log In! </h2>
          <SpotifyLoginButton setUserLoggedIn={setUserLoggedIn} />
        </div>
      ) : (
        <UserInfo />
      )}
    </section>
  );
}
