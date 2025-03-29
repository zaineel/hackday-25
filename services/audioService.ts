import TrackPlayer, {
  Event,
  State,
  Capability,
} from "react-native-track-player";
import { useStore } from "../store/useStore";
import { Alert, Platform } from "react-native";

// Define custom track interface that matches your requirements
interface AudioTrack {
  id: string;
  url: string;
  title: string;
  artist: string;
}

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
      // Enhanced setup with buffer configuration
      await TrackPlayer.setupPlayer({
        minBuffer: 15,
        maxBuffer: 50,
        backBuffer: 30,
        playBuffer: 3,
      });

      // Use the enum types from your version of the library
      // Remove the iOS category options that don't exist in your version
      await TrackPlayer.updateOptions({
        capabilities: [Capability.Play, Capability.Pause, Capability.Stop],
        compactCapabilities: [Capability.Play, Capability.Pause],
        // Removed the iosCategory options that were causing errors
      });

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
      TrackPlayer.addEventListener(
        Event.PlaybackError,
        this.handlePlaybackError
      );
    } catch (error) {
      console.error("Error initializing audio service:", error);
      Alert.alert("Audio Service Error", "Failed to initialize audio player");
    }
  }

  private handleTrackChange = async () => {
    try {
      const currentTrack = await TrackPlayer.getCurrentTrack();
      if (currentTrack !== null) {
        const track = await TrackPlayer.getTrack(currentTrack);
        if (track) {
          useStore
            .getState()
            .setCurrentTrack({ ...track, icon: "musical-note" });
        }
      }
    } catch (error) {
      console.error("Error handling track change:", error);
    }
  };

  private handlePlaybackState = async (event: { state: State }) => {
    useStore.getState().setIsPlaying(event.state === State.Playing);
  };

  private handlePlaybackError = (error: any) => {
    console.error("Playback error:", error);
    // Show a user-friendly error message
    const errorMessage = this.getErrorMessage(error);
    Alert.alert("Audio Playback Error", errorMessage, [{ text: "OK" }]);
  };

  private getErrorMessage(error: any): string {
    // Handle specific error codes
    if (Platform.OS === "ios") {
      if (error.code === -11828) {
        return "This audio format is not supported. Please try a different track.";
      }
    }

    return (
      error.message ||
      "There was an issue playing this audio file. Please try another track."
    );
  }

  async playTrack(track: AudioTrack) {
    try {
      // Validate the URL first
      if (!this.isValidUrl(track.url)) {
        throw new Error("Invalid audio URL");
      }

      await TrackPlayer.reset();

      // Create a new track object with an icon property to match SoundTrack
      const trackWithIcon = {
        ...track,
        icon: "musical-note", // Provide a default icon
      };

      await TrackPlayer.add(trackWithIcon as any);
      await TrackPlayer.play();
    } catch (error) {
      console.error("Error playing track:", error);
      Alert.alert(
        "Playback Error",
        "Failed to play this track. The format may not be supported.",
        [{ text: "OK" }]
      );
    }
  }

  private isValidUrl(urlString: string): boolean {
    try {
      const url = new URL(urlString);
      return url.protocol === "http:" || url.protocol === "https:";
    } catch (e) {
      return false;
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
