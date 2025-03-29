import { create } from "zustand";
import { SoundTrack } from "../services/soundService";

interface AppState {
  // Audio state
  currentTrack: SoundTrack | null;
  isPlaying: boolean;
  volume: number;

  // Camera state
  isCameraActive: boolean;
  hasCameraPermission: boolean;

  // Expression state
  currentExpression: string | null;
  expressionHistory: string[];

  // Actions
  setCurrentTrack: (track: SoundTrack | null) => void;
  setIsPlaying: (isPlaying: boolean) => void;
  setVolume: (volume: number) => void;
  setCameraActive: (active: boolean) => void;
  setCameraPermission: (hasPermission: boolean) => void;
  setCurrentExpression: (expression: string) => void;
  addToExpressionHistory: (expression: string) => void;
}

export const useStore = create<AppState>((set) => ({
  // Initial state
  currentTrack: null,
  isPlaying: false,
  volume: 1.0,
  isCameraActive: false,
  hasCameraPermission: false,
  currentExpression: null,
  expressionHistory: [],

  // Actions
  setCurrentTrack: (track) => set({ currentTrack: track }),
  setIsPlaying: (isPlaying) => set({ isPlaying }),
  setVolume: (volume) => set({ volume }),
  setCameraActive: (active) => set({ isCameraActive: active }),
  setCameraPermission: (hasPermission) =>
    set({ hasCameraPermission: hasPermission }),
  setCurrentExpression: (expression) => set({ currentExpression: expression }),
  addToExpressionHistory: (expression) =>
    set((state) => ({
      expressionHistory: [...state.expressionHistory, expression].slice(-10),
    })),
}));
