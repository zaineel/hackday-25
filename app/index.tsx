import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  Dimensions,
  ColorSchemeName,
} from "react-native";
import { useColorScheme } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";

const { width } = Dimensions.get("window");

function HomeScreen() {
  const colorScheme = useColorScheme();

  const handleSignIn = () => {
    router.push("/sign-in");
  };

  const handleSignUp = () => {
    router.push("/sign-up");
  };

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: colorScheme === "dark" ? "#000" : "#fff" },
      ]}>
      <View style={styles.content}>
        <View style={styles.header}>
          <Ionicons
            name='musical-notes'
            size={64}
            color={colorScheme === "dark" ? "#fff" : "#000"}
          />
          <Text
            style={[
              styles.title,
              { color: colorScheme === "dark" ? "#fff" : "#000" },
            ]}>
            MoodSound
          </Text>
          <Text
            style={[
              styles.subtitle,
              { color: colorScheme === "dark" ? "#ccc" : "#666" },
            ]}>
            Your personal sound companion for every mood
          </Text>
        </View>

        <View style={styles.features}>
          <Feature
            icon='camera'
            title='Emotion Detection'
            description='Play sounds based on your facial expressions'
            colorScheme={colorScheme}
          />
          <Feature
            icon='musical-notes'
            title='Curated Sounds'
            description='Handpicked sounds for every mood and moment'
            colorScheme={colorScheme}
          />
          <Feature
            icon='heart'
            title='Mental Wellness'
            description='Support your emotional well-being with therapeutic sounds'
            colorScheme={colorScheme}
          />
        </View>

        <View style={styles.buttons}>
          <TouchableOpacity
            style={[
              styles.button,
              styles.signUpButton,
              { backgroundColor: colorScheme === "dark" ? "#fff" : "#000" },
            ]}
            onPress={handleSignUp}>
            <Text
              style={[
                styles.buttonText,
                { color: colorScheme === "dark" ? "#000" : "#fff" },
              ]}>
              Get Started
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.button,
              styles.signInButton,
              {
                backgroundColor: "transparent",
                borderWidth: 1,
                borderColor: colorScheme === "dark" ? "#fff" : "#000",
              },
            ]}
            onPress={handleSignIn}>
            <Text
              style={[
                styles.buttonText,
                { color: colorScheme === "dark" ? "#fff" : "#000" },
              ]}>
              Sign In
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

function Feature({
  icon,
  title,
  description,
  colorScheme,
}: {
  icon: string;
  title: string;
  description: string;
  colorScheme: ColorSchemeName;
}) {
  return (
    <View
      style={[
        styles.feature,
        {
          backgroundColor:
            colorScheme === "dark"
              ? "rgba(255,255,255,0.1)"
              : "rgba(0,0,0,0.05)",
        },
      ]}>
      <Ionicons
        name={icon as any}
        size={24}
        color={colorScheme === "dark" ? "#fff" : "#000"}
      />
      <Text
        style={[
          styles.featureTitle,
          { color: colorScheme === "dark" ? "#fff" : "#000" },
        ]}>
        {title}
      </Text>
      <Text
        style={[
          styles.featureDescription,
          { color: colorScheme === "dark" ? "#ccc" : "#666" },
        ]}>
        {description}
      </Text>
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
    justifyContent: "space-between",
  },
  header: {
    alignItems: "center",
    marginTop: 60,
  },
  title: {
    fontSize: 48,
    fontWeight: "bold",
    marginTop: 16,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 18,
    textAlign: "center",
    marginTop: 8,
    maxWidth: width * 0.8,
  },
  features: {
    gap: 16,
    marginVertical: 40,
  },
  feature: {
    padding: 20,
    borderRadius: 16,
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
  },
  featureTitle: {
    fontSize: 18,
    fontWeight: "600",
    flex: 1,
  },
  featureDescription: {
    fontSize: 14,
    flex: 1,
  },
  buttons: {
    gap: 16,
    marginBottom: 40,
  },
  button: {
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
  },
  signUpButton: {
    marginBottom: 8,
  },
  signInButton: {
    marginBottom: 0,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "600",
  },
});

export default HomeScreen;
