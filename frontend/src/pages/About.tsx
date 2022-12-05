import SpotifyLoginButton from "../components/SpotifyLoginButton";

export default function About({
  setUserLoggedIn,
}: {
  setUserLoggedIn: React.Dispatch<boolean>;
}) {
  return (
    <div>
      <p>About</p>
      <SpotifyLoginButton setUserLoggedIn={setUserLoggedIn} />
    </div>
  );
}
