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
import { useAuth, useUser } from "@clerk/clerk-expo";
import { useRouter } from "expo-router";

function HomeScreen() {
  const colorScheme = useColorScheme();
  const { signOut } = useAuth();
  const { user } = useUser();
  const router = useRouter();

  const handleSignOut = async () => {
    await signOut();
    router.replace("/sign-in");
  };

  return (
    <ScrollView
      style={[
        styles.container,
        { backgroundColor: colorScheme === "dark" ? "#000" : "#fff" },
      ]}>
      <View style={styles.content}>
        <View style={styles.header}>
          <View style={styles.welcome}>
            <Text
              style={[
                styles.greeting,
                { color: colorScheme === "dark" ? "#fff" : "#000" },
              ]}>
              Welcome back,
            </Text>
            <Text
              style={[
                styles.name,
                { color: colorScheme === "dark" ? "#fff" : "#000" },
              ]}>
              {user?.firstName || "User"}
            </Text>
          </View>
          <TouchableOpacity
            style={[
              styles.signOutButton,
              { backgroundColor: colorScheme === "dark" ? "#333" : "#f0f0f0" },
            ]}
            onPress={handleSignOut}>
            <Ionicons
              name='log-out-outline'
              size={24}
              color={colorScheme === "dark" ? "#fff" : "#000"}
            />
          </TouchableOpacity>
        </View>

        <View style={styles.features}>
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
              name='musical-notes'
              size={24}
              color={colorScheme === "dark" ? "#fff" : "#000"}
            />
            <View style={styles.featureContent}>
              <Text
                style={[
                  styles.featureTitle,
                  { color: colorScheme === "dark" ? "#fff" : "#000" },
                ]}>
                Sound Library
              </Text>
              <Text
                style={[
                  styles.featureDescription,
                  { color: colorScheme === "dark" ? "#ccc" : "#666" },
                ]}>
                Explore our collection of calming and uplifting sounds
              </Text>
            </View>
          </View>

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
              name='heart'
              size={24}
              color={colorScheme === "dark" ? "#fff" : "#000"}
            />
            <View style={styles.featureContent}>
              <Text
                style={[
                  styles.featureTitle,
                  { color: colorScheme === "dark" ? "#fff" : "#000" },
                ]}>
                Mood Tracking
              </Text>
              <Text
                style={[
                  styles.featureDescription,
                  { color: colorScheme === "dark" ? "#ccc" : "#666" },
                ]}>
                Track your emotional well-being over time
              </Text>
            </View>
          </View>

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
              name='settings'
              size={24}
              color={colorScheme === "dark" ? "#fff" : "#000"}
            />
            <View style={styles.featureContent}>
              <Text
                style={[
                  styles.featureTitle,
                  { color: colorScheme === "dark" ? "#fff" : "#000" },
                ]}>
                Preferences
              </Text>
              <Text
                style={[
                  styles.featureDescription,
                  { color: colorScheme === "dark" ? "#ccc" : "#666" },
                ]}>
                Customize your experience and settings
              </Text>
            </View>
          </View>
        </View>
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
    padding: 20,
    paddingTop: 60,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 40,
  },
  welcome: {
    gap: 4,
  },
  greeting: {
    fontSize: 16,
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
  },
  signOutButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: "center",
    justifyContent: "center",
  },
  features: {
    gap: 16,
  },
  feature: {
    flexDirection: "row",
    padding: 20,
    borderRadius: 16,
    gap: 16,
    alignItems: "center",
  },
  featureContent: {
    flex: 1,
  },
  featureTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 4,
  },
  featureDescription: {
    fontSize: 14,
    lineHeight: 20,
  },
});

export default HomeScreen;
