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
          <div className="flex items-baseline gap-2 mb-1">
            <h2 className="text-2xl font-bold text-foreground">
              {score}
              <span className="text-lg font-normal text-muted-foreground">
                /100
              </span>
            </h2>
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
