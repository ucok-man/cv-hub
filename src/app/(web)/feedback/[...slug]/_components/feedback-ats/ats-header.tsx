import { scoreStyle } from "@/lib/utils";

type Props = {
  score: number;
};

export default function ATSHeader({ score }: Props) {
  const styles = scoreStyle(score);
  const Icon = styles.icon;

  return (
    <div className={`p-6 pb-4 bg-linear-to-b ${styles.gradient} to-card`}>
      <div className="flex items-start gap-4">
        <div className={`${styles.iconBg} p-3 rounded-lg shrink-0`}>
          <Icon className={`w-8 h-8 ${styles.iconColor}`} />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex flex-col sm:flex-row items-baseline sm:gap-2 gap-1 mb-1">
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
            <span
              className={`text-sm font-semibold ${styles.labelColor} font-mono`}
            >
              {styles.label}
            </span>
          </div>

          <p className="text-sm text-muted-foreground">
            ATS Compatibility Score
          </p>
        </div>
      </div>
    </div>
  );
}
