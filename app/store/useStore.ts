import { create } from "zustand";
import { Track } from "react-native-track-player";

interface AppState {
  isPlaying: boolean;
  currentTrack: Track | null;
  isDarkMode: boolean;
  volume: number;
  setIsPlaying: (isPlaying: boolean) => void;
  setCurrentTrack: (track: Track | null) => void;
  toggleDarkMode: () => void;
  setVolume: (volume: number) => void;
}

const useStore = create<AppState>((set) => ({
  isPlaying: false,
  currentTrack: null,
  isDarkMode: false,
  volume: 1.0,
  setIsPlaying: (isPlaying) => set({ isPlaying }),
  setCurrentTrack: (track) => set({ currentTrack: track }),
  toggleDarkMode: () => set((state) => ({ isDarkMode: !state.isDarkMode })),
  setVolume: (volume) => set({ volume }),
}));

export default useStore;
