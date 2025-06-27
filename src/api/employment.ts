import AsyncStorage from "@react-native-async-storage/async-storage";
import type { EmploymentInfo } from "@/types/employment";

const STORAGE_KEY = "employmentInfo";

const defaultEmploymentInfo: EmploymentInfo = {
  employmentType: "Full-time",
  employer: "Apple Inc",
  jobTitle: "Software Engineer",
  grossAnnualIncome: "$120,000",
  payFrequency: "Bi-weekly",
  employerAddress: "Apple One Apple Park Way, Cupertino, CA 95014",
  timeWithEmployer: "1 year 3 months",
  //   nextPayday: "Sept 22nd, 2023 (Friday)",
  nextPayday: "2025-07-26T19:10:04.000Z",
  isDirectDeposit: true,
};

export async function getEmploymentInfo(): Promise<EmploymentInfo> {
  try {
    const stored = await AsyncStorage.getItem(STORAGE_KEY);
    if (stored) return JSON.parse(stored);
    return defaultEmploymentInfo;
  } catch (e) {
    return defaultEmploymentInfo;
  }
}

export async function updateEmploymentInfo(
  info: EmploymentInfo
): Promise<EmploymentInfo> {
  try {
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(info));
    return info;
  } catch (e) {
    return info;
  }
}
