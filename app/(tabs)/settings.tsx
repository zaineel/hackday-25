import React from "react";
import { View, Text, StyleSheet, Switch, TouchableOpacity } from "react-native";
import { useStore } from "../store/useStore";
import { useColorScheme } from "react-native";
import { Ionicons } from "@expo/vector-icons";

type BaseSetting = {
  id: string;
  title: string;
  icon: string;
};

type SwitchSetting = BaseSetting & {
  type: "switch";
  value: boolean;
  onValueChange: (value: boolean) => void;
};

type SliderSetting = BaseSetting & {
  type: "slider";
  value: number;
  onValueChange: (value: number) => void;
};

type Setting = SwitchSetting | SliderSetting;

export default function SettingsScreen() {
  const colorScheme = useColorScheme();
  const { volume, setVolume } = useStore();

  const settings: Setting[] = [
    {
      id: "darkMode",
      title: "Dark Mode",
      icon: "moon",
      type: "switch",
      value: colorScheme === "dark",
      onValueChange: () => {}, // TODO: Implement dark mode toggle
    },
    {
      id: "volume",
      title: "Sound Volume",
      icon: "volume-high",
      type: "slider",
      value: volume,
      onValueChange: setVolume,
    },
    {
      id: "notifications",
      title: "Enable Notifications",
      icon: "notifications",
      type: "switch",
      value: true,
      onValueChange: () => {}, // TODO: Implement notifications toggle
    },
    {
      id: "autoPlay",
      title: "Auto-Play on Expression Change",
      icon: "play",
      type: "switch",
      value: true,
      onValueChange: () => {}, // TODO: Implement auto-play toggle
    },
  ];

  const renderSetting = (setting: Setting) => (
    <View
      key={setting.id}
      style={[
        styles.settingItem,
        { backgroundColor: colorScheme === "dark" ? "#333" : "#f0f0f0" },
      ]}>
      <View style={styles.settingLeft}>
        <Ionicons
          name={setting.icon as any}
          size={24}
          color={colorScheme === "dark" ? "#fff" : "#000"}
        />
        <Text
          style={[
            styles.settingTitle,
            { color: colorScheme === "dark" ? "#fff" : "#000" },
          ]}>
          {setting.title}
        </Text>
      </View>

      {setting.type === "switch" && (
        <Switch
          value={setting.value}
          onValueChange={setting.onValueChange}
          trackColor={{ false: "#767577", true: "#81b0ff" }}
          thumbColor={setting.value ? "#007AFF" : "#f4f3f4"}
        />
      )}
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text
          style={[
            styles.headerTitle,
            { color: colorScheme === "dark" ? "#fff" : "#000" },
          ]}>
          Settings
        </Text>
      </View>

      <View style={styles.settingsList}>{settings.map(renderSetting)}</View>

      <TouchableOpacity
        style={[
          styles.button,
          { backgroundColor: colorScheme === "dark" ? "#333" : "#f0f0f0" },
        ]}>
        <Text
          style={[
            styles.buttonText,
            { color: colorScheme === "dark" ? "#fff" : "#000" },
          ]}>
          About App
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  header: {
    marginBottom: 24,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: "bold",
  },
  settingsList: {
    gap: 12,
  },
  settingItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 16,
    borderRadius: 12,
  },
  settingLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  settingTitle: {
    fontSize: 16,
    fontWeight: "500",
  },
  button: {
    marginTop: "auto",
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "500",
  },
});
