"use client";

import { Card, CardContent } from "@/components/ui/card";
import { SubmitStatus } from "@/lib/types";
import { api } from "@/orpc";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import Form from "./_components/form";
import SubmitPending from "./_components/submit-pending";
// import SubmitPending from "./_components/submit-pending";

export default function FormSubmission() {
  const router = useRouter();
  const [status, setStatus] = useState<SubmitStatus | null>(null);

  const submit = useMutation(
    api.resume.analyze.mutationOptions({
      onSuccess: async (stream) => {
        let id = "";
        let jobtitle = "";

        for await (const s of stream) {
          setStatus(s.status);
          if (s.status === "done") {
            id = s.data.id;
            jobtitle = s.data.jobTitle;
          }
        }
        router.push(`/feedback/${jobtitle.split(" ").join("-")}-${id}`);
      },
      onError: () => {
        toast.error("Oops! something went wrong", {
          description: "Failed to analyze resume. Please try again.",
        });
      },
    })
  );

  return (
    <Card className="w-full border-none">
      <CardContent>
        {status ? (
          <SubmitPending status={status} />
        ) : (
          <Form onSubmit={(data) => submit.mutate(data)} />
        )}

        {/* <SubmitPending status={"analyzing"} /> */}
      </CardContent>
    </Card>
  );
}
