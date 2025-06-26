import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { AppTheme } from "@/theme/colors";
import { FontSizes } from "@/theme/fontSizes";

interface BadgeProps {
  text?: string;
}

const Badge = ({ text }: BadgeProps) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{text}</Text>
    </View>
  );
};

export default Badge;

const styles = StyleSheet.create({
  container: {
    backgroundColor: AppTheme.colors.ava_secondary,
    borderRadius: 16,
    paddingVertical: 3,
    paddingHorizontal: 6,
  },
  text: {
    fontSize: FontSizes.md,
    color: AppTheme.colors.ava_white,
    fontWeight: "600",
  },
});
