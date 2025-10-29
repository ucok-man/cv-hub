type Props = {
  currentStep: number;
  totalStep: number;
};

export default function StepIndicator({ currentStep, totalStep }: Props) {
  const steps = Array.from({ length: totalStep }, (_, i) => i + 1);
  return (
    <div className="mb-6">
      <div className="flex justify-between items-center mb-2">
        {steps.map((step) => (
          <div
            key={step}
            className={`flex items-center ${step < totalStep ? "flex-1" : ""}`}
          >
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center font-semibold ${
                step <= currentStep
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground"
              }`}
            >
              {step}
            </div>
            {step < totalStep && (
              <div
                className={`h-1 flex-1 mx-2 ${
                  step < currentStep ? "bg-primary" : "bg-muted"
                }`}
              />
            )}
          </div>
        ))}
      </div>
      <p className="text-sm text-muted-foreground text-center">
        Step {currentStep} of {totalStep}
      </p>
    </div>
  );
}
