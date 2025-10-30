import ScoreGauge from "../score-gauge";

type Props = {
  overallScore: number;
};

export default function SummaryHeader({ overallScore }: Props) {
  return (
    <div className="flex flex-col sm:flex-row items-center gap-6 p-6 sm:p-8 bg-linear-to-br from-primary/5 to-transparent">
      <ScoreGauge score={overallScore} />

      <div className="flex flex-col gap-2 text-center sm:text-left">
        <h2 className="text-2xl font-bold text-foreground">
          Your Resume Score
        </h2>
        <p className="text-sm text-muted-foreground max-w-md">
          This score is calculated based on multiple factors including tone,
          content quality, structure, and skills presentation.
        </p>
      </div>
    </div>
  );
}
