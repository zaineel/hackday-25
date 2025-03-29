import { Track } from "react-native-track-player";

export type SoundCategory =
  | "calming"
  | "elevating"
  | "nature"
  | "meditation"
  | "focus"
  | "sleep";

export interface SoundTrack extends Track {
  category: SoundCategory;
  mood?: string;
}

export class SoundLibraryService {
  private static instance: SoundLibraryService;
  private sounds: SoundTrack[] = [];

  private constructor() {
    this.initializeSounds();
  }

  static getInstance(): SoundLibraryService {
    if (!SoundLibraryService.instance) {
      SoundLibraryService.instance = new SoundLibraryService();
    }
    return SoundLibraryService.instance;
  }

  private initializeSounds() {
    this.sounds = [
      {
        id: "calm-1",
        url: "https://cdn.freesound.org/previews/320/320654_5260872-lq.mp3",
        title: "Gentle Waves",
        artist: "Nature Sounds",
        category: "calming",
        mood: "calm",
      },
      {
        id: "elevate-1",
        url: "https://cdn.freesound.org/previews/320/320654_5260872-lq.mp3",
        title: "Sunny Morning",
        artist: "Nature Sounds",
        category: "elevating",
        mood: "happy",
      },
      {
        id: "nature-1",
        url: "https://cdn.freesound.org/previews/320/320654_5260872-lq.mp3",
        title: "Forest Ambience",
        artist: "Nature Sounds",
        category: "nature",
        mood: "relaxed",
      },
      {
        id: "meditation-1",
        url: "https://cdn.freesound.org/previews/320/320654_5260872-lq.mp3",
        title: "Mindful Meditation",
        artist: "Nature Sounds",
        category: "meditation",
        mood: "calm",
      },
      {
        id: "focus-1",
        url: "https://cdn.freesound.org/previews/320/320654_5260872-lq.mp3",
        title: "Deep Focus",
        artist: "Nature Sounds",
        category: "focus",
        mood: "focused",
      },
      {
        id: "sleep-1",
        url: "https://cdn.freesound.org/previews/320/320654_5260872-lq.mp3",
        title: "Peaceful Sleep",
        artist: "Nature Sounds",
        category: "sleep",
        mood: "relaxed",
      },
    ];
  }

  getSoundsByCategory(category: SoundCategory): SoundTrack[] {
    return this.sounds.filter((sound) => sound.category === category);
  }

  getRandomSoundByCategory(category: SoundCategory): SoundTrack | undefined {
    const categorySounds = this.getSoundsByCategory(category);
    if (categorySounds.length === 0) return undefined;
    const randomIndex = Math.floor(Math.random() * categorySounds.length);
    return categorySounds[randomIndex];
  }

  getSoundsByMood(mood: string): SoundTrack[] {
    return this.sounds.filter((sound) => sound.mood === mood);
  }

  getRandomSoundByMood(mood: string): SoundTrack | undefined {
    const moodSounds = this.getSoundsByMood(mood);
    if (moodSounds.length === 0) return undefined;
    const randomIndex = Math.floor(Math.random() * moodSounds.length);
    return moodSounds[randomIndex];
  }
}

export default SoundLibraryService;
