import {
  Text,
  View,
  TextInput,
  ScrollView,
  ActivityIndicator,
  Alert,
  TouchableOpacity,
  LogBox,
} from "react-native";
import React, { useEffect, useState } from "react";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { SafeAreaView } from "react-native-safe-area-context";
import DropDownPicker from "react-native-dropdown-picker";
import { useNavigation } from "@react-navigation/native";

import { getEmploymentInfo, updateEmploymentInfo } from "@/api/employment";
import YesRadioButton from "../../../assets/icons/YesRadioButton.svg";
import { useEmploymentForm } from "@/hooks/useEmploymentForm";
import NoRadioBtn from "../../../assets/icons/NoRadioBtn.svg";
import Calendar from "../../../assets/icons/Calendar.svg";
import { ActionButton } from "@/components/ActionButton";
import AntDesign from "@expo/vector-icons/AntDesign";
import { EmploymentInfo } from "@/types/employment";
import { employmentInfoSchema } from "./validation";
import { formatDate } from "@/utils/formatDate";
import { FontSizes } from "@/theme/fontSizes";
import { AppTheme } from "@/theme/colors";
import { styles } from "./styles/styles";

const EditEmploymentInfo = () => {
  const navigation = useNavigation();
  const queryClient = useQueryClient();
  const { data, isLoading, isError } = useQuery<EmploymentInfo>({
    queryKey: ["employmentInfo"],
    queryFn: getEmploymentInfo,
  });
  const mutation = useMutation<EmploymentInfo, unknown, EmploymentInfo>({
    mutationFn: updateEmploymentInfo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["employmentInfo"] });
      navigation.goBack();
    },
    onError: () => {
      Alert.alert("Error", "Failed to update employment info.");
    },
  });
  const { form, errors, setErrors, isFormChanged, handleChange } =
    useEmploymentForm(data);

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [payFreqOpen, setPayFreqOpen] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [yearsOpen, setYearsOpen] = useState(false);
  const [monthsOpen, setMonthsOpen] = useState(false);
  const [selectedYear, setSelectedYear] = useState<number | null>(
    data?.timeWithEmployer
      ? parseInt(data.timeWithEmployer.split(" ")[0])
      : null
  );
  const [selectedMonth, setSelectedMonth] = useState<number | null>(
    data?.timeWithEmployer
      ? parseInt(data.timeWithEmployer.split(" ")[2])
      : null
  );
  const [dropdownItems] = useState([
    { label: "Full-time", value: "Full-time" },
    { label: "Part-time", value: "Part-time" },
    { label: "Contractor", value: "Contractor" },
    { label: "Intern", value: "Intern" },
    { label: "Other", value: "Other" },
  ]);
  const [payFreqItems] = useState([
    { label: "Weekly", value: "Weekly" },
    { label: "Bi-weekly", value: "Bi-weekly" },
    { label: "Semi-monthly", value: "Semi-monthly" },
    { label: "Monthly", value: "Monthly" },
    { label: "Other", value: "Other" },
  ]);
  const [years, setYears] = useState(
    Array.from({ length: 31 }, (_, i) => ({
      label: `${i} year${i === 1 ? "" : "s"}`,
      value: i,
    }))
  );
  const [months, setMonths] = useState(
    Array.from({ length: 12 }, (_, i) => ({
      label: `${i + 1} month${i + 1 === 1 ? "" : "s"}`,
      value: i + 1,
    }))
  );

  const handleSave = () => {
    if (!form) return;
    const result = employmentInfoSchema.safeParse(form);
    if (!result.success) {
      const fieldErrors: { [key: string]: string } = {};
      result.error.errors.forEach((err) => {
        if (err.path[0]) fieldErrors[err.path[0]] = err.message;
      });
      setErrors(fieldErrors);
      return;
    }
    setErrors({});
    mutation.mutate(form);
  };

  useEffect(() => {
    LogBox.ignoreLogs(["VirtualizedLists should never be nested"]);
  }, []);

  if (isLoading || !form) return <ActivityIndicator style={{ flex: 1 }} />;
  if (isError) return <Text>Error loading employment info.</Text>;

  return (
    <SafeAreaView style={styles.safeAreaContainer}>
      <TouchableOpacity
        style={{ marginHorizontal: 16 }}
        onPress={() => navigation.goBack()}
      >
        <AntDesign name="arrowleft" size={24} color="black" />
      </TouchableOpacity>
      <ScrollView nestedScrollEnabled contentContainerStyle={styles.container}>
        <Text style={styles.title}>Edit employment information</Text>
        <Text style={styles.label}>Employment type</Text>
        <DropDownPicker
          open={dropdownOpen}
          value={form.employmentType}
          items={dropdownItems}
          setOpen={setDropdownOpen}
          setValue={(cb) =>
            handleChange("employmentType", cb(form.employmentType))
          }
          setItems={() => {}}
          containerStyle={{ marginBottom: 12 }}
          style={{
            borderColor: errors.employmentType ? "red" : "#ccc",
            padding: 16,
            borderRadius: 8,
          }}
          dropDownContainerStyle={{ borderColor: "#ccc" }}
          scrollViewProps={{ nestedScrollEnabled: true }}
        />
        {errors.employmentType && (
          <Text style={{ color: "red" }}>{errors.employmentType}</Text>
        )}
        <Text style={styles.label}>Employer</Text>
        <TextInput
          style={[styles.input, errors.employer && { borderColor: "red" }]}
          value={form.employer}
          onChangeText={(v) => handleChange("employer", v)}
        />
        {errors.employer && (
          <Text style={{ color: "red" }}>{errors.employer}</Text>
        )}
        <Text style={styles.label}>Job title</Text>
        <TextInput
          style={[styles.input, errors.jobTitle && { borderColor: "red" }]}
          value={form.jobTitle}
          onChangeText={(v) => handleChange("jobTitle", v)}
        />
        {errors.jobTitle && (
          <Text style={{ color: "red" }}>{errors.jobTitle}</Text>
        )}
        <Text style={styles.label}>Gross annual income</Text>
        <TextInput
          style={[
            styles.input,
            errors.grossAnnualIncome && { borderColor: "red" },
          ]}
          value={form.grossAnnualIncome}
          onChangeText={(v) => handleChange("grossAnnualIncome", v)}
        />
        {errors.grossAnnualIncome && (
          <Text style={{ color: "red" }}>{errors.grossAnnualIncome}</Text>
        )}
        <Text style={styles.label}>Pay frequency</Text>
        <DropDownPicker
          open={payFreqOpen}
          value={form.payFrequency}
          items={payFreqItems}
          setOpen={setPayFreqOpen}
          setValue={(cb) => handleChange("payFrequency", cb(form.payFrequency))}
          setItems={() => {}}
          containerStyle={{ marginBottom: 12 }}
          style={{
            borderColor: errors.payFrequency ? "red" : "#ccc",
            padding: 16,
            borderRadius: 8,
          }}
          dropDownContainerStyle={{ borderColor: "#ccc" }}
          scrollViewProps={{ nestedScrollEnabled: true }}
        />
        {errors.payFrequency && (
          <Text style={{ color: "red" }}>{errors.payFrequency}</Text>
        )}
        <Text style={styles.label}>Next payday</Text>
        <View style={{ position: "relative", marginBottom: 8 }}>
          <TextInput
            style={[
              styles.input,
              errors.nextPayday && { borderColor: "red" },
              { paddingRight: 44, marginBottom: 0 },
            ]}
            value={formatDate(form.nextPayday)}
            editable={false}
            pointerEvents="none"
          />
          <TouchableOpacity
            onPress={() => setShowDatePicker(true)}
            style={styles.calendarContainer}
          >
            <Calendar width={20} height={20} />
          </TouchableOpacity>
        </View>
        {errors.nextPayday && (
          <Text style={{ color: "red" }}>{errors.nextPayday}</Text>
        )}
        <Text style={styles.label}>Is your pay a direct deposit?</Text>
        <View style={styles.directDepContainer}>
          <TouchableOpacity
            onPress={() => handleChange("isDirectDeposit", true)}
            style={{ flexDirection: "row", alignItems: "center" }}
            activeOpacity={0.7}
          >
            {form.isDirectDeposit ? (
              <YesRadioButton width={24} height={24} />
            ) : (
              <NoRadioBtn width={24} height={24} />
            )}
            <Text style={styles.directDepTxt}>Yes</Text>
          </TouchableOpacity>
          <View style={{ marginHorizontal: 50 }} />
          <TouchableOpacity
            onPress={() => handleChange("isDirectDeposit", false)}
            style={{ flexDirection: "row", alignItems: "center" }}
            activeOpacity={0.7}
          >
            {!form.isDirectDeposit ? (
              <YesRadioButton width={24} height={24} />
            ) : (
              <NoRadioBtn width={24} height={24} />
            )}
            <Text style={styles.directDepTxt}>No</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.label}>Employer address</Text>
        <TextInput
          style={[
            styles.input,
            errors.employerAddress && { borderColor: "red" },
          ]}
          value={form.employerAddress}
          multiline
          numberOfLines={3}
          onChangeText={(v) => handleChange("employerAddress", v)}
        />
        {errors.employerAddress && (
          <Text style={{ color: "red" }}>{errors.employerAddress}</Text>
        )}
        <Text
          style={[
            styles.label,
            {
              fontSize: FontSizes.xs,
              fontWeight: "400",
              color: AppTheme.colors.ava_text_primary_light,
            },
          ]}
        >
          Time with employer
        </Text>
        <View style={{ flexDirection: "row", gap: 8, marginBottom: 8 }}>
          <View style={{ flex: 1 }}>
            <DropDownPicker
              open={yearsOpen}
              value={selectedYear}
              items={years}
              setOpen={setYearsOpen}
              setValue={(cb) => {
                const val = cb(selectedYear);
                setSelectedYear(val);
                handleChange(
                  "timeWithEmployer",
                  `${val} year${val === 1 ? "" : "s"} ${selectedMonth} month${
                    selectedMonth === 1 ? "" : "s"
                  }`
                );
              }}
              setItems={setYears}
              placeholder="Years"
              containerStyle={{ marginBottom: 0 }}
              style={{
                borderColor: errors.timeWithEmployer ? "red" : "#ccc",
                borderRadius: 8,
                padding: 16,
              }}
              dropDownContainerStyle={{ borderColor: "#ccc" }}
            />
          </View>
          <View style={{ flex: 1 }}>
            <DropDownPicker
              open={monthsOpen}
              value={selectedMonth}
              items={months}
              setOpen={setMonthsOpen}
              setValue={(cb) => {
                const val = cb(selectedMonth);
                setSelectedMonth(val);
                handleChange(
                  "timeWithEmployer",
                  `${selectedYear} year${
                    selectedYear === 1 ? "" : "s"
                  } ${val} month${val === 1 ? "" : "s"}`
                );
              }}
              setItems={setMonths}
              placeholder="Months"
              containerStyle={{ marginBottom: 0 }}
              style={{
                borderColor: errors.timeWithEmployer ? "red" : "#ccc",
                borderRadius: 8,
                padding: 16,
              }}
              dropDownContainerStyle={{ borderColor: "#ccc" }}
            />
          </View>
        </View>
        {errors.timeWithEmployer && (
          <Text style={{ color: "red" }}>{errors.timeWithEmployer}</Text>
        )}
        <View style={{ height: 104 }} />
        <ActionButton
          title="Continue"
          onPress={handleSave}
          disabled={mutation.isPending || !isFormChanged}
          style={{ marginTop: 16 }}
        />
      </ScrollView>
      <DateTimePickerModal
        isVisible={showDatePicker}
        mode="date"
        date={
          form.nextPayday && !isNaN(new Date(form.nextPayday).getTime())
            ? new Date(form.nextPayday)
            : new Date()
        }
        onConfirm={(selectedDate: Date) => {
          setShowDatePicker(false);
          if (selectedDate) {
            handleChange("nextPayday", selectedDate.toISOString());
          }
        }}
        onCancel={() => setShowDatePicker(false)}
      />
    </SafeAreaView>
  );
};

export default EditEmploymentInfo;
