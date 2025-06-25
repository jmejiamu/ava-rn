import React from "react";
import {
  Pressable,
  Text,
  StyleSheet,
  ViewStyle,
  TextStyle,
  GestureResponderEvent,
  ActivityIndicator,
  View,
} from "react-native";
import { AppTheme } from "@/theme/colors";

interface ActionButtonProps {
  title: string;
  onPress: (event: GestureResponderEvent) => void;
  style?: ViewStyle;
  textStyle?: TextStyle;
  disabled?: boolean;
  icon?: React.ReactNode;
  loading?: boolean;
  outlined?: boolean;
}

export const ActionButton = (props: ActionButtonProps) => {
  const {
    title,
    onPress,
    style,
    textStyle,
    disabled,
    icon,
    loading,
    outlined,
  } = props;

  return (
    <Pressable
      style={({ pressed }) => [
        styles.button,
        outlined && styles.outlined,
        disabled && { backgroundColor: AppTheme.colors.ava_disabled },
        pressed && { opacity: 0.7 },
        style,
      ]}
      onPress={onPress}
      disabled={disabled || loading}
    >
      {loading ? (
        <ActivityIndicator
          color={
            outlined ? AppTheme.colors.ava_primary : AppTheme.colors.ava_white
          }
        />
      ) : (
        <View style={styles.contentRow}>
          {icon && <View style={styles.icon}>{icon}</View>}
          <Text
            style={[styles.text, outlined && styles.textOutlined, textStyle]}
          >
            {title}
          </Text>
        </View>
      )}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: AppTheme.colors.ava_primary,
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
  outlined: {
    backgroundColor: "transparent",
    borderWidth: 2,
    borderColor: AppTheme.colors.ava_primary,
  },
  text: {
    color: AppTheme.colors.ava_white,
    fontWeight: "bold",
    fontSize: 16,
  },
  textOutlined: {
    color: AppTheme.colors.ava_primary,
  },
  icon: {
    marginRight: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  contentRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
});
