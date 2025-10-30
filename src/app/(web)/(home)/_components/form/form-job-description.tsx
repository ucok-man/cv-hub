/* eslint-disable react/no-children-prop */
"use client";

import { useForm } from "@tanstack/react-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  InputGroupTextarea,
} from "@/components/ui/input-group";

const formSchema = z.object({
  jobDescription: z
    .string()
    .min(20, "Job Description must be at least 20 characters.")
    .max(100, "Job Description must be at most 100 characters."),
});

type Props = {
  onNext: (value: string) => void;
  onPrevious: (value: string) => void;
  defaultValue: string;
};

export default function FormJobDescription(props: Props) {
  const form = useForm({
    defaultValues: {
      jobDescription: props.defaultValue,
    },
    validators: {
      onSubmit: formSchema,
      onChange: formSchema,
    },
    onSubmit: async ({ value }) => props.onNext(value.jobDescription),
  });

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        form.handleSubmit();
      }}
      className="space-y-6 relative"
    >
      <FieldGroup>
        <form.Field
          name="jobDescription"
          children={(field) => {
            const isInvalid =
              field.state.meta.isTouched && !field.state.meta.isValid;

            return (
              <Field data-invalid={isInvalid}>
                <FieldLabel htmlFor={field.name}>Job Description</FieldLabel>
                <FieldDescription>
                  Write a clear <span className="max-sm:hidden">& concise</span>{" "}
                  job description{" "}
                  <span className="max-sm:hidden">
                    with responsibilities & expectations
                  </span>
                </FieldDescription>
                <InputGroup>
                  <InputGroupTextarea
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    placeholder="..."
                    rows={6}
                    className="min-h-24 resize-none"
                    aria-invalid={isInvalid}
                  />
                  <InputGroupAddon align="block-end">
                    <InputGroupText className="tabular-nums">
                      {field.state.value.length}/100 characters
                    </InputGroupText>
                  </InputGroupAddon>
                </InputGroup>
                {isInvalid && <FieldError errors={field.state.meta.errors} />}
              </Field>
            );
          }}
        />
      </FieldGroup>

      <FieldGroup className="w-full flex flex-row justify-between">
        <Button
          type="button"
          variant="outline"
          onClick={() => props.onPrevious(form.getFieldValue("jobDescription"))}
        >
          Previous
        </Button>

        <Button
          type="submit"
          className="bg-rose-500 hover:bg-rose-500/90 text-foreground"
        >
          Next
        </Button>
      </FieldGroup>
    </form>
  );
}
