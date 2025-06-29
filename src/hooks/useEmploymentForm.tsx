import { useState, useEffect } from "react";
import isEqual from "lodash.isequal";

import { employmentInfoSchema } from "@/screens/EditEmploymentInfo/validation";
import { EmploymentInfo } from "@/types/employment";

export const useEmploymentForm = (data: EmploymentInfo | undefined) => {
  const [form, setForm] = useState<EmploymentInfo | null>(null);
  const [initialForm, setInitialForm] = useState<EmploymentInfo | null>(null);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    if (data) {
      setForm(data);
      setInitialForm(data);
    }
  }, [data]);

  const isFormChanged = !isEqual(form, initialForm);

  const handleChange = (key: keyof EmploymentInfo, value: string | boolean) => {
    setForm((prev) => (prev ? { ...prev, [key]: value } : prev));
  };

  const validate = () => {
    if (!form) return false;
    const result = employmentInfoSchema.safeParse(form);
    if (!result.success) {
      const fieldErrors: { [key: string]: string } = {};
      result.error.errors.forEach(
        (err: { path: (string | number)[]; message: string }) => {
          if (err.path[0]) fieldErrors[err.path[0] as string] = err.message;
        }
      );
      setErrors(fieldErrors);
      return false;
    }
    setErrors({});
    return true;
  };

  return {
    form,
    setForm,
    errors,
    setErrors,
    isFormChanged,
    handleChange,
    validate,
  };
};
