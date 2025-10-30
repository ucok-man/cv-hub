import { AlertCircle, CheckCircle2 } from "lucide-react";

type Props = {
  totalStrength: number;
  totleImprove: number;
};

export default function SummaryStats({ totalStrength, totleImprove }: Props) {
  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 text-sm">
      <div className="flex items-center gap-2">
        <CheckCircle2 className="w-4 h-4 text-emerald-400" />
        <span className="text-muted-foreground">
          <span className="font-semibold text-foreground">{totalStrength}</span>{" "}
          strengths
        </span>
      </div>
      <div className="flex items-center gap-2">
        <AlertCircle className="w-4 h-4 text-amber-400" />
        <span className="text-muted-foreground">
          <span className="font-semibold text-foreground">{totleImprove}</span>{" "}
          improvements
        </span>
      </div>
    </div>
  );
}
