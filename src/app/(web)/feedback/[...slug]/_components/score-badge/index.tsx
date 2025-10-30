import { cn, scoreStyle } from "@/lib/utils";

type Props = {
  score: number;
  className?: string;
};

export default function ScoreBadge({ score, className }: Props) {
  const styles = scoreStyle(score);

  return (
    <div
      className={cn(
        "inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium border border-current/10",
        styles.iconBg,
        styles.labelColor,
        className
      )}
    >
      <span className="font-mono text-xs">{styles.label}</span>
    </div>
  );
}
