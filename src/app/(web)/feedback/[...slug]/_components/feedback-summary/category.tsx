import { scoreStyle } from "@/lib/utils";
import ScoreBadge from "../score-badge";

type Props = {
  title: string;
  score: number;
};

export default function Category({ title, score }: Props) {
  return (
    <div className="group px-6 py-4 hover:bg-accent/50 transition-colors border-t border-border first:border-t-0">
      <div className="flex items-center justify-between gap-4">
        <div className="flex flex-col items-start sm:flex-row sm:items-center gap-3 flex-1 min-w-0">
          <h3 className="text-base sm:text-lg font-medium text-foreground">
            {title}
          </h3>
          <ScoreBadge score={score} />
        </div>

        <div className="flex items-baseline gap-1 shrink-0">
          <span
            className={`text-xl sm:text-2xl font-semibold ${
              scoreStyle(score).labelColor
            }`}
          >
            {score}
          </span>
          <span className="text-sm text-muted-foreground">/100</span>
        </div>
      </div>
    </div>
  );
}
