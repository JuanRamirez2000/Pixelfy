import { useEffect } from "react";
import { TrackFeatures } from "../../interfaces/spotifyInterfaces";

interface TrackMoods {
  trackName: string;
  trackArtist: string;
  trackMood: number;
}

export default function MoodCharts({
  trackFeatures,
}: {
  trackFeatures: TrackFeatures[] | any;
}) {
  let songMoodInfo = getSongMoods(trackFeatures);

  return (
    <div>
      <svg className="m-0 w-full">
        <g className="plot-area" />
        <g className="x-axis" />
        <g className="y-axis" />
      </svg>
    </div>
  );
}

let getSongMoods = (tracks: TrackFeatures[]) => {
  let trackMoods = tracks.map((track) => {
    return {
      track: track.trackName,
      artist: track.trackArtist,
      trackMood: track.trackFeatures.valence,
    };
  });
  let totalMood =
    trackMoods.reduce((prev, curr) => prev + (curr.trackMood || 0), 0) /
    trackMoods.length;
  return {
    tracksMoods: trackMoods,
    totalMood: totalMood,
  };
};
