import { Tip } from "@/lib/types";
import TipCard from "../tip-card";

type Props = {
  tips: Tip[];
};

export default function TipsStrength({ tips }: Props) {
  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2">
        <div className="h-px flex-1 bg-linear-to-r from-emerald-500/20 to-transparent"></div>
        <h4 className="text-xs font-semibold uppercase tracking-wider text-emerald-400 font-mono">
          Strengths
        </h4>
        <div className="h-px flex-1 bg-linear-to-l from-emerald-500/20 to-transparent"></div>
      </div>
      <div className="space-y-3">
        {tips.map((tip, index) => (
          <TipCard key={`good-${index}`} tip={tip} />
        ))}
      </div>
    </div>
  );
}
