import React, { useEffect, useRef } from "react";
import { View, StyleSheet, TouchableOpacity, Text } from "react-native";
import { Camera, useCameraDevice } from "react-native-vision-camera";
import { useExpressionRecognition } from "../hooks/useExpressionRecognition";
import { useStore } from "../store/useStore";
import SoundLibraryService from "../services/soundLibraryService";
import { AudioService } from "../services/audioService";
import { useColorScheme } from "react-native";
import { Ionicons } from "@expo/vector-icons";

function CameraScreen() {
  const device = useCameraDevice("front");
  const camera = useRef<Camera>(null);
  const { emotion, isProcessing, analyzeExpression } =
    useExpressionRecognition();
  const { setCurrentTrack } = useStore();
  const soundLibrary = SoundLibraryService.getInstance();
  const audioService = AudioService.getInstance();
  const colorScheme = useColorScheme();

  useEffect(() => {
    if (emotion) {
      const sound = soundLibrary.getRandomSoundByMood(emotion);
      if (sound && sound.url && sound.title && sound.artist) {
        setCurrentTrack(sound);
        audioService.playTrack({
          id: sound.id,
          url: sound.url,
          title: sound.title,
          artist: sound.artist,
        });
      }
    }
  }, [emotion]);

  const capturePhoto = async () => {
    if (camera.current) {
      const photo = await camera.current.takePhoto();
      const base64 = await photo.toBase64();
      if (base64) {
        analyzeExpression(base64);
      }
    }
  };

  if (!device) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Camera not available</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Camera
        ref={camera}
        style={StyleSheet.absoluteFill}
        device={device}
        isActive={true}
        photo={true}
      />
      <View style={styles.overlay}>
        <TouchableOpacity
          style={[
            styles.captureButton,
            { backgroundColor: colorScheme === "dark" ? "#fff" : "#000" },
          ]}
          onPress={capturePhoto}
          disabled={isProcessing}>
          <Text
            style={[
              styles.captureButtonText,
              { color: colorScheme === "dark" ? "#000" : "#fff" },
            ]}>
            {isProcessing ? "Analyzing..." : "Capture"}
          </Text>
        </TouchableOpacity>
        {emotion && (
          <Text
            style={[
              styles.emotionText,
              { color: colorScheme === "dark" ? "#fff" : "#000" },
            ]}>
            Detected Emotion: {emotion}
          </Text>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },
  overlay: {
    flex: 1,
    backgroundColor: "transparent",
    justifyContent: "flex-end",
    padding: 20,
  },
  captureButton: {
    width: 70,
    height: 70,
    borderRadius: 35,
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },
  captureButtonText: {
    fontSize: 16,
    fontWeight: "600",
  },
  emotionText: {
    fontSize: 18,
    fontWeight: "600",
    textAlign: "center",
    marginBottom: 20,
  },
  errorText: {
    fontSize: 16,
    color: "#ff0000",
    textAlign: "center",
    marginTop: 20,
  },
});

export default CameraScreen;
