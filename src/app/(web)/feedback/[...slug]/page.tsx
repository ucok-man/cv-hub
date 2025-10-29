import MaxWidthWrapper from "@/components/max-width-wrapper";
import { parseSlug } from "@/lib/utils";
import { api } from "@/orpc";
import { notFound } from "next/navigation";
import Summary from "./_components/summary";

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
      <MaxWidthWrapper className="py-8">
        <Summary feedback={resume.feedback} />
      </MaxWidthWrapper>
    </section>
  );
}
