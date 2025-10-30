import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Feedback } from "@/lib/types";
import CategoryContent from "./category-content";
import { CategoryHeader } from "./category-header";

type Props = {
  feedback: Feedback;
};

export default function FeedbackDetails({ feedback }: Props) {
  const categories = [
    { id: "tone-style", title: "Tone & Style", data: feedback.toneAndStyle },
    { id: "content", title: "Content", data: feedback.content },
    { id: "structure", title: "Structure", data: feedback.structure },
    { id: "skills", title: "Skills", data: feedback.skills },
  ];

  return (
    <Accordion type="multiple" className="space-y-4">
      {categories.map((category) => (
        <AccordionItem
          key={category.id}
          value={category.id}
          className="border-none"
        >
          <div className="border border-border rounded-xl bg-card shadow-sm hover:shadow-md transition-shadow overflow-hidden">
            <AccordionTrigger className="hover:no-underline hover:bg-accent/30 px-6 py-5 transition-colors [&[data-state=open]>svg]:rotate-180">
              <CategoryHeader
                title={category.title}
                score={category.data.score}
              />
            </AccordionTrigger>
            <AccordionContent className="px-6 pb-6">
              <CategoryContent tips={category.data.tips} />
            </AccordionContent>
          </div>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
