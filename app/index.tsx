import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import { useAuth } from "@clerk/clerk-expo";
import { useRouter } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";

export default function LandingPage() {
  const { isSignedIn, signOut } = useAuth();
  const router = useRouter();

  const handleSignIn = () => {
    router.push("/sign-in");
  };

  const handleSignUp = () => {
    router.push("/sign-up");
  };

  const handleSignOut = async () => {
    await signOut();
    router.replace("/");
  };

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={["#4c669f", "#3b5998", "#192f6a"]}
        style={styles.gradient}>
        <View style={styles.content}>
          <Image
            source={require("../assets/images/icon.png")}
            style={styles.logo}
            resizeMode='contain'
          />
          <Text style={styles.title}>Welcome to Our App</Text>
          <Text style={styles.subtitle}>
            Your one-stop solution for everything you need
          </Text>

          {isSignedIn ? (
            <TouchableOpacity style={styles.button} onPress={handleSignOut}>
              <Text style={styles.buttonText}>Sign Out</Text>
            </TouchableOpacity>
          ) : (
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={[styles.button, styles.signInButton]}
                onPress={handleSignIn}>
                <Text style={styles.buttonText}>Sign In</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.button, styles.signUpButton]}
                onPress={handleSignUp}>
                <Text style={styles.buttonText}>Sign Up</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </LinearGradient>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradient: {
    flex: 1,
  },
  content: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  logo: {
    width: 120,
    height: 120,
    marginBottom: 30,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#ffffff",
    marginBottom: 10,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 18,
    color: "#ffffff",
    marginBottom: 40,
    textAlign: "center",
    opacity: 0.8,
  },
  buttonContainer: {
    width: "100%",
    gap: 15,
  },
  button: {
    width: "100%",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  signInButton: {
    backgroundColor: "#ffffff",
  },
  signUpButton: {
    backgroundColor: "transparent",
    borderWidth: 2,
    borderColor: "#ffffff",
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#3b5998",
  },
});
