import { z } from "zod";

export const feedbackSchema = z.object({
  feedback: z.string().min(10, "Feedback must be at least 10 characters."),
});
