import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import Feather from "@expo/vector-icons/Feather";
import { AppTheme } from "@/theme/colors";
import { FontSizes } from "@/theme/fontSizes";

interface HeaderProps {
  title: string;
  onSettingsPress?: () => void;
}

export const Header = (props: HeaderProps) => {
  const { title, onSettingsPress = () => {} } = props;
  return (
    <View style={styles.header}>
      <TouchableOpacity onPress={onSettingsPress}>
        <Feather name="settings" size={20} color="white" />
      </TouchableOpacity>
      <Text style={styles.title}>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: AppTheme.colors.ava_primary,
    paddingHorizontal: 20,
  },

  title: {
    flex: 1,
    fontSize: FontSizes.md,
    fontWeight: "bold",
    color: AppTheme.colors.ava_white,
    textAlign: "center",
  },
});
