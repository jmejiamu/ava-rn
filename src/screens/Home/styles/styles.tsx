import { StyleSheet } from "react-native";

import { FontSizes } from "@/theme/fontSizes";
import { AppTheme } from "@/theme/colors";

export const styles = StyleSheet.create({
  safeAreaContainer: {
    flex: 1,
    backgroundColor: AppTheme.colors.ava_primary,
  },
  titleContainer: {
    marginHorizontal: 20,
    marginTop: 32,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: FontSizes.xlg,
    fontWeight: "600",
    color: AppTheme.colors.ava_text_primary_dark,
  },
  container: {
    flex: 1,
    backgroundColor: AppTheme.colors.ava_background,
  },
  cardContainer: {
    backgroundColor: AppTheme.colors.ava_primary,
    paddingHorizontal: 20,
    paddingVertical: 24,
    borderBottomEndRadius: 32,
    borderBottomStartRadius: 32,
  },
  title: {
    fontSize: FontSizes.md,
    fontWeight: "bold",
    color: AppTheme.colors.ava_white,
    textAlign: "center",
    flex: 1,
  },
  button: {
    minWidth: 180,
  },
});
