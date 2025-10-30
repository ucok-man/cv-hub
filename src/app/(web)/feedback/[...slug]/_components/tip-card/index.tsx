import { Tip } from "@/lib/types";
import { cn } from "@/lib/utils";
import { AlertCircle, CheckCircle2 } from "lucide-react";

type Props = {
  tip: Tip;
};

export default function TipCard({ tip }: Props) {
  const isGood = tip.type === "good";

  return (
    <div
      className={cn(
        "rounded-lg p-4 border transition-all duration-200 hover:shadow-sm",
        isGood
          ? "bg-emerald-950/20 border-emerald-800/30"
          : "bg-amber-950/20 border-amber-800/30"
      )}
    >
      <div className="flex items-start gap-3">
        <div className="shrink-0 mt-0.5">
          {isGood ? (
            <CheckCircle2 className="w-5 h-5 text-emerald-400" />
          ) : (
            <AlertCircle className="w-5 h-5 text-amber-400" />
          )}
        </div>
        <div className="flex-1 min-w-0">
          <h4 className="font-medium text-sm mb-1.5">{tip.tip}</h4>
          <p className="text-sm leading-relaxed text-muted-foreground">
            {tip.explanation}
          </p>
        </div>
      </div>
    </div>
  );
}
