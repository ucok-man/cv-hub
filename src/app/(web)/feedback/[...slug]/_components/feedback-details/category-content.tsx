import { Tip } from "@/lib/types";
import TipsImprovement from "../tips-improvement";
import TipsStrength from "../tips-strength";
import SummaryStats from "./sumary-stats";

export default function CategoryContent({ tips }: { tips: Tip[] }) {
  const strengthtips = tips.filter((t) => t.type === "good");
  const improvetips = tips.filter((t) => t.type === "improve");

  return (
    <div className="space-y-6 pt-2">
      {/* Summary Stats */}
      <SummaryStats
        totalStrength={strengthtips.length}
        totleImprove={improvetips.length}
      />

      {/* Strengths Section */}
      {strengthtips.length > 0 && <TipsStrength tips={strengthtips} />}

      {/* Improvements Section */}
      {improvetips.length > 0 && <TipsImprovement tips={improvetips} />}
    </div>
  );
}
