import { useEffect, useState } from "react";
import MoodCharts from "./MoodCharts";
import UserInfo from "./UserInfo";
import axios from "axios";
import {
  SpotifyUserTopTracks,
  TrackFeatures,
} from "../../interfaces/spotifyInterfaces";
import qs from "qs";

export default function UserHome() {
  const [selectedTracks, setSelectedTracks] = useState<SpotifyUserTopTracks>();
  const [trackFeatures, setTrackFeatures] = useState<TrackFeatures[]>();

  useEffect(() => {
    if (selectedTracks) {
      let trackURIs = selectedTracks?.items.map((songInfo) => songInfo.uri);
      const getAudioFeatures = async () => {
        const res = await axios.get("/api/multi_track_audio_features", {
          params: trackURIs,
          paramsSerializer: {
            serialize: (trackURIs) => {
              return qs.stringify(trackURIs);
            },
          },
          withCredentials: true,
        });
        if (res.status === 200) {
          setTrackFeatures(res.data as TrackFeatures[]);
        }
      };
      getAudioFeatures();
    }
  }),
    [selectedTracks];
  return (
    <main>
      <UserInfo setSelectedTracks={setSelectedTracks} />
      {selectedTracks && <MoodCharts trackFeatures={trackFeatures} />}
    </main>
  );
}
