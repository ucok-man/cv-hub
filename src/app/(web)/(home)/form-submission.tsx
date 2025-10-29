"use client";

import * as React from "react";

import { Card, CardContent } from "@/components/ui/card";
import { api } from "@/orpc";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import FormFileUpload from "./form-file-upload";
import FormJobDescription from "./form-job-description";
import FormJobTitle from "./form-job-title";
import StepIndicator from "./step-indicator";

export default function FormSubmission() {
  const [data, setData] = React.useState<{
    jobTitle?: string;
    jobDescription?: string;
    file?: File;
  }>();
  const [currentStep, setCurrentStep] = React.useState<1 | 2 | 3>(1);

  const submit = useMutation(
    api.resume.analyze.mutationOptions({
      onSuccess: async (stream) => {
        for await (const update of stream) {
          console.log({ update });
        }
      },

      onError: (err) => {
        console.error({ err });
      },
    })
  );

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

    submit.mutate({
      jobTitle: data.jobTitle,
      jobDescription: data.jobDescription,
      file: data.file,
    });
  };

  return (
    <Card className="w-full border-none">
      <CardContent>
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
            onPrevious={() => {
              setCurrentStep(1);
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
      </CardContent>
    </Card>
  );
}
