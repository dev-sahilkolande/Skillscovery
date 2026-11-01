import { tracksData, recentlyPlayedIds } from "../data/music/musicData.js";
import { STORAGE_KEYS, getStoredItem, setStoredItem } from "./storage.js";

// Format seconds into MM:SS string
export function formatTime(seconds) {
  if (isNaN(seconds) || seconds < 0) return "00:00";
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
}

// Default initial values
const defaultFavoriteIds = tracksData.filter((t) => t.isFavorite).map((t) => t.id);
const defaultRecentlyPlayed = [...recentlyPlayedIds];

// Initial state with persisted preferences
const initialState = {
  currentTrack: tracksData[0], // Cyberpunk Ambient Drone 432Hz
  isPlaying: false, // Never auto-play on refresh
  currentTime: 1122, // 18:42 initial preview point
  volume: getStoredItem(STORAGE_KEYS.MUSIC_VOLUME, 0.75, (v) => typeof v === "number" && v >= 0 && v <= 1),
  isMuted: false,
  isShuffle: getStoredItem(STORAGE_KEYS.MUSIC_SHUFFLE, false, (v) => typeof v === "boolean"),
  isRepeat: getStoredItem(STORAGE_KEYS.MUSIC_REPEAT, false, (v) => typeof v === "boolean"),
  favoriteIds: getStoredItem(STORAGE_KEYS.MUSIC_FAVORITES, defaultFavoriteIds, (arr) => Array.isArray(arr)),
  recentlyPlayed: getStoredItem(STORAGE_KEYS.MUSIC_RECENTLY_PLAYED, defaultRecentlyPlayed, (arr) => Array.isArray(arr)),
};

let state = { ...initialState };
const listeners = new Set();
let timerInterval = null;

function notify() {
  listeners.forEach((listener) => listener());
}

// Simulated playback timer (mock playback ticker)
function startTicker() {
  if (timerInterval) return;
  timerInterval = setInterval(() => {
    if (!state.isPlaying) {
      stopTicker();
      return;
    }
    const maxDuration = state.currentTrack?.durationSeconds || 240;
    if (state.currentTime >= maxDuration) {
      if (state.isRepeat) {
        state = { ...state, currentTime: 0 };
        notify();
      } else {
        // Advance to next track
        audioPlayerStore.nextTrack();
      }
    } else {
      state = { ...state, currentTime: state.currentTime + 1 };
      notify();
    }
  }, 1000);
}

function stopTicker() {
  if (timerInterval) {
    clearInterval(timerInterval);
    timerInterval = null;
  }
}

export const audioPlayerStore = {
  getState: () => state,

  subscribe: (listener) => {
    listeners.add(listener);
    return () => listeners.delete(listener);
  },

  playTrack: (track) => {
    if (!track) return;
    const isSameTrack = state.currentTrack?.id === track.id;
    const newRecent = [track.id, ...state.recentlyPlayed.filter((id) => id !== track.id)].slice(0, 12);

    state = {
      ...state,
      currentTrack: track,
      isPlaying: true,
      currentTime: isSameTrack ? state.currentTime : 0,
      recentlyPlayed: newRecent,
    };
    setStoredItem(STORAGE_KEYS.MUSIC_RECENTLY_PLAYED, newRecent);
    startTicker();
    notify();
  },

  togglePlay: () => {
    const nextPlaying = !state.isPlaying;
    state = { ...state, isPlaying: nextPlaying };
    if (nextPlaying) {
      startTicker();
    } else {
      stopTicker();
    }
    notify();
  },

  seek: (seconds) => {
    const max = state.currentTrack?.durationSeconds || 240;
    const clamped = Math.max(0, Math.min(seconds, max));
    state = { ...state, currentTime: clamped };
    notify();
  },

  nextTrack: (playlistTracks = tracksData) => {
    const list = playlistTracks && playlistTracks.length > 0 ? playlistTracks : tracksData;
    const currentIndex = list.findIndex((t) => t.id === state.currentTrack?.id);
    let nextIndex = 0;

    if (state.isShuffle) {
      nextIndex = Math.floor(Math.random() * list.length);
    } else if (currentIndex !== -1 && currentIndex < list.length - 1) {
      nextIndex = currentIndex + 1;
    }

    const nextTrack = list[nextIndex];
    audioPlayerStore.playTrack(nextTrack);
  },

  prevTrack: (playlistTracks = tracksData) => {
    const list = playlistTracks && playlistTracks.length > 0 ? playlistTracks : tracksData;
    // If more than 3 seconds in, restart track
    if (state.currentTime > 3) {
      audioPlayerStore.seek(0);
      return;
    }
    const currentIndex = list.findIndex((t) => t.id === state.currentTrack?.id);
    let prevIndex = list.length - 1;
    if (currentIndex > 0) {
      prevIndex = currentIndex - 1;
    }
    const prevTrack = list[prevIndex];
    audioPlayerStore.playTrack(prevTrack);
  },

  setVolume: (val) => {
    const clamped = Math.max(0, Math.min(val, 1));
    state = { ...state, volume: clamped, isMuted: clamped === 0 };
    setStoredItem(STORAGE_KEYS.MUSIC_VOLUME, clamped);
    notify();
  },

  toggleMute: () => {
    state = { ...state, isMuted: !state.isMuted };
    notify();
  },

  toggleShuffle: () => {
    const nextShuffle = !state.isShuffle;
    state = { ...state, isShuffle: nextShuffle };
    setStoredItem(STORAGE_KEYS.MUSIC_SHUFFLE, nextShuffle);
    notify();
  },

  toggleRepeat: () => {
    const nextRepeat = !state.isRepeat;
    state = { ...state, isRepeat: nextRepeat };
    setStoredItem(STORAGE_KEYS.MUSIC_REPEAT, nextRepeat);
    notify();
  },

  toggleFavorite: (trackId) => {
    const exists = state.favoriteIds.includes(trackId);
    const updated = exists
      ? state.favoriteIds.filter((id) => id !== trackId)
      : [...state.favoriteIds, trackId];

    state = { ...state, favoriteIds: updated };
    setStoredItem(STORAGE_KEYS.MUSIC_FAVORITES, updated);
    notify();
  },
};
