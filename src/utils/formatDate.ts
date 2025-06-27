import { format } from "date-fns";

// Helper to format date for display in 'Sept 22nd, 2023 (Friday)' format using date-fns
export const formatDate = (dateStr: string) => {
  if (!dateStr) return "";
  const d = new Date(dateStr);
  if (isNaN(d.getTime())) return "";
  // Custom format: 'MMM do, yyyy (EEEE)'
  // But 'Sept' is not standard, so we replace 'Sep' with 'Sept' after formatting
  let formatted = format(d, "MMM do, yyyy (EEEE)");
  if (formatted.startsWith("Sep ")) {
    formatted = formatted.replace(/^Sep /, "Sept ");
  }
  return formatted;
};
