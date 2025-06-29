import { StyleSheet } from "react-native";

import { FontSizes } from "@/theme/fontSizes";
import { AppTheme } from "@/theme/colors";

export const styles = StyleSheet.create({
  directDepContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
    marginTop: 24,
  },
  directDepTxt: {
    marginLeft: 4,
    color: AppTheme.colors.ava_text_primary_dark,
    fontSize: FontSizes.md,
  },
  safeAreaContainer: {
    flex: 1,
    backgroundColor: AppTheme.colors.ava_background,
  },
  title: {
    fontSize: FontSizes.xxxl,
    fontWeight: "600",
    marginBottom: 12,
    color: AppTheme.colors.ava_text_primary_dark,
  },
  container: {
    padding: 16,
    backgroundColor: AppTheme.colors.ava_background,
    flexGrow: 1,
  },
  label: {
    fontSize: FontSizes.md,
    fontWeight: "600",
    marginTop: 12,
    marginBottom: 4,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 16,
    marginBottom: 8,
    backgroundColor: AppTheme.colors.ava_white,
    fontSize: FontSizes.md,
  },
  calendarContainer: {
    position: "absolute",
    right: 0,
    top: 0,
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    width: 44,
  },
});
