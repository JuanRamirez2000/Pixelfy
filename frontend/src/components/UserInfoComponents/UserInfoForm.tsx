import { SubmitHandler, useForm } from "react-hook-form";
import userInfoQueryInterface from "../../interfaces/userInfoQueryInterface";

export default function UserInfoForm() {
  const { register, handleSubmit, watch } = useForm();
  const onSubmit: SubmitHandler<userInfoQueryInterface> = (data) => {
    console.log(data);
  };

  const watchPlaylists = watch("playlists");
  const watchRecentlyPlayed = watch("recentlyPlayed");
  const watchSavedTracks = watch("savedTracks");
  const watchTopTracks = watch("topTracks");

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label htmlFor="playlists"> Playlists Amount: </label>
        <input
          type="range"
          min={0}
          max={50}
          defaultValue={10}
          step={1}
          id="playlistsSlider"
          {...register("playlists")}
        />
        <p>{watchPlaylists}</p>
      </div>
      <div>
        <label htmlFor="recentlyPlayed">Recently Played Amount</label>
        <input
          type="range"
          min={0}
          max={50}
          defaultValue={20}
          step={1}
          id="recentlyPlayedSlider"
          {...register("recentlyPlayed")}
        />
        <p>{watchRecentlyPlayed}</p>
      </div>
      <div>
        <label htmlFor="savedTrackes">Saved Tracks Amount:</label>
        <input
          type="range"
          min={0}
          max={20}
          defaultValue={20}
          step={1}
          id="savedTracksSlider"
          {...register("savedTracks")}
        />
        <p>{watchSavedTracks}</p>
      </div>
      <div>
        <div>
          <label htmlFor="topTracks">Your Top Tracks:</label>
          <input
            type="range"
            min={0}
            max={20}
            step={1}
            id="topTracksSlider"
            {...register("topTracks")}
          />
          <p>{watchTopTracks}</p>
        </div>

        <label htmlFor="field_time">Time Frame For Top Tracks:</label>
        <div>
          <label htmlFor="short_term"> short_term</label>
          <input value="short_term" type="radio" {...register("time")} />

          <label htmlFor="medium_term"> medium_term</label>
          <input
            value="medium_term"
            type="radio"
            checked
            {...register("time")}
          />

          <label htmlFor="long_term"> long_term</label>
          <input value="long_term" type="radio" {...register("time")} />
        </div>
      </div>
      <input type="submit" />
    </form>
  );
}
