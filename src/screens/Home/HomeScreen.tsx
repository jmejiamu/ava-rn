import React, { useCallback, useRef, useState } from "react";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import BottomSheet from "@gorhom/bottom-sheet";
import { StatusBar } from "expo-status-bar";
import {
  View,
  Text,
  Dimensions,
  Platform,
  ScrollView,
  FlatList,
} from "react-native";

import FeedBackBottomSheet from "@/components/FeedBackBottomSheet";
import AccountDetailsCard from "@/components/AccountDetailsCard";
import { RootStackParamList } from "@/navigation/AppNavigator";
import { CreditScoreCard } from "@/components/CreditScoreCard";
import OpenCreditCard from "@/components/OpenCreditCard";
import CardFactors from "@/components/CardFactors";
import BalanceCard from "@/components/BalanceCard";
import ChartCard from "@/components/ChartCard";
import { feedbackSchema } from "./validation";
import { Header } from "@/components/Header";
import { styles } from "./styles/styles";

const screenWidth = Dimensions.get("window").width;
const cardWidth = Platform.OS === "ios" ? screenWidth * 0.4 : screenWidth * 0.4; // Card occupies 80% of the screen width

const HomeScreen = () => {
  const bottomSheetRef = useRef<BottomSheet>(null);
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState("");
  const [feedbackError, setFeedbackError] = useState<string | null>(null);

  const balance = 100;
  const creditLimit = 1000;
  const spendLimit = creditLimit - balance;
  const utilization = (balance / creditLimit) * 100;

  const openBottomSheet = () => {
    console.log("Opening bottom sheet");
    bottomSheetRef.current?.expand();
  };
  const closeBottomSheet = () => {
    console.log("Closing bottom sheet");
    bottomSheetRef.current?.close();
  };

  // callbacks
  const handleSheetChanges = useCallback((index: number) => {
    console.log("handleSheetChanges", index);
  }, []);

  const handlePress = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 1500);
  };

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

  const handleSendFeedback = () => {
    const result = feedbackSchema.safeParse({ feedback });
    if (!result.success) {
      setFeedbackError(result.error.errors[0].message);
      return;
    }
    setFeedbackError(null);
    closeBottomSheet();
    setFeedback("");
  };

  const onSettingsPress = () => {
    navigation.navigate("EmploymentInfo", {
      onOpenBottomSheet: openBottomSheet,
    });
  };

  return (
    <SafeAreaView style={styles.safeAreaContainer} edges={["top"]}>
      <StatusBar style="light" />
      <View style={styles.container}>
        <ScrollView>
          <Header title="Home" onSettingsPress={onSettingsPress} />
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
          <View style={styles.titleContainer}>
            <Text style={styles.sectionTitle}>Chart</Text>
          </View>

          <ChartCard data={data} />

          <View style={styles.titleContainer}>
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

          <View style={styles.titleContainer}>
            <Text style={styles.sectionTitle}>Account details</Text>
          </View>

          <AccountDetailsCard
            spendLimit={spendLimit}
            utilization={utilization}
            creditLimit={creditLimit}
            balance={balance}
          />

          <View style={{ marginTop: 34 }} />

          <BalanceCard utilization={utilization} />

          <View style={styles.titleContainer}>
            <Text style={styles.sectionTitle}>Open credit card accounts</Text>
          </View>
          <OpenCreditCard />

          <View style={{ marginTop: 40 }} />
        </ScrollView>

        <FeedBackBottomSheet
          bottomSheetRef={bottomSheetRef}
          handleSheetChanges={handleSheetChanges}
          feedback={feedback}
          setFeedback={setFeedback}
          feedbackError={feedbackError}
          handleSendFeedback={handleSendFeedback}
        />
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;
