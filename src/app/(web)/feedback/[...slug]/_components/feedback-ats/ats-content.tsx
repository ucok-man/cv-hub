import { Tip } from "@/lib/types";
import Recomendation from "./recomendation";

type Props = {
  tips: Tip[];
};

export default function ATSContent({ tips }: Props) {
  return (
    <div className="p-6 pt-5 space-y-5">
      {/* Description */}
      <p className="text-sm text-muted-foreground leading-relaxed">
        This score represents how well your resume is likely to perform in
        Applicant Tracking Systems used by employers.
      </p>

      {/* Suggestions */}
      {tips.length > 0 && <Recomendation tips={tips} />}

      {/* Footer Message */}
      <div className="pt-2">
        <p className="text-xs text-muted-foreground italic">
          Keep refining your resume to improve your chances of getting past ATS
          filters and into the hands of recruiters.
        </p>
      </div>
    </div>
  );
}
