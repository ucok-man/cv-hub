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
import { Input } from "@/components/ui/input";

const formSchema = z.object({
  jobTitle: z
    .string()
    .min(5, "Job title must be at least 5 characters.")
    .max(32, "Job title must be at most 32 characters."),
});

type Props = {
  onNext: (value: string) => void;
  defaultValue: string;
};

export default function FormJobTitle(props: Props) {
  const form = useForm({
    defaultValues: {
      jobTitle: props.defaultValue,
    },
    validators: {
      onSubmit: formSchema,
      onChange: formSchema,
    },
    onSubmit: async ({ value }) => props.onNext(value.jobTitle),
  });

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        form.handleSubmit();
      }}
      className="space-y-6"
    >
      <FieldGroup>
        <form.Field
          name="jobTitle"
          children={(field) => {
            const isInvalid =
              field.state.meta.isTouched && !field.state.meta.isValid;

            return (
              <Field data-invalid={isInvalid}>
                <FieldLabel htmlFor={field.name}>Job Title</FieldLabel>
                <FieldDescription>
                  Enter the position you&apos;re hiring for
                </FieldDescription>
                <Input
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  aria-invalid={isInvalid}
                  placeholder="e.g Fullstack Developer"
                  autoComplete="off"
                />

                {isInvalid && <FieldError errors={field.state.meta.errors} />}
              </Field>
            );
          }}
        />
      </FieldGroup>

      <FieldGroup className="w-full flex flex-row justify-end">
        <Button type="submit">Next</Button>
      </FieldGroup>
    </form>
  );
}
