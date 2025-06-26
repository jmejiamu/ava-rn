import React from "react";
import { View, Text, StyleSheet, ViewStyle } from "react-native";
import { AnimatedCircularProgress } from "react-native-circular-progress";
import { AppTheme } from "@/theme/colors";
import { FontSizes } from "@/theme/fontSizes";
import Badge from "./Badge";

interface CreditScoreCardProps {
  score: number;
  maxScore?: number;
  label?: string;
  provider?: string;
  status?: string;
  updatedText?: string;
  style?: ViewStyle;
}

export const CreditScoreCard: React.FC<CreditScoreCardProps> = ({
  score,
  maxScore = 100,
  label = "Credit Score",
  provider = "Experian",
  status = "Good",
  updatedText = "Update Today | Next May 12",
  style,
}) => {
  return (
    <>
      <View style={[styles.card, style]}>
        <View
          style={{
            // flex: 1,
            justifyContent: "space-around",
          }}
        >
          <View>
            <View style={{ flexDirection: "row" }}>
              <Text style={[styles.label, { marginRight: 8 }]}>{label}</Text>
              <Badge text={`+2pts`} />
            </View>
            <View>
              <Text style={styles.updated}>{updatedText}</Text>
            </View>
          </View>

          <Text style={styles.provider}>{provider}</Text>
        </View>
        <AnimatedCircularProgress
          size={110}
          width={9}
          fill={(score / maxScore) * 100}
          tintColor={AppTheme.colors.ava_secondary}
          onAnimationComplete={() => console.log("onAnimationComplete")}
          duration={1500}
          backgroundColor={AppTheme.colors.ava_secondary_light}
          rotation={180}
        >
          {(fill: number): React.ReactNode => (
            <>
              <Text style={styles.score}>{`${Math.round(fill)}`}</Text>
              <Text>{status}</Text>
            </>
          )}
        </AnimatedCircularProgress>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: AppTheme.colors.ava_white,
    borderRadius: 20,
    padding: 16,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  leftCol: {
    flex: 1,
    justifyContent: "space-around",
  },
  label: {
    fontSize: FontSizes.md,
    fontWeight: "600",
    lineHeight: FontSizes.md * 1.5,
  },
  updated: {
    fontSize: FontSizes.sm,
    fontWeight: "400",
    lineHeight: FontSizes.sm * 1.4,
    color: AppTheme.colors.ava_text_primary_light,
  },
  provider: {
    fontSize: FontSizes.xs,
    fontWeight: "600",
    lineHeight: FontSizes.xs * 1.3,
    color: AppTheme.colors.ava_light_purple,
  },
  score: {
    fontSize: 36,
    color: AppTheme.colors.ava_primary,
    fontWeight: "bold",
  },
});
