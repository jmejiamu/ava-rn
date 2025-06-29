import { Dimensions, Platform, StyleSheet, Text, View } from "react-native";
import Slider from "@react-native-community/slider";
import React, { useState } from "react";

import { FontSizes } from "@/theme/fontSizes";
import { AppTheme } from "@/theme/colors";

const screenWidth = Dimensions.get("window").width;

interface AccountDetailsCardProps {
  spendLimit: number;
  utilization: number;
  creditLimit: number;
  balance: number;
}

const AccountDetailsCard = (props: AccountDetailsCardProps) => {
  const { spendLimit, utilization, creditLimit, balance } = props;
  const [value, setValue] = useState(40);

  const thumbPosition = ((value - 0) / (100 - 0)) * (screenWidth - 90);
  return (
    <View style={styles.cardContainer}>
      <View style={styles.containerSlider}>
        <View style={[styles.labelContainer, { left: thumbPosition - 20 }]}>
          <View style={styles.label}>
            <Text style={styles.labelText}>${value}</Text>
          </View>
          <View style={styles.arrowDown} />
        </View>

        <Slider
          style={{ width: "100%" }}
          minimumValue={0}
          maximumValue={100}
          step={1}
          value={value}
          onValueChange={setValue}
          minimumTrackTintColor={AppTheme.colors.ava_secondary}
          maximumTrackTintColor={AppTheme.colors.ava_secondary_light}
          thumbTintColor="transparent"
          thumbImage={undefined}
        />
        <View style={{ flexDirection: "row" }}>
          <Text style={styles.spendTxt}>Spend limit: ${value}</Text>
          <Text style={styles.whyTxt}> Why is it different?</Text>
        </View>
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          marginTop: 16,
        }}
      >
        <View>
          <Text style={styles.moneyTxt}>${balance}</Text>
          <Text>Balance</Text>
        </View>
        <View>
          <Text style={[styles.moneyTxt, { textAlign: "right" }]}>
            ${creditLimit}
          </Text>
          <Text>Credit limit</Text>
        </View>
      </View>
      <View
        style={{ borderWidth: 1, borderColor: "#e5e5e5", marginVertical: 20 }}
      />
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <Text
          style={{
            fontSize: FontSizes.md,
            color: AppTheme.colors.ava_text_primary_dark,
          }}
        >
          Utilization
        </Text>
        <Text style={styles.moneyTxt}>{utilization}%</Text>
      </View>
    </View>
  );
};

export default AccountDetailsCard;

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: AppTheme.colors.ava_white,
    padding: 20,
    marginHorizontal: 20,
    borderRadius: 16,
    borderColor: "#e5e5e5",
    borderWidth: 1.5,
  },
  moneyTxt: {
    color: AppTheme.colors.ava_text_primary_dark,
    fontWeight: "600",
    fontSize: FontSizes.md,
  },
  whyTxt: {
    color: AppTheme.colors.ava_light_purple,
    fontSize: FontSizes.sm,
    textAlign: "center",
    fontWeight: "600",
  },
  spendTxt: {
    color: AppTheme.colors.ava_text_primary_dark,
    fontSize: FontSizes.sm,
    textAlign: "center",
  },
  containerSlider: {
    alignItems: "center",
    marginTop: 40,
  },

  labelContainer: {
    position: "absolute",
    top: Platform.OS === "ios" ? -35 : -45,
  },
  label: {
    backgroundColor: AppTheme.colors.ava_primary,
    borderRadius: 6,
    paddingVertical: 8,
    paddingHorizontal: 8,
    alignItems: "center",
  },
  labelText: {
    color: AppTheme.colors.ava_white,
    fontWeight: "400",
    fontSize: FontSizes.sm,
  },
  arrowDown: {
    width: 0,
    height: 0,
    borderLeftWidth: 6,
    borderRightWidth: 6,
    borderTopWidth: 6,
    borderLeftColor: "transparent",
    borderRightColor: "transparent",
    borderTopColor: AppTheme.colors.ava_primary,
    alignSelf: "center",
  },
});
