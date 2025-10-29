import MaxWidthWrapper from "@/components/max-width-wrapper";
import Submission from "./submission";

export default function HomePage() {
  return (
    <section className="space-y-8">
      <MaxWidthWrapper className="flex flex-col items-center justify-center py-8 text-center gap-6">
        <h1 className="text-7xl font-medium leading-20 bg-clip-text text-transparent bg-linear-to-r from-foreground via-stone-400 to-foreground">
          Track Your Applications & Resume Ratings
        </h1>

        <p className="text-xl tracking-wide font-mono text-foreground/80">
          Review your submissions and check AI-powered feedback.
        </p>
      </MaxWidthWrapper>

      <MaxWidthWrapper className="flex items-center justify-center max-w-xl">
        <Submission />
      </MaxWidthWrapper>
    </section>
  );
}
