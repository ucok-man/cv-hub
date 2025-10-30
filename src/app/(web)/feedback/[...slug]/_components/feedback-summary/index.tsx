import { Feedback } from "@/lib/types";
import Category from "./category";
import SummaryHeader from "./summary-header";

type Props = {
  feedback: Feedback;
};

export default function FeedbackSummary({ feedback }: Props) {
  return (
    <section className="w-full rounded-xl border border-border bg-card shadow-sm overflow-hidden">
      <SummaryHeader overallScore={feedback.overallScore} />

      <div className="bg-card">
        <Category title="Tone & Style" score={feedback.toneAndStyle.score} />
        <Category title="Content" score={feedback.content.score} />
        <Category title="Structure" score={feedback.structure.score} />
        <Category title="Skills" score={feedback.skills.score} />
      </div>
    </section>
  );
}
