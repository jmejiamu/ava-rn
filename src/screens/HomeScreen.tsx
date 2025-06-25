import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { ActionButton } from "@/components/ActionButton";
import { AppTheme } from "@/theme/colors";

const HomeScreen = () => {
  const [loading, setLoading] = useState(false);

  const handlePress = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 1500);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to AVA RN Challenge!</Text>
      <ActionButton
        title={loading ? "Loading..." : "Get Started"}
        onPress={handlePress}
        loading={loading}
        style={styles.button}
      />
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: AppTheme.colors.ava_white,
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: AppTheme.colors.ava_primary,
    marginBottom: 32,
    textAlign: "center",
  },
  button: {
    minWidth: 180,
  },
});
