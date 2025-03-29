import TrackPlayer, { Track } from "react-native-track-player";

class AudioService {
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

    await TrackPlayer.setupPlayer();
    this.isInitialized = true;
  }

  async playTrack(track: Track) {
    await this.initialize();
    await TrackPlayer.reset();
    await TrackPlayer.add(track);
    await TrackPlayer.play();
  }

  async pause() {
    await TrackPlayer.pause();
  }

  async resume() {
    await TrackPlayer.play();
  }

  async stop() {
    await TrackPlayer.reset();
  }

  async setVolume(volume: number) {
    await TrackPlayer.setVolume(volume);
  }
}

export default AudioService;
