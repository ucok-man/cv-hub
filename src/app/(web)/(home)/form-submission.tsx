"use client";

import * as React from "react";

import { Card, CardContent } from "@/components/ui/card";
import FormFileUpload from "./form-file-upload";
import FormJobDescription from "./form-job-description";
import FormJobTitle from "./form-job-title";
import StepIndicator from "./step-indicator";

export default function FormSubmission() {
  const [state, setState] = React.useState<{
    jobTitle?: string;
    jobDescription?: string;
    file?: File;
  }>();
  const [currentStep, setCurrentStep] = React.useState<1 | 2 | 3>(1);

  const handleSubmit = () => {
    console.log({ state });
  };

  return (
    <Card className="w-full border-none">
      <CardContent>
        {/* Progress Indicator */}
        <StepIndicator currentStep={currentStep} totalStep={3} />

        {currentStep === 1 && (
          <FormJobTitle
            defaultValue={state?.jobTitle ?? ""}
            onNext={(value) => {
              setState((prev) => ({ ...prev, jobTitle: value }));
              setCurrentStep(2);
            }}
          />
        )}

        {currentStep === 2 && (
          <FormJobDescription
            defaultValue={state?.jobDescription ?? ""}
            onPrevious={() => {
              setCurrentStep(1);
            }}
            onNext={(value) => {
              setState((prev) => ({ ...prev, jobDescription: value }));
              setCurrentStep(3);
            }}
          />
        )}

        {currentStep === 3 && (
          <FormFileUpload
            defaultValue={state?.file ?? null}
            onPrevious={() => setCurrentStep(2)}
            onSelect={(file) => {
              setState((prev) => ({ ...prev, file: file ?? undefined }));
            }}
            onSubmit={handleSubmit}
          />
        )}
      </CardContent>
    </Card>
  );
}
