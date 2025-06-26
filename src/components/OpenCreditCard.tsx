import { StyleSheet, Text, View, Dimensions } from "react-native";
import React, { useEffect, useState } from "react";
import * as Progress from "react-native-progress";
import { ca } from "zod/v4/locales";
import { AppTheme } from "@/theme/colors";
import { FontSizes } from "@/theme/fontSizes";

const screenWidth = Dimensions.get("window").width;
const progressBarWidth = screenWidth * 0.8; // 20px margin on each side

const OpenCreditCard = () => {
  // Add state for progress bar animation
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Animate progress bar after mount
    setTimeout(() => setProgress(0.3), 300);
  }, []);
  return (
    <View style={[styles.cardContainer]}>
      <View style={[styles.titleContainer, { marginBottom: 12 }]}>
        <Text style={styles.title}>Syncb/Amazon</Text>
        <Text style={styles.title}>21%</Text>
      </View>
      <Progress.Bar
        progress={progress}
        width={progressBarWidth}
        animated
        animationConfig={{ duration: 1500 }}
        color={AppTheme.colors.ava_secondary}
        borderColor="transparent"
        unfilledColor={AppTheme.colors.ava_disabled}
      />
      <View style={[styles.titleContainer, { marginTop: 12, marginBottom: 8 }]}>
        <Text
          style={{
            fontSize: FontSizes.sm,
            color: AppTheme.colors.ava_text_primary_dark,
          }}
        >
          $1,500 Balance
        </Text>
        <Text
          style={{
            fontSize: FontSizes.sm,
            color: AppTheme.colors.ava_text_primary_dark,
          }}
        >
          $6,300 Limit
        </Text>
      </View>
      <Text
        style={{
          fontSize: FontSizes.xs,
          color: AppTheme.colors.ava_text_primary_light,
        }}
      >
        Reported on June 20, 2023
      </Text>
      <View
        style={{
          borderColor: AppTheme.colors.ava_disabled,
          borderWidth: StyleSheet.hairlineWidth,
          marginVertical: 20,
        }}
      />
      <View style={[styles.titleContainer, { marginBottom: 12 }]}>
        <Text style={styles.title}>Syncb/Amazon</Text>
        <Text style={styles.title}>21%</Text>
      </View>
      <Progress.Bar
        progress={progress}
        width={progressBarWidth}
        animated
        animationConfig={{ duration: 1500 }}
        color={AppTheme.colors.ava_secondary}
        borderColor="transparent"
        unfilledColor={AppTheme.colors.ava_disabled}
      />
      <View style={[styles.titleContainer, { marginTop: 12, marginBottom: 8 }]}>
        <Text
          style={{
            fontSize: FontSizes.sm,
            color: AppTheme.colors.ava_text_primary_dark,
          }}
        >
          $1,500 Balance
        </Text>
        <Text
          style={{
            fontSize: FontSizes.sm,
            color: AppTheme.colors.ava_text_primary_dark,
          }}
        >
          $6,300 Limit
        </Text>
      </View>
      <Text
        style={{
          fontSize: FontSizes.xs,
          color: AppTheme.colors.ava_text_primary_light,
        }}
      >
        Reported on June 20, 2023
      </Text>
      <View
        style={{
          borderColor: AppTheme.colors.ava_disabled,
          borderWidth: StyleSheet.hairlineWidth,
          marginVertical: 20,
        }}
      />
      <View style={[styles.titleContainer, { marginBottom: 12 }]}>
        <Text style={styles.title}>Syncb/Amazon</Text>
        <Text style={styles.title}>21%</Text>
      </View>
      <Progress.Bar
        progress={progress}
        width={progressBarWidth}
        animated
        animationConfig={{ duration: 1500 }}
        color={AppTheme.colors.ava_secondary}
        borderColor="transparent"
        unfilledColor={AppTheme.colors.ava_disabled}
      />
      <View style={[styles.titleContainer, { marginTop: 12, marginBottom: 8 }]}>
        <Text
          style={{
            fontSize: FontSizes.sm,
            color: AppTheme.colors.ava_text_primary_dark,
          }}
        >
          $1,500 Balance
        </Text>
        <Text
          style={{
            fontSize: FontSizes.sm,
            color: AppTheme.colors.ava_text_primary_dark,
          }}
        >
          $6,300 Limit
        </Text>
      </View>
      <Text
        style={{
          fontSize: FontSizes.xs,
          color: AppTheme.colors.ava_text_primary_light,
        }}
      >
        Reported on June 20, 2023
      </Text>
    </View>
  );
};

export default OpenCreditCard;

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  title: {
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
});
