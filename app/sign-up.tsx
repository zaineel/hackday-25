import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import { useColorScheme } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";

function SignUpScreen() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const colorScheme = useColorScheme();

  const handleSignUp = async () => {
    // TODO: Implement sign up logic
    router.push("/(tabs)");
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}>
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
            Create Account
          </Text>
          <Text
            style={[
              styles.subtitle,
              { color: colorScheme === "dark" ? "#ccc" : "#666" },
            ]}>
            Join us to start your wellness journey
          </Text>
        </View>

        <View style={styles.form}>
          <View
            style={[
              styles.inputContainer,
              {
                backgroundColor: colorScheme === "dark" ? "#333" : "#f0f0f0",
              },
            ]}>
            <Ionicons
              name='person'
              size={20}
              color={colorScheme === "dark" ? "#999" : "#666"}
            />
            <TextInput
              style={[
                styles.input,
                { color: colorScheme === "dark" ? "#fff" : "#000" },
              ]}
              placeholder='Full Name'
              placeholderTextColor={colorScheme === "dark" ? "#999" : "#666"}
              value={name}
              onChangeText={setName}
              autoCapitalize='words'
            />
          </View>

          <View
            style={[
              styles.inputContainer,
              {
                backgroundColor: colorScheme === "dark" ? "#333" : "#f0f0f0",
              },
            ]}>
            <Ionicons
              name='mail'
              size={20}
              color={colorScheme === "dark" ? "#999" : "#666"}
            />
            <TextInput
              style={[
                styles.input,
                { color: colorScheme === "dark" ? "#fff" : "#000" },
              ]}
              placeholder='Email'
              placeholderTextColor={colorScheme === "dark" ? "#999" : "#666"}
              value={email}
              onChangeText={setEmail}
              keyboardType='email-address'
              autoCapitalize='none'
            />
          </View>

          <View
            style={[
              styles.inputContainer,
              {
                backgroundColor: colorScheme === "dark" ? "#333" : "#f0f0f0",
              },
            ]}>
            <Ionicons
              name='lock-closed'
              size={20}
              color={colorScheme === "dark" ? "#999" : "#666"}
            />
            <TextInput
              style={[
                styles.input,
                { color: colorScheme === "dark" ? "#fff" : "#000" },
              ]}
              placeholder='Password'
              placeholderTextColor={colorScheme === "dark" ? "#999" : "#666"}
              value={password}
              onChangeText={setPassword}
              secureTextEntry={!showPassword}
            />
            <TouchableOpacity
              onPress={() => setShowPassword(!showPassword)}
              style={styles.eyeIcon}>
              <Ionicons
                name={showPassword ? "eye-off" : "eye"}
                size={20}
                color={colorScheme === "dark" ? "#999" : "#666"}
              />
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            style={[
              styles.button,
              { backgroundColor: colorScheme === "dark" ? "#fff" : "#000" },
            ]}
            onPress={handleSignUp}>
            <Text
              style={[
                styles.buttonText,
                { color: colorScheme === "dark" ? "#000" : "#fff" },
              ]}>
              Create Account
            </Text>
          </TouchableOpacity>

          <View style={styles.divider}>
            <View
              style={[
                styles.dividerLine,
                {
                  backgroundColor: colorScheme === "dark" ? "#333" : "#ddd",
                },
              ]}
            />
            <Text
              style={[
                styles.dividerText,
                { color: colorScheme === "dark" ? "#999" : "#666" },
              ]}>
              Or continue with
            </Text>
            <View
              style={[
                styles.dividerLine,
                {
                  backgroundColor: colorScheme === "dark" ? "#333" : "#ddd",
                },
              ]}
            />
          </View>

          <View style={styles.socialButtons}>
            <TouchableOpacity
              style={[
                styles.socialButton,
                {
                  backgroundColor: colorScheme === "dark" ? "#333" : "#f0f0f0",
                },
              ]}>
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
                Google
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.socialButton,
                {
                  backgroundColor: colorScheme === "dark" ? "#333" : "#f0f0f0",
                },
              ]}>
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
                Apple
              </Text>
            </TouchableOpacity>
          </View>

          <View style={styles.footer}>
            <Text
              style={[
                styles.footerText,
                { color: colorScheme === "dark" ? "#999" : "#666" },
              ]}>
              Already have an account?{" "}
            </Text>
            <TouchableOpacity onPress={() => router.push("/sign-in")}>
              <Text
                style={[
                  styles.footerLink,
                  { color: colorScheme === "dark" ? "#fff" : "#000" },
                ]}>
                Sign In
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
  form: {
    gap: 16,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderRadius: 12,
    gap: 12,
  },
  input: {
    flex: 1,
    fontSize: 16,
  },
  eyeIcon: {
    padding: 4,
  },
  button: {
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 8,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "600",
  },
  divider: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 24,
    gap: 12,
  },
  dividerLine: {
    flex: 1,
    height: 1,
  },
  dividerText: {
    fontSize: 14,
  },
  socialButtons: {
    flexDirection: "row",
    gap: 12,
  },
  socialButton: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
    borderRadius: 12,
    gap: 8,
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

export default SignUpScreen;
