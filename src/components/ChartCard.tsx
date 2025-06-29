import { Platform, StyleSheet, Text, View } from "react-native";
import { LineChart } from "react-native-gifted-charts";
import React from "react";

import { FontSizes } from "@/theme/fontSizes";
import { AppTheme } from "@/theme/colors";
import Badge from "./Badge";

interface ChartCardProps {
  data: {
    value: number;
  }[];
}

const ChartCard = (props: ChartCardProps) => {
  const { data } = props;
  return (
    <View style={styles.creditScoreCard}>
      <View>
        <View
          style={{
            flexDirection: "row",
          }}
        >
          <Text style={[styles.creditScoreTitle, { marginRight: 8 }]}>
            Credit Score
          </Text>
          <Badge text={`+2pts`} />
        </View>
        <Text style={styles.creditScoreUpdate}>
          Updated Today • Next May 12
        </Text>
      </View>
      <Text style={styles.creditScoreExperian}>Experian</Text>
      <LineChart
        data={data}
        thickness={2}
        color={AppTheme.colors.ava_secondary}
        hideDataPoints={false}
        dataPointsColor={AppTheme.colors.ava_secondary}
        dataPointsRadius={4}
        areaChart={false}
        isAnimated
        hideRules={false}
        yAxisColor={AppTheme.colors.ava_white}
        xAxisColor="#e5e5e5"
        yAxisTextStyle={{ color: "#555", fontSize: 12 }}
        rulesType="solid"
        rulesColor="#e5e5e5"
        yAxisLabelPrefix=""
        yAxisLabelSuffix=""
        noOfSections={2}
        maxValue={700}
        animationDuration={1500}
        spacing={Platform.OS === "ios" ? 19 : 19}
        height={100}
        disableScroll
      />

      <Text style={styles.creditScoreFooterText}>Last 12 months</Text>
      <Text style={styles.CreditScoreFooterSubtitle}>
        Score calculated using VantageScore 3.0
      </Text>
    </View>
  );
};

export default ChartCard;

const styles = StyleSheet.create({
  creditScoreCard: {
    marginHorizontal: 20,
    backgroundColor: AppTheme.colors.ava_white,
    borderRadius: 20,
    padding: 20,
    borderColor: "#e5e5e5",
    borderWidth: 1.5,
  },
  creditScoreTitle: {
    color: AppTheme.colors.ava_text_primary_dark,
    fontWeight: "600",
    fontSize: FontSizes.md,
    lineHeight: FontSizes.md * 1.5,
  },
  creditScoreUpdate: {
    color: AppTheme.colors.ava_text_primary_dark,
    fontWeight: "400",
    fontSize: FontSizes.sm,
    lineHeight: FontSizes.sm * 1.4,
  },
  creditScoreExperian: {
    color: AppTheme.colors.ava_light_purple,
    fontSize: FontSizes.xs,
    fontWeight: "600",
    lineHeight: FontSizes.xs * 1.3,
    marginTop: 10,
    marginBottom: 16,
  },
  creditScoreFooterText: {
    textAlign: "center",
    marginTop: 12,
    fontSize: FontSizes.xs,
    color: AppTheme.colors.ava_text_primary_dark,
    fontWeight: "600",
  },
  CreditScoreFooterSubtitle: {
    textAlign: "center",
    fontSize: FontSizes.xs,
    color: AppTheme.colors.ava_text_primary_light,
  },
});
