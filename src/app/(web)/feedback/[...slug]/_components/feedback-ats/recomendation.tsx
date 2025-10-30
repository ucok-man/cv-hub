import { Tip } from "@/lib/types";
import TipsImprovement from "../tips-improvement";
import TipsStrength from "../tips-strength";

type Props = {
  tips: Tip[];
};

export default function Recomendation({ tips }: Props) {
  const strengthtips = tips.filter((t) => t.type === "good");
  const improvetips = tips.filter((t) => t.type === "improve");

  return (
    <div className="space-y-4">
      <h3 className="font-semibold text-foreground">Recommendations</h3>
      <div className="space-y-6">
        {/* Strengths Section */}
        {strengthtips.length > 0 && <TipsStrength tips={strengthtips} />}

        {/* Improvements Section */}
        {improvetips.length > 0 && <TipsImprovement tips={improvetips} />}
      </div>
    </div>
  );
}
