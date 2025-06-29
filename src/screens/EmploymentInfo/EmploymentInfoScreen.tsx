import React from "react";
import {
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RouteProp, useRoute } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useQuery } from "@tanstack/react-query";

import { RootStackParamList } from "@/navigation/AppNavigator";
import { ActionButton } from "@/components/ActionButton";
import { getEmploymentInfo } from "@/api/employment";
import { EmploymentInfo } from "@/types/employment";
import { formatDate } from "../../utils/formatDate";
import { FontSizes } from "@/theme/fontSizes";
import { AppTheme } from "@/theme/colors";
import { styles } from "./styles/style";

type EmploymentInfoScreenRouteProp = RouteProp<
  RootStackParamList,
  "EmploymentInfo"
> & {
  params?: {
    onOpenBottomSheet?: () => void;
  };
};

const EmploymentInfoScreen = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const route = useRoute<EmploymentInfoScreenRouteProp>();
  const { data, isLoading, isError } = useQuery<EmploymentInfo>({
    queryKey: ["employmentInfo"],
    queryFn: getEmploymentInfo,
  });

  const handleConfirm = () => {
    navigation.goBack();
    setTimeout(() => {
      const params = route.params as
        | { onOpenBottomSheet?: () => void }
        | undefined;
      if (params && typeof params.onOpenBottomSheet === "function") {
        params.onOpenBottomSheet();
      }
    }, 300);
  };

  if (isLoading) return <ActivityIndicator style={{ flex: 1 }} />;
  if (isError || !data) {
    return (
      <SafeAreaView style={styles.loadingSafeContainer}>
        <Text>Error loading employment info.</Text>
      </SafeAreaView>
    );
  }
  return (
    <SafeAreaView style={styles.safeAreaContainer}>
      <View style={{ marginHorizontal: 16 }}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <AntDesign name="arrowleft" size={24} color="black" />
        </TouchableOpacity>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Text style={{ fontSize: FontSizes.xxxl, fontWeight: "600" }}>
            Confirm your employment
          </Text>
          <Text
            style={{
              fontSize: FontSizes.md,
              lineHeight: FontSizes.md * 1.5,
              color: AppTheme.colors.ava_text_primary_light,
            }}
          >
            Please review and confirm the below employment details are
            up-to-date.
          </Text>
          <View style={{ marginTop: 24, marginBottom: 8 }}>
            <Text style={styles.title}>Employment type</Text>
            <Text style={styles.subTitle}>{data.employmentType}</Text>
          </View>
          <View style={{ marginTop: 24, marginBottom: 8 }}>
            <Text style={styles.title}>Employer</Text>
            <Text style={styles.subTitle}>{data.employer}</Text>
          </View>
          <View style={{ marginTop: 24, marginBottom: 8 }}>
            <Text style={styles.title}>Job title</Text>
            <Text style={styles.subTitle}>{data.jobTitle}</Text>
          </View>
          <View style={{ marginTop: 24, marginBottom: 8 }}>
            <Text style={styles.title}>Gross annual income</Text>
            <Text style={styles.subTitle}>{data.grossAnnualIncome}</Text>
          </View>
          <View style={{ marginTop: 24, marginBottom: 8 }}>
            <Text style={styles.title}>Pay frequency</Text>
            <Text style={styles.subTitle}>{data.payFrequency}</Text>
          </View>
          <View style={{ marginTop: 24, marginBottom: 8 }}>
            <Text style={styles.title}>Employer address</Text>
            <Text style={styles.subTitle}>{data.employerAddress}</Text>
          </View>
          <View style={{ marginTop: 24, marginBottom: 8 }}>
            <Text style={styles.title}>Time with employer</Text>
            <Text style={styles.subTitle}>{data.timeWithEmployer}</Text>
          </View>
          <View style={{ marginTop: 24, marginBottom: 8 }}>
            <Text style={styles.title}>Next payday</Text>
            <Text style={styles.subTitle}>{formatDate(data.nextPayday)}</Text>
          </View>
          <View style={{ marginTop: 24, marginBottom: 8 }}>
            <Text style={styles.title}>Is your pay a direct deposit?</Text>
            <Text style={[styles.subTitle, { marginBottom: 16 }]}>
              {data.isDirectDeposit ? "Yes" : "No"}
            </Text>
          </View>

          <ActionButton
            title="Edit"
            onPress={() => navigation.navigate("EditEmploymentInfo")}
            outlined
          />
          <View style={{ margin: 8 }} />
          <ActionButton title="Confirm" onPress={handleConfirm} />
          <View style={{ height: 50 }} />
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default EmploymentInfoScreen;
