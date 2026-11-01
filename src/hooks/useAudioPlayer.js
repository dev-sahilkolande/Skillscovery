import { useSyncExternalStore } from "react";
import { audioPlayerStore, formatTime } from "../utils/audioPlayerStore";

export function useAudioPlayer() {
  const state = useSyncExternalStore(
    audioPlayerStore.subscribe,
    audioPlayerStore.getState
  );

  const durationSeconds = state.currentTrack?.durationSeconds || 240;
  const progressPercent = Math.min(
    100,
    Math.max(0, (state.currentTime / durationSeconds) * 100)
  );

  return {
    ...state,
    currentTimeFormatted: formatTime(state.currentTime),
    totalTimeFormatted: formatTime(durationSeconds),
    progressPercent,
    isCurrentTrackFavorite: state.favoriteIds.includes(state.currentTrack?.id),
    playTrack: audioPlayerStore.playTrack,
    togglePlay: audioPlayerStore.togglePlay,
    seek: audioPlayerStore.seek,
    nextTrack: audioPlayerStore.nextTrack,
    prevTrack: audioPlayerStore.prevTrack,
    setVolume: audioPlayerStore.setVolume,
    toggleMute: audioPlayerStore.toggleMute,
    toggleShuffle: audioPlayerStore.toggleShuffle,
    toggleRepeat: audioPlayerStore.toggleRepeat,
    toggleFavorite: audioPlayerStore.toggleFavorite,
  };
}
