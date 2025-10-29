import { Resume } from "@/lib/resume";
import { uploadImages } from "@/lib/upload-images";
import { ORPCError } from "@orpc/client";
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
    .handler(async function* ({ input }) {
      const { file, jobTitle, jobDescription } = input;

      /* ---------------------- 1. Convert to image --------------------- */
      try {
        yield { status: "parsing" as const, data: null };
        const resume = new Resume(file);
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

        yield { status: "done" as const, data: feedback };
        return;
      } catch (error) {
        console.error(error);
        throw new ORPCError("INTERNAL_SERVER_ERROR", {
          message: error instanceof Error ? error.message : `${error}`,
        });
      }
    }),
};
