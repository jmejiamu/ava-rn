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
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";

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
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [payFreqOpen, setPayFreqOpen] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);
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

  useEffect(() => {
    if (data) setForm(data);
  }, [data]);

  if (isLoading || !form) return <ActivityIndicator style={{ flex: 1 }} />;
  if (isError) return <Text>Error loading employment info.</Text>;

  const handleChange = (key: keyof EmploymentInfo, value: string | boolean) => {
    setForm((prev) => (prev ? { ...prev, [key]: value } : prev));
  };

  const handleSave = () => {
    if (form) mutation.mutate(form);
  };

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
            <FontAwesome5
              name="calendar-week"
              size={20}
              color={AppTheme.colors.ava_text_primary_light}
            />
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
          }}
        >
          <Button
            title={form.isDirectDeposit ? "Yes" : "No"}
            onPress={() =>
              handleChange("isDirectDeposit", !form.isDirectDeposit)
            }
          />
        </View>
        <Text style={styles.label}>Employer address</Text>
        <TextInput
          style={styles.input}
          value={form.employerAddress}
          onChangeText={(v) => handleChange("employerAddress", v)}
        />
        <Text style={styles.label}>Time with employer</Text>
        <TextInput
          style={styles.input}
          value={form.timeWithEmployer}
          onChangeText={(v) => handleChange("timeWithEmployer", v)}
        />
        <Button
          title="Save"
          onPress={handleSave}
          disabled={mutation.isPending}
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
