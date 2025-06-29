import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

import Settings from "../../assets/icons/Settings.svg";
import { FontSizes } from "@/theme/fontSizes";
import { AppTheme } from "@/theme/colors";

interface HeaderProps {
  title: string;
  onSettingsPress?: () => void;
}

export const Header = (props: HeaderProps) => {
  const { title, onSettingsPress = () => {} } = props;
  return (
    <View style={styles.header}>
      <TouchableOpacity onPress={onSettingsPress}>
        <Settings width={20} height={20} />
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
