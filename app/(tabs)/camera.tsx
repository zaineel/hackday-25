import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { useColorScheme } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import * as Linking from "expo-linking";

function CameraScreen() {
  const colorScheme = useColorScheme();

  const handleLearnMore = () => {
    Linking.openURL(
      "https://docs.expo.dev/development/create-development-builds/"
    );
  };

  return (
    <ScrollView
      style={[
        styles.container,
        { backgroundColor: colorScheme === "dark" ? "#000" : "#fff" },
      ]}>
      <View style={styles.content}>
        <Ionicons
          name='camera'
          size={64}
          color={colorScheme === "dark" ? "#fff" : "#000"}
        />
        <Text
          style={[
            styles.title,
            { color: colorScheme === "dark" ? "#fff" : "#000" },
          ]}>
          Camera Not Available
        </Text>
        <Text
          style={[
            styles.message,
            { color: colorScheme === "dark" ? "#ccc" : "#666" },
          ]}>
          The camera feature requires a development build because it uses
          react-native-vision-camera, which is not supported in Expo Go.
        </Text>
        <View style={styles.steps}>
          <Text
            style={[
              styles.stepsTitle,
              { color: colorScheme === "dark" ? "#fff" : "#000" },
            ]}>
            To create a development build:
          </Text>
          <Text
            style={[
              styles.step,
              { color: colorScheme === "dark" ? "#ccc" : "#666" },
            ]}>
            1. Install EAS CLI: npm install -g eas-cli
          </Text>
          <Text
            style={[
              styles.step,
              { color: colorScheme === "dark" ? "#ccc" : "#666" },
            ]}>
            2. Log in to your Expo account: eas login
          </Text>
          <Text
            style={[
              styles.step,
              { color: colorScheme === "dark" ? "#ccc" : "#666" },
            ]}>
            3. Configure the project: eas build:configure
          </Text>
          <Text
            style={[
              styles.step,
              { color: colorScheme === "dark" ? "#ccc" : "#666" },
            ]}>
            4. Create development build: npx expo prebuild
          </Text>
          <Text
            style={[
              styles.step,
              { color: colorScheme === "dark" ? "#ccc" : "#666" },
            ]}>
            5. Run the app: npx expo run:ios or npx expo run:android
          </Text>
        </View>
        <TouchableOpacity
          style={[
            styles.button,
            { backgroundColor: colorScheme === "dark" ? "#333" : "#f0f0f0" },
          ]}
          onPress={handleLearnMore}>
          <Text
            style={[
              styles.buttonText,
              { color: colorScheme === "dark" ? "#fff" : "#000" },
            ]}>
            Learn More
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    gap: 16,
    paddingTop: 60,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
  },
  message: {
    fontSize: 16,
    textAlign: "center",
    maxWidth: "80%",
  },
  steps: {
    width: "100%",
    padding: 16,
    backgroundColor: "rgba(0,0,0,0.05)",
    borderRadius: 12,
    gap: 8,
  },
  stepsTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 8,
  },
  step: {
    fontSize: 14,
    lineHeight: 20,
  },
  button: {
    padding: 16,
    borderRadius: 12,
    marginTop: 8,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "600",
  },
});

export default CameraScreen;
