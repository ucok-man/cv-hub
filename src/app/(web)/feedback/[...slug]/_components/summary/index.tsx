import { Feedback } from "@/lib/types";
import { scoreStyle } from "@/lib/utils";
import ScoreBadge from "../score-badge";
import ScoreGauge from "../score-gauge";

function Category({ title, score }: { title: string; score: number }) {
  return (
    <div className="group px-6 py-4 hover:bg-accent/50 transition-colors border-t border-border first:border-t-0">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-3 flex-1 min-w-0">
          <h3 className="text-base font-medium text-foreground">{title}</h3>
          <ScoreBadge score={score} />
        </div>
        <div className="flex items-baseline gap-1 shrink-0">
          <span className={`text-2xl font-semibold ${scoreStyle(score).text}`}>
            {score}
          </span>
          <span className="text-sm text-muted-foreground">/100</span>
        </div>
      </div>
    </div>
  );
}

export default function Summary({ feedback }: { feedback: Feedback }) {
  return (
    <div className="w-full max-w-3xl mx-auto p-8">
      <div className="rounded-xl border border-border bg-card shadow-sm overflow-hidden">
        <div className="flex flex-col sm:flex-row items-center gap-6 p-6 sm:p-8 bg-linear-to-br from-primary/5 to-transparent">
          <ScoreGauge score={feedback.overallScore} />

          <div className="flex flex-col gap-2 text-center sm:text-left">
            <h2 className="text-2xl font-bold text-foreground">
              Your Resume Score
            </h2>
            <p className="text-sm text-muted-foreground max-w-md">
              This score is calculated based on multiple factors including tone,
              content quality, structure, and skills presentation.
            </p>
          </div>
        </div>

        <div className="bg-card">
          <Category title="Tone & Style" score={feedback.toneAndStyle.score} />
          <Category title="Content" score={feedback.content.score} />
          <Category title="Structure" score={feedback.structure.score} />
          <Category title="Skills" score={feedback.skills.score} />
        </div>
      </div>
    </div>
  );
}
