import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { LineChart } from "react-native-gifted-charts";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Platform,
  ScrollView,
  FlatList,
} from "react-native";
import { StatusBar } from "expo-status-bar";

import { CreditScoreCard } from "@/components/CreditScoreCard";
import { ActionButton } from "@/components/ActionButton";
import { FontSizes } from "@/theme/fontSizes";
import { Header } from "@/components/Header";
import { AppTheme } from "@/theme/colors";
import CardFactors from "@/components/CardFactors";
import AccountDetailsCard from "@/components/AccountDetailsCard";
import BalanceCard from "@/components/BalanceCard";
import OpenCreditCard from "@/components/OpenCreditCard";
import Badge from "@/components/Badge";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "@/navigation/AppNavigator";

const screenWidth = Dimensions.get("window").width;
const cardWidth = Platform.OS === "ios" ? screenWidth * 0.4 : screenWidth * 0.4; // Card occupies 80% of the screen width

const HomeScreen = () => {
  const [loading, setLoading] = useState(false);

  const handlePress = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 1500);
  };

  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const data = [
    { value: 140 },
    { value: 256 },
    { value: 100 },
    { value: 200 },
    { value: 324 },
    { value: 300 },
    { value: 350 },
    { value: 250 },
    { value: 400 },
    { value: 210 },
    { value: 520 },
    { value: 560 },
  ];

  const creditFactors = [
    {
      title: "Payment \nHistory",
      subtitle: "100%",
      buttonTitle: "HIGH IMPACT",
      onButtonPress: handlePress,
      buttonLoading: loading,
    },
    {
      title: "Credit Card \nUtilization",
      subtitle: "4%",
      buttonTitle: "LOW IMPACT",
      onButtonPress: handlePress,
      buttonLoading: loading,
    },
    {
      title: "Derogatory \nMarks",
      subtitle: "30%",
      buttonTitle: "MEDIUM IMPACT",
      onButtonPress: handlePress,
      buttonLoading: loading,
    },
  ];

  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: AppTheme.colors.ava_primary }}
      edges={["top"]}
    >
      <StatusBar style="light" />
      <View style={styles.container}>
        {/* <Text style={styles.title}>Welcome to AVA RN Challenge!</Text> */}
        {/* <ActionButton
        title={loading ? "Loading..." : "Get Started"}
        onPress={handlePress}
        loading={loading}
        style={styles.button}
      /> */}
        <ScrollView>
          <Header
            title="Home"
            onSettingsPress={() => navigation.navigate("EmploymentInfo")}
          />
          <View style={styles.cardContainer}>
            <CreditScoreCard
              score={65}
              maxScore={100}
              label="Credit Score"
              provider="Experian"
              status="Great"
              updatedText="Update Today | Next May 12"
            />
          </View>
          <View
            style={{ marginHorizontal: 20, marginTop: 32, marginBottom: 20 }}
          >
            <Text style={styles.sectionTitle}>Chart</Text>
          </View>

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
              // yAxisOffset={600}
              noOfSections={2}
              maxValue={700}
              animationDuration={1500}
              spacing={Platform.OS === "ios" ? 19 : 19}
              height={100}
              // width={width * 0.7}
              disableScroll
            />

            <Text style={styles.creditScoreFooterText}>Last 12 months</Text>
            <Text style={styles.CreditScoreFooterSubtitle}>
              Score calculated using VantageScore 3.0
            </Text>
          </View>

          <View
            style={{ marginHorizontal: 20, marginTop: 32, marginBottom: 20 }}
          >
            <Text style={styles.sectionTitle}>Credit factors</Text>
          </View>

          <FlatList
            data={creditFactors}
            horizontal
            keyExtractor={(item) => item.title}
            snapToInterval={cardWidth + 8}
            renderItem={({ item, index }) => (
              <View
                style={{
                  width: cardWidth,
                  marginRight: index === creditFactors.length - 1 ? 40 : 0,
                }}
              >
                <CardFactors {...item} />
              </View>
            )}
            ItemSeparatorComponent={() => <View style={{ width: 8 }} />}
            showsHorizontalScrollIndicator={false}
          />

          <View
            style={{ marginHorizontal: 20, marginTop: 32, marginBottom: 20 }}
          >
            <Text style={styles.sectionTitle}>Account details</Text>
          </View>

          <AccountDetailsCard />

          <View style={{ marginTop: 34 }} />

          <BalanceCard />

          <View
            style={{ marginHorizontal: 20, marginTop: 32, marginBottom: 20 }}
          >
            <Text style={styles.sectionTitle}>Open credit card accounts</Text>
          </View>
          <OpenCreditCard />
          <View style={{ marginTop: 40 }} />
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  creditScoreCard: {
    marginHorizontal: 20,
    backgroundColor: AppTheme.colors.ava_white,
    borderRadius: 20,
    padding: 20,
    borderColor: "#e5e5e5",
    borderWidth: 1.5,
  },
  CreditScoreFooterSubtitle: {
    textAlign: "center",
    fontSize: FontSizes.xs,
    color: AppTheme.colors.ava_text_primary_light,
  },
  creditScoreFooterText: {
    textAlign: "center",
    marginTop: 12,
    fontSize: FontSizes.xs,
    color: AppTheme.colors.ava_text_primary_dark,
    fontWeight: "600",
  },
  creditScoreExperian: {
    color: AppTheme.colors.ava_light_purple,
    fontSize: FontSizes.xs,
    fontWeight: "600",
    lineHeight: FontSizes.xs * 1.3,
    marginTop: 10,
    marginBottom: 16,
  },
  creditScoreUpdate: {
    color: AppTheme.colors.ava_text_primary_dark,
    fontWeight: "400",
    fontSize: FontSizes.sm,
    lineHeight: FontSizes.sm * 1.4,
  },
  creditScoreTitle: {
    color: AppTheme.colors.ava_text_primary_dark,
    fontWeight: "600",
    fontSize: FontSizes.md,
    lineHeight: FontSizes.md * 1.5,
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
