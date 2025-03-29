import React, { useEffect, useState } from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import { Camera } from "react-native-vision-camera";
import { useStore } from "../store/useStore";
import { useColorScheme } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useExpressionRecognition } from "../hooks/useExpressionRecognition";

export default function CameraScreen() {
  const colorScheme = useColorScheme();
  const [hasPermission, setHasPermission] = useState(false);
  const {
    setCameraActive,
    setCameraPermission,
    currentExpression,
    isCameraActive,
  } = useStore();
  const { device, cameraRef } = useExpressionRecognition();

  useEffect(() => {
    checkPermission();
  }, []);

  const checkPermission = async () => {
    const cameraPermission = await Camera.requestCameraPermission();
    setHasPermission(cameraPermission === "granted");
    setCameraPermission(cameraPermission === "granted");
  };

  if (!device || !hasPermission) {
    return (
      <View style={styles.container}>
        <Text
          style={[
            styles.text,
            { color: colorScheme === "dark" ? "#fff" : "#000" },
          ]}>
          {!device ? "Loading camera..." : "Camera permission required"}
        </Text>
      </View>
    );
  }

  const startCamera = () => {
    setCameraActive(true);
  };

  const stopCamera = () => {
    setCameraActive(false);
  };

  return (
    <View style={styles.container}>
      <Camera
        ref={cameraRef}
        style={StyleSheet.absoluteFill}
        device={device}
        isActive={isCameraActive}
        photo={true}
        video={false}
        audio={false}
      />

      <View style={styles.overlay}>
        <View style={styles.expressionContainer}>
          <Text
            style={[
              styles.expressionText,
              { color: colorScheme === "dark" ? "#fff" : "#000" },
            ]}>
            Current Expression: {currentExpression || "None detected"}
          </Text>
        </View>

        <View style={styles.controls}>
          <TouchableOpacity
            style={[
              styles.button,
              { backgroundColor: colorScheme === "dark" ? "#333" : "#fff" },
            ]}
            onPress={startCamera}>
            <Ionicons
              name='play'
              size={24}
              color={colorScheme === "dark" ? "#fff" : "#000"}
            />
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.button,
              { backgroundColor: colorScheme === "dark" ? "#333" : "#fff" },
            ]}
            onPress={stopCamera}>
            <Ionicons
              name='stop'
              size={24}
              color={colorScheme === "dark" ? "#fff" : "#000"}
            />
          </TouchableOpacity>
        </View>
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
    justifyContent: "space-between",
    padding: 20,
  },
  expressionContainer: {
    backgroundColor: "rgba(0,0,0,0.5)",
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
  },
  expressionText: {
    fontSize: 18,
    fontWeight: "600",
  },
  controls: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 20,
  },
  button: {
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: 16,
    textAlign: "center",
    marginTop: 20,
  },
});
