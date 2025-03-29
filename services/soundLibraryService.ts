import { Track } from "react-native-track-player";

export type SoundCategory =
  | "calming"
  | "elevating"
  | "nature"
  | "meditation"
  | "focus"
  | "sleep"
  | "ambient";

interface SoundTrack extends Track {
  category: SoundCategory;
  mood: string[];
}

class SoundLibraryService {
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
    // Using free-to-use sound URLs from freesound.org
    this.sounds = [
      {
        id: "calm-1",
        url: "https://cdn.freesound.org/previews/320/320654_5260872-lq.mp3",
        title: "Gentle Waves",
        artist: "Nature Sounds",
        category: "calming",
        mood: ["sad", "angry", "fearful", "disgusted"],
      },
      {
        id: "elevate-1",
        url: "https://cdn.freesound.org/previews/320/320654_5260872-lq.mp3",
        title: "Sunny Morning",
        artist: "Ambient Sounds",
        category: "elevating",
        mood: ["happy", "surprised"],
      },
      {
        id: "nature-1",
        url: "https://cdn.freesound.org/previews/320/320654_5260872-lq.mp3",
        title: "Forest Ambience",
        artist: "Nature Sounds",
        category: "nature",
        mood: ["neutral"],
      },
      {
        id: "meditation-1",
        url: "https://cdn.freesound.org/previews/320/320654_5260872-lq.mp3",
        title: "Mindful Meditation",
        artist: "Meditation Sounds",
        category: "meditation",
        mood: ["neutral", "sad", "angry"],
      },
      {
        id: "focus-1",
        url: "https://cdn.freesound.org/previews/320/320654_5260872-lq.mp3",
        title: "Deep Focus",
        artist: "Focus Sounds",
        category: "focus",
        mood: ["neutral"],
      },
      {
        id: "sleep-1",
        url: "https://cdn.freesound.org/previews/320/320654_5260872-lq.mp3",
        title: "Peaceful Sleep",
        artist: "Sleep Sounds",
        category: "sleep",
        mood: ["neutral", "sad", "angry"],
      },
    ];
  }

  getSoundsByCategory(category: SoundCategory): SoundTrack[] {
    return this.sounds.filter((sound) => sound.category === category);
  }

  getSoundsByMood(mood: string): SoundTrack[] {
    return this.sounds.filter((sound) => sound.mood.includes(mood));
  }

  getRandomSoundByCategory(category: SoundCategory): SoundTrack | undefined {
    const categorySounds = this.getSoundsByCategory(category);
    if (categorySounds.length === 0) return undefined;
    const randomIndex = Math.floor(Math.random() * categorySounds.length);
    return categorySounds[randomIndex];
  }

  getRandomSoundByMood(mood: string): SoundTrack | undefined {
    const moodSounds = this.getSoundsByMood(mood);
    if (moodSounds.length === 0) return undefined;
    const randomIndex = Math.floor(Math.random() * moodSounds.length);
    return moodSounds[randomIndex];
  }

  getAllSounds(): SoundTrack[] {
    return [...this.sounds];
  }

  getCategories(): SoundCategory[] {
    return Array.from(new Set(this.sounds.map((sound) => sound.category)));
  }
}

export default SoundLibraryService;
