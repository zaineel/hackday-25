import { Track } from "react-native-track-player";

const PIXABAY_API_KEY = process.env.EXPO_PUBLIC_PIXABAY_API_KEY;
const PIXABAY_API_URL = "https://pixabay.com/api/";

export interface SoundTrack extends Track {
  icon: string;
}

export const CATEGORIES = [
  { id: "nature", name: "Nature", icon: "leaf" },
  { id: "meditation", name: "Meditation", icon: "sparkles" },
  { id: "sleep", name: "Sleep", icon: "moon" },
  { id: "focus", name: "Focus", icon: "timer" },
];

export async function fetchSounds(category: string): Promise<SoundTrack[]> {
  try {
    const response = await fetch(
      `${PIXABAY_API_URL}?key=${PIXABAY_API_KEY}&category=${category}&per_page=20&safesearch=true`
    );

    if (!response.ok) {
      throw new Error("Failed to fetch sounds");
    }

    const data = await response.json();
    return data.hits.map((hit: any) => ({
      id: hit.id.toString(),
      url: hit.previewURL,
      title: hit.tags.split(",")[0],
      artist: "Pixabay",
      duration: 180, // Default duration in seconds
      icon: getCategoryIcon(category),
    }));
  } catch (error) {
    console.error("Error fetching sounds:", error);
    return [];
  }
}

function getCategoryIcon(category: string): string {
  const categoryData = CATEGORIES.find((cat) => cat.id === category);
  return categoryData?.icon || "musical-notes";
}
