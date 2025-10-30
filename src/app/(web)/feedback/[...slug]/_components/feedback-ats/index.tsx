import { ATS } from "@/lib/types";
import ATSContent from "./ats-content";
import ATSHeader from "./ats-header";

type Props = {
  ats: ATS;
};

export default function FeedbackATS({ ats }: Props) {
  return (
    <section className="bg-card rounded-xl border border-border shadow-sm w-full overflow-hidden">
      {/* Header Section */}
      <ATSHeader score={ats.score} />

      {/* Divider */}
      <div className="h-px bg-border mx-6" />

      {/* Content Section */}
      <ATSContent tips={ats.tips} />
    </section>
  );
}
