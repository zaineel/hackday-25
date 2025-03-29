import React from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { useStore } from "../store/useStore";
import { Ionicons } from "@expo/vector-icons";
import { useColorScheme } from "react-native";
import SoundLibraryService, {
  SoundCategory,
} from "../services/soundLibraryService";
import { AudioService } from "../services/audioService";

const SOUND_CATEGORIES = [
  { id: "calming", name: "Calming", icon: "leaf" },
  { id: "elevating", name: "Elevating", icon: "sunny" },
  { id: "nature", name: "Nature", icon: "tree" },
  { id: "meditation", name: "Meditation", icon: "sparkles" },
  { id: "focus", name: "Focus", icon: "bulb" },
  { id: "sleep", name: "Sleep", icon: "moon" },
];

export default function SoundsScreen() {
  const colorScheme = useColorScheme();
  const { currentTrack, isPlaying, setIsPlaying, setCurrentTrack } = useStore();
  const soundLibrary = SoundLibraryService.getInstance();
  const audioService = AudioService.getInstance();

  const handleCategoryPress = async (category: SoundCategory) => {
    const sound = soundLibrary.getRandomSoundByCategory(category);
    if (sound && sound.url && sound.title && sound.artist) {
      setCurrentTrack(sound);
      await audioService.playTrack({
        id: sound.id,
        url: sound.url,
        title: sound.title,
        artist: sound.artist,
      });
    }
  };

  const renderCategory = ({ item }: { item: (typeof SOUND_CATEGORIES)[0] }) => (
    <TouchableOpacity
      style={[
        styles.categoryCard,
        { backgroundColor: colorScheme === "dark" ? "#333" : "#f0f0f0" },
      ]}
      onPress={() => handleCategoryPress(item.id as SoundCategory)}>
      <Ionicons
        name={item.icon as any}
        size={32}
        color={colorScheme === "dark" ? "#fff" : "#000"}
      />
      <Text
        style={[
          styles.categoryName,
          { color: colorScheme === "dark" ? "#fff" : "#000" },
        ]}>
        {item.name}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={SOUND_CATEGORIES}
        renderItem={renderCategory}
        keyExtractor={(item) => item.id}
        numColumns={2}
        contentContainerStyle={styles.grid}
      />

      {currentTrack && (
        <View
          style={[
            styles.playerBar,
            { backgroundColor: colorScheme === "dark" ? "#222" : "#fff" },
          ]}>
          <View style={styles.trackInfo}>
            <Text
              style={[
                styles.trackTitle,
                { color: colorScheme === "dark" ? "#fff" : "#000" },
              ]}>
              {currentTrack.title}
            </Text>
            <Text
              style={[
                styles.trackArtist,
                { color: colorScheme === "dark" ? "#999" : "#666" },
              ]}>
              {currentTrack.artist}
            </Text>
          </View>
          <TouchableOpacity
            onPress={() => {
              if (isPlaying) {
                audioService.pause();
              } else {
                audioService.resume();
              }
            }}
            style={styles.playButton}>
            <Ionicons
              name={isPlaying ? "pause" : "play"}
              size={24}
              color={colorScheme === "dark" ? "#fff" : "#000"}
            />
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  grid: {
    padding: 16,
  },
  categoryCard: {
    flex: 1,
    margin: 8,
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    aspectRatio: 1,
  },
  categoryName: {
    marginTop: 8,
    fontSize: 16,
    fontWeight: "600",
  },
  playerBar: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderTopWidth: 1,
    borderTopColor: "#eee",
  },
  trackInfo: {
    flex: 1,
  },
  trackTitle: {
    fontSize: 16,
    fontWeight: "600",
  },
  trackArtist: {
    fontSize: 14,
  },
  playButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
});
