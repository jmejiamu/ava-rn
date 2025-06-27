import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
} from "react-native";
import React from "react";
import AntDesign from "@expo/vector-icons/AntDesign";
import { SafeAreaView } from "react-native-safe-area-context";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

import { ActionButton } from "@/components/ActionButton";
import { useNavigation } from "@react-navigation/native";
import { FontSizes } from "@/theme/fontSizes";
import { AppTheme } from "@/theme/colors";
import { getEmploymentInfo, updateEmploymentInfo } from "@/api/employment";
import { EmploymentInfo } from "@/types/employment";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "@/navigation/AppNavigator";
import { formatDate } from "../utils/formatDate";

const EmploymentInfoScreen = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const queryClient = useQueryClient();
  const { data, isLoading, isError } = useQuery<EmploymentInfo>({
    queryKey: ["employmentInfo"],
    queryFn: getEmploymentInfo,
  });
  const mutation = useMutation<EmploymentInfo, unknown, EmploymentInfo>({
    mutationFn: updateEmploymentInfo,
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["employmentInfo"] }),
  });

  if (isLoading) {
    return (
      <SafeAreaView
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text>Loading...</Text>
      </SafeAreaView>
    );
  }
  if (isError || !data) {
    return (
      <SafeAreaView
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text>Error loading employment info.</Text>
      </SafeAreaView>
    );
  }
  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: AppTheme.colors.ava_background }}
    >
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
            <Text style={styles.subTitle}>
              {data.isDirectDeposit ? "Yes" : "No"}
            </Text>
          </View>

          <ActionButton
            title="Edit"
            onPress={() => navigation.navigate("EditEmploymentInfo")}
            outlined
          />
          <View style={{ margin: 8 }} />
          <ActionButton
            title="Confirm"
            onPress={() => console.log("Confirm Employment Info Pressed")}
          />
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default EmploymentInfoScreen;

const styles = StyleSheet.create({
  subTitle: {
    fontSize: FontSizes.md,
    color: AppTheme.colors.ava_text_primary_dark,
  },
  title: {
    color: AppTheme.colors.ava_text_primary_light,
    fontSize: FontSizes.xs,
  },
});
