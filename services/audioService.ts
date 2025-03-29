import TrackPlayer, { Event, State, Track } from "react-native-track-player";
import { useStore } from "../store/useStore";

export class AudioService {
  private static instance: AudioService;
  private isInitialized = false;

  private constructor() {}

  static getInstance(): AudioService {
    if (!AudioService.instance) {
      AudioService.instance = new AudioService();
    }
    return AudioService.instance;
  }

  async initialize() {
    if (this.isInitialized) return;

    try {
      await TrackPlayer.setupPlayer();
      this.isInitialized = true;

      // Set up event listeners
      TrackPlayer.addEventListener(
        Event.PlaybackTrackChanged,
        this.handleTrackChange
      );
      TrackPlayer.addEventListener(
        Event.PlaybackState,
        this.handlePlaybackState
      );
    } catch (error) {
      console.error("Error initializing audio service:", error);
    }
  }

  private handleTrackChange = async () => {
    const currentTrack = await TrackPlayer.getCurrentTrack();
    if (currentTrack) {
      const track = await TrackPlayer.getTrack(currentTrack);
      if (track) {
        useStore.getState().setCurrentTrack(track);
      }
    }
  };

  private handlePlaybackState = async (event: { state: State }) => {
    useStore.getState().setIsPlaying(event.state === State.Playing);
  };

  async playTrack(track: {
    id: string;
    url: string;
    title: string;
    artist: string;
  }) {
    try {
      await TrackPlayer.reset();
      await TrackPlayer.add(track);
      await TrackPlayer.play();
    } catch (error) {
      console.error("Error playing track:", error);
    }
  }

  async pause() {
    try {
      await TrackPlayer.pause();
    } catch (error) {
      console.error("Error pausing track:", error);
    }
  }

  async resume() {
    try {
      await TrackPlayer.play();
    } catch (error) {
      console.error("Error resuming track:", error);
    }
  }

  async stop() {
    try {
      await TrackPlayer.stop();
    } catch (error) {
      console.error("Error stopping track:", error);
    }
  }

  async setVolume(volume: number) {
    try {
      await TrackPlayer.setVolume(volume);
    } catch (error) {
      console.error("Error setting volume:", error);
    }
  }

  async cleanup() {
    try {
      await TrackPlayer.reset();
      this.isInitialized = false;
    } catch (error) {
      console.error("Error cleaning up audio service:", error);
    }
  }
}
