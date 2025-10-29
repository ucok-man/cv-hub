import { useUploadThing } from "@/lib/uploadthing";
import { useState } from "react";

type SubmitStatus = "idle" | "error" | "uploading";

export function useSubmitResume() {
  const [status, setStatus] = useState<SubmitStatus>("idle");
  const [error, setError] = useState<Error | null>(null);

  const { startUpload, isUploading } = useUploadThing("pdfUploader", {
    onClientUploadComplete: () => {},
    onUploadError: (err) => {
      setStatus("error");
      setError(err);
    },
    onUploadBegin: () => setStatus("uploading"),
  });
}
