import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { AppTheme } from "@/theme/colors";
import { AnimatedCircularProgress } from "react-native-circular-progress";
import { FontSizes } from "../theme/fontSizes";

const ranges = [
  { label: "0–9%", color: AppTheme.colors.ava_secondary },
  { label: "10–29%", color: AppTheme.colors.ava_secondary },
  { label: "30–49%", color: AppTheme.colors.ava_light_orange },
  { label: "50–74%", color: AppTheme.colors.ava_light_red },
  { label: "<75%", color: AppTheme.colors.ava_light_red },
];

interface BalanceCardProps {
  utilization: number;
}

const BalanceCard = (props: BalanceCardProps) => {
  const { utilization } = props;

  let status = "";
  if (utilization >= 0 && utilization <= 29) {
    status = "Excellent";
  } else if (utilization >= 30 && utilization <= 49) {
    status = "Medium";
  } else if (utilization >= 50 && utilization <= 75) {
    status = "Bad";
  } else {
    status = "";
  }

  return (
    <View style={styles.cardContainer}>
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <View style={{ justifyContent: "space-evenly" }}>
          <View style={{ flexDirection: "row" }}>
            <Text style={styles.balance}>Total Balance: </Text>
            <Text style={styles.balanceNumber}>$8,390</Text>
          </View>
          <View style={{ flexDirection: "row" }}>
            <Text style={styles.totalLimit}>Total limit: </Text>
            <Text style={styles.totalLimitNum}>$200,900</Text>
          </View>
        </View>
        <AnimatedCircularProgress
          size={110}
          width={9}
          fill={utilization}
          tintColor={AppTheme.colors.ava_secondary}
          onAnimationComplete={() => console.log("onAnimationComplete")}
          duration={1500}
          backgroundColor={AppTheme.colors.ava_secondary_light}
          rotation={180}
        >
          {(fill: number): React.ReactNode => (
            <>
              <Text style={styles.score}>{`${Math.round(fill)}`}%</Text>
              <Text>{status}</Text>
            </>
          )}
        </AnimatedCircularProgress>
      </View>
      {/*  */}
      <View style={styles.wrapper}>
        <Text style={styles.excellentLabel}>Excellent</Text>

        <View style={styles.barContainer}>
          {ranges.map((range, index) => (
            <View
              key={index}
              style={[
                styles.range,
                {
                  backgroundColor: range.color,
                  flex: 1,
                  borderTopLeftRadius: index === 0 ? 4 : 0,
                  borderBottomLeftRadius: index === 0 ? 4 : 0,
                  borderTopRightRadius: index === ranges.length - 1 ? 4 : 0,
                  borderBottomRightRadius: index === ranges.length - 1 ? 4 : 0,
                },
              ]}
            />
          ))}
        </View>

        {/* Labels */}
        <View style={styles.labelRow}>
          {ranges.map((range, index) => (
            <Text key={index} style={styles.rangeLabel}>
              {range.label}
            </Text>
          ))}
        </View>
      </View>
    </View>
  );
};

export default BalanceCard;

const styles = StyleSheet.create({
  totalLimitNum: {
    color: AppTheme.colors.ava_text_primary_light,
    fontSize: FontSizes.sm,
    fontWeight: "400",
  },
  totalLimit: {
    color: AppTheme.colors.ava_text_primary_light,
    fontSize: FontSizes.sm,
    fontWeight: "400",
  },
  balanceNumber: {
    color: AppTheme.colors.ava_secondary,
    fontSize: FontSizes.md,
    fontWeight: "600",
  },
  balance: {
    color: AppTheme.colors.ava_text_primary_dark,
    fontSize: FontSizes.md,
    fontWeight: "600",
  },
  cardContainer: {
    backgroundColor: AppTheme.colors.ava_white,
    padding: 20,
    marginHorizontal: 20,
    borderRadius: 16,
    borderColor: "#e5e5e5",
    borderWidth: 1.5,
  },
  score: {
    fontSize: 36,
    color: AppTheme.colors.ava_primary,
    fontWeight: "bold",
  },

  // Wrapper for the colored range bar
  wrapper: {
    marginTop: 20,
  },
  excellentLabel: {
    color: AppTheme.colors.ava_secondary,
    fontWeight: "600",
    marginBottom: 6,
  },
  barContainer: {
    flexDirection: "row",
    height: 24,
    overflow: "hidden",
  },
  range: {
    height: "100%",
  },
  highlightBox: {
    borderWidth: 2,
    borderColor: "#A64EFF", // purple border
    backgroundColor: "#FFDAB9", // pastel orange fill
  },
  labelRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    paddingHorizontal: 4,
    marginTop: 6,
  },
  rangeLabel: {
    fontSize: 10,
    color: "#6E6E6E",
    flex: 1,
    textAlign: "center",
  },
});
