import { useState } from "react";
import { toast } from "sonner";
import StepIndicator from "../step-indicator";
import FormFileUpload from "./form-file-upload";
import FormJobDescription from "./form-job-description";
import FormJobTitle from "./form-job-title";

type FormProp = {
  onSubmit: (data: {
    jobTitle: string;
    jobDescription: string;
    file: File;
  }) => void;
};

export default function Form(props: FormProp) {
  const [data, setData] = useState<{
    jobTitle?: string;
    jobDescription?: string;
    file?: File;
  }>();
  const [currentStep, setCurrentStep] = useState<1 | 2 | 3>(1);

  const handleSubmit = () => {
    if (!data?.file) {
      toast.error("Oops!", {
        description: "Resume file is required",
      });
      return;
    }

    if (!data?.jobTitle) {
      toast.error("Oops!", {
        description: "Job title is required",
      });
      return;
    }

    if (!data?.jobDescription) {
      toast.error("Oops!", {
        description: "Job description is required",
      });
      return;
    }

    props.onSubmit({
      jobTitle: data.jobTitle,
      jobDescription: data.jobDescription,
      file: data.file,
    });
  };

  return (
    <>
      {/* Progress Indicator */}
      <StepIndicator currentStep={currentStep} totalStep={3} />

      {currentStep === 1 && (
        <FormJobTitle
          defaultValue={data?.jobTitle ?? ""}
          onNext={(value) => {
            setData((prev) => ({ ...prev, jobTitle: value }));
            setCurrentStep(2);
          }}
        />
      )}

      {currentStep === 2 && (
        <FormJobDescription
          defaultValue={data?.jobDescription ?? ""}
          onPrevious={(value) => {
            setCurrentStep(1);
            setData((prev) => ({ ...prev, jobDescription: value }));
          }}
          onNext={(value) => {
            setData((prev) => ({ ...prev, jobDescription: value }));
            setCurrentStep(3);
          }}
        />
      )}

      {currentStep === 3 && (
        <FormFileUpload
          defaultValue={data?.file ?? null}
          onPrevious={() => setCurrentStep(2)}
          onSelect={(file) => {
            setData((prev) => ({ ...prev, file: file ?? undefined }));
          }}
          onSubmit={handleSubmit}
        />
      )}
    </>
  );
}
