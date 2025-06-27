import {
  StyleSheet,
  Text,
  View,
  TextInput,
  ScrollView,
  Button,
  ActivityIndicator,
  Alert,
  TouchableOpacity,
} from "react-native";
import React, { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getEmploymentInfo, updateEmploymentInfo } from "@/api/employment";
import { EmploymentInfo } from "@/types/employment";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import DropDownPicker from "react-native-dropdown-picker";
import { AppTheme } from "@/theme/colors";
import { FontSizes } from "@/theme/fontSizes";
import AntDesign from "@expo/vector-icons/AntDesign";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { formatDate } from "@/utils/formatDate";
import Calendar from "../../assets/icons/Calendar.svg";
import YesRadioButton from "../../assets/icons/YesRadioButton.svg";
import NoRadioBtn from "../../assets/icons/NoRadioBtn.svg";
import { ActionButton } from "@/components/ActionButton";
import isEqual from "lodash.isequal";

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

  const [form, setForm] = useState<EmploymentInfo | null>(null);
  const [initialForm, setInitialForm] = useState<EmploymentInfo | null>(null);
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

  useEffect(() => {
    if (data) {
      setForm(data);
      setInitialForm(data);
    }
  }, [data]);

  if (isLoading || !form) return <ActivityIndicator style={{ flex: 1 }} />;
  if (isError) return <Text>Error loading employment info.</Text>;

  const handleChange = (key: keyof EmploymentInfo, value: string | boolean) => {
    setForm((prev) => (prev ? { ...prev, [key]: value } : prev));
  };

  const handleSave = () => {
    if (form) mutation.mutate(form);
  };

  const isFormChanged = !isEqual(form, initialForm);

  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: AppTheme.colors.ava_background }}
    >
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
          style={{ borderColor: "#ccc", padding: 16, borderRadius: 8 }}
          dropDownContainerStyle={{ borderColor: "#ccc" }}
          scrollViewProps={{ nestedScrollEnabled: true }}
        />
        <Text style={styles.label}>Employer</Text>
        <TextInput
          style={styles.input}
          value={form.employer}
          onChangeText={(v) => handleChange("employer", v)}
        />
        <Text style={styles.label}>Job title</Text>
        <TextInput
          style={styles.input}
          value={form.jobTitle}
          onChangeText={(v) => handleChange("jobTitle", v)}
        />
        <Text style={styles.label}>Gross annual income</Text>
        <TextInput
          style={styles.input}
          value={form.grossAnnualIncome}
          onChangeText={(v) => handleChange("grossAnnualIncome", v)}
        />
        <Text style={styles.label}>Pay frequency</Text>
        <DropDownPicker
          open={payFreqOpen}
          value={form.payFrequency}
          items={payFreqItems}
          setOpen={setPayFreqOpen}
          setValue={(cb) => handleChange("payFrequency", cb(form.payFrequency))}
          setItems={() => {}}
          containerStyle={{ marginBottom: 12 }}
          style={{ borderColor: "#ccc", padding: 16, borderRadius: 8 }}
          dropDownContainerStyle={{ borderColor: "#ccc" }}
          scrollViewProps={{ nestedScrollEnabled: true }}
        />
        <Text style={styles.label}>Next payday</Text>
        <View style={{ position: "relative", marginBottom: 8 }}>
          <TextInput
            style={[
              styles.input,
              {
                paddingRight: 44, // space for icon
                marginBottom: 0,
              },
            ]}
            value={formatDate(form.nextPayday)}
            editable={false}
            pointerEvents="none"
          />
          <TouchableOpacity
            onPress={() => setShowDatePicker(true)}
            style={{
              position: "absolute",
              right: 0,
              top: 0,
              height: "100%",
              justifyContent: "center",
              alignItems: "center",
              width: 44,
            }}
          >
            <Calendar width={20} height={20} />
          </TouchableOpacity>
        </View>
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
        <Text style={styles.label}>Is your pay a direct deposit?</Text>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginBottom: 16,
            marginTop: 24,
          }}
        >
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
            <Text
              style={{
                marginLeft: 4,
                color: AppTheme.colors.ava_text_primary_dark,
                fontSize: FontSizes.md,
              }}
            >
              Yes
            </Text>
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
            <Text
              style={{
                marginLeft: 4,
                color: AppTheme.colors.ava_text_primary_dark,
                fontSize: FontSizes.md,
              }}
            >
              No
            </Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.label}>Employer address</Text>
        <TextInput
          style={styles.input}
          value={form.employerAddress}
          multiline
          numberOfLines={3}
          onChangeText={(v) => handleChange("employerAddress", v)}
        />
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
              style={{ borderColor: "#ccc", borderRadius: 8, padding: 16 }}
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
              style={{ borderColor: "#ccc", borderRadius: 8, padding: 16 }}
              dropDownContainerStyle={{ borderColor: "#ccc" }}
            />
          </View>
        </View>

        <ActionButton
          title="Continue"
          onPress={handleSave}
          disabled={mutation.isPending || !isFormChanged}
          style={{ marginTop: 16 }}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default EditEmploymentInfo;

const styles = StyleSheet.create({
  title: {
    fontSize: FontSizes.xxxl,
    fontWeight: "600",
    marginBottom: 12,
    color: AppTheme.colors.ava_text_primary_dark,
  },
  container: {
    padding: 16,
    backgroundColor: AppTheme.colors.ava_background,
    flexGrow: 1,
  },
  label: {
    fontSize: FontSizes.md,
    fontWeight: "600",
    marginTop: 12,
    marginBottom: 4,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 16,
    marginBottom: 8,
    backgroundColor: AppTheme.colors.ava_white,
    fontSize: FontSizes.md,
  },
});
