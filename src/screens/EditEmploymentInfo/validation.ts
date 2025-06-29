import { z } from "zod";
export const employmentInfoSchema = z.object({
  employmentType: z.string().min(1, "Employment type is required"),
  employer: z.string().min(2, "Employer is required"),
  jobTitle: z.string().min(2, "Job title is required"),
  grossAnnualIncome: z.string().min(1, "Gross annual income is required"),
  payFrequency: z.string().min(1, "Pay frequency is required"),
  nextPayday: z.string().min(1, "Next payday is required"),
  isDirectDeposit: z.boolean(),
  employerAddress: z.string().min(2, "Employer address is required"),
  timeWithEmployer: z.string().min(1, "Time with employer is required"),
});
