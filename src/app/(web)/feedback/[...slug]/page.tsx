import { parseSlug } from "@/lib/utils";
import { api } from "@/orpc";
import { notFound } from "next/navigation";
import FeedbackATS from "./_components/feedback-ats";
import FeedbackDetails from "./_components/feedback-details";
import FeedbackSummary from "./_components/feedback-summary";
import PDFViewer from "./_components/pdf-viewer";

export default async function Feedback(
  props: PageProps<"/feedback/[...slug]">
) {
  const { slug } = await props.params;
  if (!slug.length) notFound();

  const { id } = parseSlug(slug[0]);
  const resume = await api.resume.getById.call({ id });
  if (!resume) notFound();

  return (
    <section>
      <div className="flex flex-col lg:flex-row items-start relative p-4 sm:p-8 pt-0 gap-8">
        {/* <div className="top-24 sticky"> */}
        <PDFViewer imageurls={resume.images} />
        {/* </div> */}

        <div className="w-full space-y-8">
          <FeedbackSummary feedback={resume.feedback} />
          <FeedbackATS ats={resume.feedback.ATS} />
          <FeedbackDetails feedback={resume.feedback} />
        </div>
      </div>
    </section>
  );
}
