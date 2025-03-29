import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Switch,
  ScrollView,
} from "react-native";
import { useColorScheme } from "react-native";
import { Ionicons } from "@expo/vector-icons";

function SettingsScreen() {
  const colorScheme = useColorScheme();
  const [notificationsEnabled, setNotificationsEnabled] = React.useState(true);
  const [darkMode, setDarkMode] = React.useState(colorScheme === "dark");
  const [soundEffects, setSoundEffects] = React.useState(true);

  const SettingItem = ({
    icon,
    title,
    value,
    onValueChange,
  }: {
    icon: string;
    title: string;
    value: boolean;
    onValueChange: (value: boolean) => void;
  }) => (
    <View
      style={[
        styles.settingItem,
        { borderBottomColor: colorScheme === "dark" ? "#333" : "#eee" },
      ]}>
      <View style={styles.settingLeft}>
        <Ionicons
          name={icon as any}
          size={24}
          color={colorScheme === "dark" ? "#fff" : "#000"}
        />
        <Text
          style={[
            styles.settingTitle,
            { color: colorScheme === "dark" ? "#fff" : "#000" },
          ]}>
          {title}
        </Text>
      </View>
      <Switch value={value} onValueChange={onValueChange} />
    </View>
  );

  return (
    <ScrollView
      style={[
        styles.container,
        { backgroundColor: colorScheme === "dark" ? "#000" : "#fff" },
      ]}>
      <View style={styles.header}>
        <Text
          style={[
            styles.title,
            { color: colorScheme === "dark" ? "#fff" : "#000" },
          ]}>
          Settings
        </Text>
      </View>

      <View style={styles.section}>
        <Text
          style={[
            styles.sectionTitle,
            { color: colorScheme === "dark" ? "#999" : "#666" },
          ]}>
          App Settings
        </Text>
        <SettingItem
          icon='notifications'
          title='Notifications'
          value={notificationsEnabled}
          onValueChange={setNotificationsEnabled}
        />
        <SettingItem
          icon='moon'
          title='Dark Mode'
          value={darkMode}
          onValueChange={setDarkMode}
        />
        <SettingItem
          icon='volume-high'
          title='Sound Effects'
          value={soundEffects}
          onValueChange={setSoundEffects}
        />
      </View>

      <View style={styles.section}>
        <Text
          style={[
            styles.sectionTitle,
            { color: colorScheme === "dark" ? "#999" : "#666" },
          ]}>
          About
        </Text>
        <TouchableOpacity
          style={[
            styles.aboutItem,
            { borderBottomColor: colorScheme === "dark" ? "#333" : "#eee" },
          ]}>
          <View style={styles.settingLeft}>
            <Ionicons
              name='information-circle'
              size={24}
              color={colorScheme === "dark" ? "#fff" : "#000"}
            />
            <Text
              style={[
                styles.settingTitle,
                { color: colorScheme === "dark" ? "#fff" : "#000" },
              ]}>
              Version
            </Text>
          </View>
          <Text
            style={[
              styles.versionText,
              { color: colorScheme === "dark" ? "#999" : "#666" },
            ]}>
            1.0.0
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
  header: {
    padding: 20,
    paddingTop: 60,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
  },
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 8,
    paddingHorizontal: 20,
    textTransform: "uppercase",
  },
  settingItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 20,
    borderBottomWidth: 1,
  },
  settingLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  settingTitle: {
    fontSize: 16,
  },
  aboutItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 20,
    borderBottomWidth: 1,
  },
  versionText: {
    fontSize: 16,
  },
});

export default SettingsScreen;
