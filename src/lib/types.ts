import z from "zod";

const tipBaseSchema = z.object({
  type: z.enum(["good", "improve"]),
  tip: z.string().min(1, "Tip cannot be empty"),
});

const tipWithExplanationSchema = tipBaseSchema.extend({
  explanation: z.string().min(1, "Explanation cannot be empty"),
});

export const FeedbackSchema = z.object({
  overallScore: z
    .number()
    .min(0, "Overall score must be at least 0")
    .max(100, "Overall score must be at most 100"),

  ATS: z.object({
    score: z
      .number()
      .min(0, "ATS score must be at least 0")
      .max(100, "ATS score must be at most 100"),
    tips: z.array(tipBaseSchema).min(1, "Must include at least one tip"),
  }),

  toneAndStyle: z.object({
    score: z
      .number()
      .min(0, "Tone and style score must be at least 0")
      .max(100, "Tone and style score must be at most 100"),
    tips: z
      .array(tipWithExplanationSchema)
      .min(1, "Must include at least one tip"),
  }),

  content: z.object({
    score: z
      .number()
      .min(0, "Content score must be at least 0")
      .max(100, "Content score must be at most 100"),
    tips: z
      .array(tipWithExplanationSchema)
      .min(1, "Must include at least one tip"),
  }),

  structure: z.object({
    score: z
      .number()
      .min(0, "Structure score must be at least 0")
      .max(100, "Structure score must be at most 100"),
    tips: z
      .array(tipWithExplanationSchema)
      .min(1, "Must include at least one tip"),
  }),

  skills: z.object({
    score: z
      .number()
      .min(0, "Skills score must be at least 0")
      .max(100, "Skills score must be at most 100"),
    tips: z
      .array(tipWithExplanationSchema)
      .min(1, "Must include at least one tip"),
  }),
});

export type Feedback = z.infer<typeof FeedbackSchema>;

export type SubmitStatus =
  | "parsing"
  | "uploading"
  | "analyzing"
  | "saving"
  | "done";
