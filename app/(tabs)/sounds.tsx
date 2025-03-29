import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  FlatList,
} from "react-native";
import { useColorScheme } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Audio } from "expo-av";
import { useStore } from "../../store/useStore";
import {
  fetchSounds,
  CATEGORIES,
  SoundTrack,
} from "../../services/soundService";

export default function SoundsScreen() {
  const colorScheme = useColorScheme();
  const { currentTrack, isPlaying, setCurrentTrack, setIsPlaying } = useStore();
  const [isLoading, setIsLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(CATEGORIES[0].id);
  const [sounds, setSounds] = useState<SoundTrack[]>([]);
  const [sound, setSound] = useState<Audio.Sound | null>(null);

  useEffect(() => {
    loadSounds(selectedCategory);
    return () => {
      if (sound) {
        sound.unloadAsync();
      }
    };
  }, [selectedCategory]);

  const loadSounds = async (category: string) => {
    setIsLoading(true);
    const fetchedSounds = await fetchSounds(category);
    setSounds(fetchedSounds);
    setIsLoading(false);
  };

  const handlePlaySound = async (track: SoundTrack) => {
    try {
      setIsLoading(true);

      // Stop current sound if playing
      if (sound) {
        await sound.unloadAsync();
      }

      // Load and play new sound
      const { sound: newSound } = await Audio.Sound.createAsync(
        { uri: track.url },
        { shouldPlay: true, isLooping: true }
      );
      setSound(newSound);
      setCurrentTrack(track);
      setIsPlaying(true);
    } catch (error) {
      console.log("Error playing sound:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleStopSound = async () => {
    try {
      if (sound) {
        await sound.stopAsync();
        await sound.unloadAsync();
        setSound(null);
        setCurrentTrack(null);
        setIsPlaying(false);
      }
    } catch (error) {
      console.log("Error stopping sound:", error);
    }
  };

  const renderCategoryItem = ({ item }: { item: (typeof CATEGORIES)[0] }) => (
    <TouchableOpacity
      style={[
        styles.categoryItem,
        {
          backgroundColor:
            selectedCategory === item.id
              ? colorScheme === "dark"
                ? "#fff"
                : "#000"
              : colorScheme === "dark"
              ? "rgba(255,255,255,0.1)"
              : "rgba(0,0,0,0.05)",
        },
      ]}
      onPress={() => setSelectedCategory(item.id)}>
      <Ionicons
        name={item.icon as any}
        size={24}
        color={
          selectedCategory === item.id
            ? colorScheme === "dark"
              ? "#000"
              : "#fff"
            : colorScheme === "dark"
            ? "#fff"
            : "#000"
        }
      />
      <Text
        style={[
          styles.categoryText,
          {
            color:
              selectedCategory === item.id
                ? colorScheme === "dark"
                  ? "#000"
                  : "#fff"
                : colorScheme === "dark"
                ? "#fff"
                : "#000",
          },
        ]}>
        {item.name}
      </Text>
    </TouchableOpacity>
  );

  const renderSoundItem = ({ item }: { item: SoundTrack }) => (
    <TouchableOpacity
      style={[
        styles.soundItem,
        {
          backgroundColor:
            colorScheme === "dark"
              ? "rgba(255,255,255,0.1)"
              : "rgba(0,0,0,0.05)",
        },
      ]}
      onPress={() =>
        currentTrack?.id === item.id && isPlaying
          ? handleStopSound()
          : handlePlaySound(item)
      }>
      <Ionicons
        name={item.icon as any}
        size={24}
        color={colorScheme === "dark" ? "#fff" : "#000"}
      />
      <View style={styles.soundInfo}>
        <Text
          style={[
            styles.soundTitle,
            { color: colorScheme === "dark" ? "#fff" : "#000" },
          ]}>
          {item.title}
        </Text>
        <Text
          style={[
            styles.soundArtist,
            { color: colorScheme === "dark" ? "#ccc" : "#666" },
          ]}>
          {item.artist}
        </Text>
      </View>
      {isLoading && currentTrack?.id === item.id ? (
        <ActivityIndicator
          size='small'
          color={colorScheme === "dark" ? "#fff" : "#000"}
        />
      ) : (
        <Ionicons
          name={currentTrack?.id === item.id && isPlaying ? "pause" : "play"}
          size={24}
          color={colorScheme === "dark" ? "#fff" : "#000"}
        />
      )}
    </TouchableOpacity>
  );

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: colorScheme === "dark" ? "#000" : "#fff" },
      ]}>
      <View style={styles.content}>
        <Text
          style={[
            styles.title,
            { color: colorScheme === "dark" ? "#fff" : "#000" },
          ]}>
          Sound Library
        </Text>
        <Text
          style={[
            styles.subtitle,
            { color: colorScheme === "dark" ? "#ccc" : "#666" },
          ]}>
          Choose a category and play soothing sounds
        </Text>

        <FlatList
          data={CATEGORIES}
          renderItem={renderCategoryItem}
          keyExtractor={(item) => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.categoriesList}
        />

        {isLoading && sounds.length === 0 ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator
              size='large'
              color={colorScheme === "dark" ? "#fff" : "#000"}
            />
          </View>
        ) : (
          <FlatList
            data={sounds}
            renderItem={renderSoundItem}
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={false}
            style={styles.soundsList}
          />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    padding: 20,
    paddingTop: 60,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 32,
  },
  categoriesList: {
    marginBottom: 24,
  },
  categoryItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    borderRadius: 12,
    marginRight: 12,
    gap: 8,
  },
  categoryText: {
    fontSize: 16,
    fontWeight: "600",
  },
  soundsList: {
    flex: 1,
  },
  soundItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    gap: 16,
  },
  soundInfo: {
    flex: 1,
  },
  soundTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 4,
  },
  soundArtist: {
    fontSize: 14,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
