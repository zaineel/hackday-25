import { ClerkProvider } from "@clerk/clerk-expo";
import { useColorScheme } from "react-native";
import * as SecureStore from "expo-secure-store";

const tokenCache = {
  async getToken(key: string) {
    try {
      return SecureStore.getItemAsync(key);
    } catch (err) {
      return null;
    }
  },
  async saveToken(key: string, value: string) {
    try {
      return SecureStore.setItemAsync(key, value);
    } catch (err) {
      return;
    }
  },
};

// If you don't have a publishable key, get it from https://dashboard.clerk.com/last-active?path=api-keys
const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY;
if (!publishableKey) {
  throw new Error(
    "Missing publishable key. Please add it to your .env file: EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY=your_key_here"
  );
}

export default function Provider({ children }: { children: React.ReactNode }) {
  const colorScheme = useColorScheme();

  return (
    <ClerkProvider
      publishableKey={publishableKey}
      tokenCache={tokenCache}
      appearance={{
        baseTheme: colorScheme === "dark" ? "dark" : "light",
      }}>
      {children}
    </ClerkProvider>
  );
}
