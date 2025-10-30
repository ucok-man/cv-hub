import z from "zod";

const TipSchema = z.object({
  type: z.enum(["good", "improve"]),
  tip: z
    .string()
    .min(1, "Tip cannot be empty")
    .max(40, "Tip max is 40 character long"),
  explanation: z
    .string()
    .min(50, "Explanation cannot be empty and minimum 50 character"),
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
    tips: z.array(TipSchema).min(1, "Must include at least one tip"),
  }),

  toneAndStyle: z.object({
    score: z
      .number()
      .min(0, "Tone and style score must be at least 0")
      .max(100, "Tone and style score must be at most 100"),
    tips: z.array(TipSchema).min(1, "Must include at least one tip"),
  }),

  content: z.object({
    score: z
      .number()
      .min(0, "Content score must be at least 0")
      .max(100, "Content score must be at most 100"),
    tips: z.array(TipSchema).min(1, "Must include at least one tip"),
  }),

  structure: z.object({
    score: z
      .number()
      .min(0, "Structure score must be at least 0")
      .max(100, "Structure score must be at most 100"),
    tips: z.array(TipSchema).min(1, "Must include at least one tip"),
  }),

  skills: z.object({
    score: z
      .number()
      .min(0, "Skills score must be at least 0")
      .max(100, "Skills score must be at most 100"),
    tips: z.array(TipSchema).min(1, "Must include at least one tip"),
  }),
});

export type Feedback = z.infer<typeof FeedbackSchema>;
export type ATS = Pick<Feedback, "ATS">["ATS"];
export type Tip = z.infer<typeof TipSchema>;

export type SubmitStatus =
  | "parsing"
  | "uploading"
  | "analyzing"
  | "saving"
  | "done";
