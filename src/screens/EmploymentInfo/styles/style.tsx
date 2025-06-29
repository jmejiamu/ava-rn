import { StyleSheet } from "react-native";

import { FontSizes } from "@/theme/fontSizes";
import { AppTheme } from "@/theme/colors";

export const styles = StyleSheet.create({
  loadingSafeContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  safeAreaContainer: {
    flex: 1,
    backgroundColor: AppTheme.colors.ava_background,
  },
  subTitle: {
    fontSize: FontSizes.md,
    color: AppTheme.colors.ava_text_primary_dark,
  },
  title: {
    color: AppTheme.colors.ava_text_primary_light,
    fontSize: FontSizes.xs,
  },
});
