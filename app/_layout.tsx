import { Stack } from "expo-router";
import { useColorScheme } from "react-native";
import Provider from "./provider";
import { useAuth } from "@clerk/clerk-expo";
import { useEffect } from "react";
import { router } from "expo-router";
import { View, ActivityIndicator } from "react-native";
import { Audio } from "expo-av";

export default function RootLayout() {
  const colorScheme = useColorScheme();

  useEffect(() => {
    initializeAudio();
  }, []);

  const initializeAudio = async () => {
    try {
      await Audio.setAudioModeAsync({
        playsInSilentModeIOS: true,
        staysActiveInBackground: true,
        shouldDuckAndroid: true,
      });
    } catch (error) {
      console.log("Error initializing audio:", error);
    }
  };

  return (
    <Provider>
      <RootLayoutNav />
    </Provider>
  );
}

function RootLayoutNav() {
  const colorScheme = useColorScheme();
  const { isLoaded, isSignedIn } = useAuth();

  useEffect(() => {
    if (!isLoaded) return;

    if (isSignedIn) {
      router.replace("/(tabs)/home");
    } else {
      router.replace("/sign-in");
    }
  }, [isLoaded, isSignedIn]);

  if (!isLoaded) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: colorScheme === "dark" ? "#000" : "#fff",
        }}>
        <ActivityIndicator
          size='large'
          color={colorScheme === "dark" ? "#fff" : "#000"}
        />
      </View>
    );
  }

  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: {
          backgroundColor: colorScheme === "dark" ? "#000" : "#fff",
        },
      }}>
      <Stack.Screen name='index' options={{ headerShown: false }} />
      <Stack.Screen name='(tabs)' options={{ headerShown: false }} />
      <Stack.Screen name='sign-in' options={{ headerShown: false }} />
      <Stack.Screen name='sign-up' options={{ headerShown: false }} />
    </Stack>
  );
}
