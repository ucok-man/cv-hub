import { cn, scoreStyle } from "@/lib/utils";
import ScoreBadge from "../score-badge";

type Props = {
  title: string;
  score: number;
};
export function CategoryHeader({ title, score }: Props) {
  const styles = scoreStyle(score);
  return (
    <div className="flex items-center gap-4 text-lg">
      <h3 className="text-base sm:text-lg font-medium text-foreground">
        {title}
      </h3>
      <div className="flex items-center justify-center gap-3">
        <p className={cn(styles.labelColor)}>
          {score} <span className="text-muted-foreground">/100</span>
        </p>

        <ScoreBadge score={score} className="max-sm:hidden" />
      </div>
    </div>
  );
}
