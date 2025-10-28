import { createUploadthing, type FileRouter } from "uploadthing/next";

const f = createUploadthing();

export const uploadthingRouter = {
  pdfUploader: f({
    pdf: {
      maxFileSize: "16MB",
      maxFileCount: 1,
    },
  }).onUploadComplete(async ({ file }) => {
    console.log("Upload complete:", file);
  }),
} satisfies FileRouter;

export type UploadthingRouter = typeof uploadthingRouter;
