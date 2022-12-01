import axios from "axios";
import React, { useState } from "react";
import { useQuery } from "react-query";

export default function SpotifyLoginButton({
  setUserLoggedIn,
}: {
  setUserLoggedIn: React.Dispatch<boolean>;
}) {
  const [authLink, setAuthLink] = useState<string>("");
  const { isLoading, error, data } = useQuery("sessionURL", () =>
    loginUserToSpotify(setUserLoggedIn, setAuthLink)
  );

  if (isLoading)
    return (
      <div>
        <p>Loading...</p>
      </div>
    );
  if (error)
    return (
      <div>
        <p>An Error has occurred</p>
      </div>
    );
  return (
    <div>
      <a href={authLink}> Login </a>
    </div>
  );
}

let loginUserToSpotify = async (
  setUserLoggedIn: React.Dispatch<boolean>,
  setAuthLink: React.Dispatch<string>
) => {
  let spotifyParams: any = {};
  let urlParams = new URL(document.location.href).searchParams;
  if (urlParams.get("code")) {
    spotifyParams.code = urlParams.get("code");
  }

  const res = await axios.get("/api/login", {
    params: spotifyParams,
    withCredentials: true,
  });
  if (res.data.sessionURL) {
    setAuthLink(res.data.sessionURL);
  }
  if (res.data.id) {
    setUserLoggedIn(true);
  }
  return res.data;
};
