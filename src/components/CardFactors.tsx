import { View, Text, StyleSheet } from "react-native";
import React from "react";

import { FontSizes } from "@/theme/fontSizes";
import { ActionButton } from "./ActionButton";
import { AppTheme } from "@/theme/colors";

// Add props interface
interface CardFactorsProps {
  title: string;
  subtitle: string;
  buttonTitle: string;
  onButtonPress: () => void;
  buttonLoading?: boolean;
}

const getButtonColor = (buttonTitle: string) => {
  switch (buttonTitle) {
    case "HIGH IMPACT":
      return AppTheme.colors.ava_dark_green || "#D32F2F";
    case "MEDIUM IMPACT":
      return AppTheme.colors.ava_secondary || "#FFA000";
    case "LOW IMPACT":
      return AppTheme.colors.ava_secondary_light || "#388E3C";
    default:
      return AppTheme.colors.ava_secondary || "#388E3C";
  }
};

const CardFactors = (props: CardFactorsProps) => {
  const {
    title,
    subtitle,
    buttonTitle,
    onButtonPress,
    buttonLoading = false,
  } = props;

  return (
    <View style={styles.cardContainer}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.subtitle}>{subtitle}</Text>
      <ActionButton
        title={buttonTitle}
        onPress={onButtonPress}
        loading={buttonLoading}
        style={{
          paddingVertical: 6,
          borderRadius: 4,
          backgroundColor: getButtonColor(buttonTitle),
          marginTop: 23,
        }}
        textStyle={{
          fontSize: FontSizes.xs,
          fontWeight: "700",
        }}
      />
    </View>
  );
};

export default CardFactors;

const styles = StyleSheet.create({
  subtitle: {
    fontSize: FontSizes.xlg,
    fontWeight: "600",
    textAlign: "center",
    marginTop: 8,
  },
  title: {
    fontSize: FontSizes.sm,
    fontWeight: "600",
    textAlign: "center",
    lineHeight: FontSizes.sm * 1.2,
  },
  cardContainer: {
    borderRadius: 16,
    backgroundColor: AppTheme.colors.ava_white,
    padding: 18,
    marginHorizontal: 20,
    borderColor: "#e5e5e5",
    borderWidth: 1.5,
    width: "100%",
  },
});
