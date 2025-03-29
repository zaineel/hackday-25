import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import { useColorScheme } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useOAuth } from "@clerk/clerk-expo";
import * as WebBrowser from "expo-web-browser";

WebBrowser.maybeCompleteAuthSession();

function SignInScreen() {
  const colorScheme = useColorScheme();
  const { startOAuthFlow: googleAuth } = useOAuth({ strategy: "oauth_google" });
  const { startOAuthFlow: appleAuth } = useOAuth({ strategy: "oauth_apple" });

  const onSignInWithGoogle = async () => {
    try {
      const { createdSessionId, setActive } = await googleAuth();
      if (createdSessionId && setActive) {
        setActive({ session: createdSessionId });
        router.replace("/(tabs)");
      }
    } catch (err) {
      console.error("OAuth error", err);
    }
  };

  const onSignInWithApple = async () => {
    try {
      const { createdSessionId, setActive } = await appleAuth();
      if (createdSessionId && setActive) {
        setActive({ session: createdSessionId });
        router.replace("/(tabs)");
      }
    } catch (err) {
      console.error("OAuth error", err);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={[
        styles.container,
        { backgroundColor: colorScheme === "dark" ? "#000" : "#fff" },
      ]}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps='handled'>
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => router.back()}>
            <Ionicons
              name='arrow-back'
              size={24}
              color={colorScheme === "dark" ? "#fff" : "#000"}
            />
          </TouchableOpacity>
          <Text
            style={[
              styles.title,
              { color: colorScheme === "dark" ? "#fff" : "#000" },
            ]}>
            Welcome Back
          </Text>
          <Text
            style={[
              styles.subtitle,
              { color: colorScheme === "dark" ? "#ccc" : "#666" },
            ]}>
            Sign in to continue your journey
          </Text>
        </View>

        <View style={styles.content}>
          <View style={styles.socialButtons}>
            <TouchableOpacity
              style={[
                styles.socialButton,
                {
                  backgroundColor: colorScheme === "dark" ? "#333" : "#f0f0f0",
                },
              ]}
              onPress={onSignInWithGoogle}>
              <Ionicons
                name='logo-google'
                size={24}
                color={colorScheme === "dark" ? "#fff" : "#000"}
              />
              <Text
                style={[
                  styles.socialButtonText,
                  { color: colorScheme === "dark" ? "#fff" : "#000" },
                ]}>
                Continue with Google
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.socialButton,
                {
                  backgroundColor: colorScheme === "dark" ? "#333" : "#f0f0f0",
                },
              ]}
              onPress={onSignInWithApple}>
              <Ionicons
                name='logo-apple'
                size={24}
                color={colorScheme === "dark" ? "#fff" : "#000"}
              />
              <Text
                style={[
                  styles.socialButtonText,
                  { color: colorScheme === "dark" ? "#fff" : "#000" },
                ]}>
                Continue with Apple
              </Text>
            </TouchableOpacity>
          </View>

          <View style={styles.footer}>
            <Text
              style={[
                styles.footerText,
                { color: colorScheme === "dark" ? "#999" : "#666" },
              ]}>
              Don't have an account?{" "}
            </Text>
            <TouchableOpacity onPress={() => router.push("/sign-up")}>
              <Text
                style={[
                  styles.footerLink,
                  { color: colorScheme === "dark" ? "#fff" : "#000" },
                ]}>
                Sign Up
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    padding: 20,
  },
  header: {
    marginTop: 60,
    marginBottom: 40,
  },
  backButton: {
    marginBottom: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
  },
  content: {
    flex: 1,
    justifyContent: "space-between",
  },
  socialButtons: {
    gap: 16,
  },
  socialButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
    borderRadius: 12,
    gap: 12,
  },
  socialButtonText: {
    fontSize: 16,
    fontWeight: "500",
  },
  footer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 24,
  },
  footerText: {
    fontSize: 14,
  },
  footerLink: {
    fontSize: 14,
    fontWeight: "600",
  },
});

export default SignInScreen;
