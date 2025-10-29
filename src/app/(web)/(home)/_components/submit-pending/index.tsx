/* eslint-disable @next/next/no-img-element */
import { SubmitStatus } from "@/lib/types";

type Props = {
  status: SubmitStatus;
};

export default function SubmitPending({ status }: Props) {
  const infotext = (status: SubmitStatus) => {
    switch (status) {
      case "parsing":
        return "Reading your resume...";
      case "uploading":
        return "Uploading your documents...";
      case "analyzing":
        return "Analyzing your resume...";
      case "saving":
        return "Saving your results...";
      case "done":
        return "All done! Preparing your feedback...";
    }
  };

  return (
    <div className="flex flex-col items-center justify-center text-center p-4">
      <h1 className="text-3xl font-bold font-mono max-w-md">
        Getting Your Feedback Ready
      </h1>

      <div className="w-full flex flex-col items-center justify-center mb-2">
        <img
          src="/images/resume-scan.gif"
          alt="Scanning resume"
          className="size-40 rounded-lg shadow-lg"
        />
      </div>

      <div className="flex items-center justify-center gap-2">
        <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
        <p className="text-xl text-muted-foreground">{infotext(status)}</p>
      </div>
    </div>
  );
}
