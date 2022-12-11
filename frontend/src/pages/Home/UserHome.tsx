import { useEffect, useState } from "react";
import MoodCharts from "./MoodCharts";
import UserInfo from "./UserInfo";
import axios from "axios";
import {
  SpotifyUserTopTracks,
  TrackCompleteInfo,
} from "../../interfaces/spotifyInterfaces";
import qs from "qs";

export default function UserHome() {
  const [selectedTracks, setSelectedTracks] = useState<SpotifyUserTopTracks>();
  const [trackFeatures, setTrackFeatures] = useState<TrackCompleteInfo[]>();

  useEffect(() => {
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
        setTrackFeatures(res.data as TrackCompleteInfo[]);
      }
    };
    getAudioFeatures();
  }),
    [selectedTracks];
  return (
    <main>
      <UserInfo setSelectedTracks={setSelectedTracks} />
      {selectedTracks && <MoodCharts trackFeatures={trackFeatures} />}
    </main>
  );
}
