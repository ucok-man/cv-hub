import { ResumeFile } from "@/lib/resume-file";
import { Feedback } from "@/lib/types";
import { uploadImages } from "@/lib/upload-images";
import { titlecase } from "@/lib/utils";
import { ORPCError } from "@orpc/client";
import { Resume } from "@prismagen/client";
import z from "zod";
import { pub } from "../procedure";

export const resumeRouter = {
  analyze: pub
    .input(
      z.object({
        jobTitle: z.string(),
        jobDescription: z.string(),
        file: z.file(),
      })
    )
    .handler(async function* ({ input, context }) {
      const { file, jobTitle, jobDescription } = input;
      const { db } = context;

      /* ---------------------- 1. Convert to image --------------------- */
      try {
        yield { status: "parsing" as const, data: null };
        const resume = new ResumeFile(file);
        const [images, text] = await Promise.all([
          resume.screenshots(),
          resume.text(),
        ]);

        yield { status: "uploading" as const, data: null };
        const urls = await uploadImages(images);

        yield { status: "analyzing" as const, data: null };
        const feedback = await resume.analyze({
          jobTitle: jobTitle,
          jobDescription: jobDescription,
          imageurls: urls,
          textcontent: text,
        });

        yield { status: "saving" as const, data: null };
        const record = await db.resume.create({
          data: {
            jobTitle: titlecase(jobTitle),
            jobDescription: jobDescription,
            images: urls,
            feedback: feedback,
          },
        });

        yield {
          status: "done" as const,
          data: { id: record.id, jobTitle: record.jobTitle },
        };
        return;
      } catch (error) {
        console.error(error);
        throw new ORPCError("INTERNAL_SERVER_ERROR", {
          message: error instanceof Error ? error.message : `${error}`,
        });
      }
    }),

  getById: pub
    .input(
      z.object({
        id: z.string(),
      })
    )
    .handler(async function ({ input, context }) {
      const resume = await context.db.resume.findUnique({
        where: { id: input.id },
      });
      return resume as
        | (Omit<Resume, "feedback"> & { feedback: Feedback })
        | null;
    }),
};
