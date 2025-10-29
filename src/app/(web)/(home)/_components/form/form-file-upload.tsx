"use client";

import FileUploader from "@/components/file-uploader";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { useState } from "react";

type Props = {
  defaultValue: File | null;
  onSelect: (file: File | null) => void;
  onSubmit: () => void;
  onPrevious: () => void;
};

export default function FormFileUpload(props: Props) {
  const [error, setError] = useState<Error | null>(null);
  const [file, setFile] = useState<File | null>(props.defaultValue);

  return (
    <div className="space-y-6">
      <FieldGroup>
        <Field>
          <FieldLabel>Resume Upload</FieldLabel>
          <FieldDescription>
            Upload the resume or CV for this position
          </FieldDescription>

          <div className="border border-dashed rounded-xl">
            <FileUploader
              defaultValue={props.defaultValue}
              onFileSelect={(file) => {
                setError(null);
                setFile(file);
                props.onSelect(file);
              }}
            />
          </div>
          {error && <FieldError errors={[{ message: error.message }]} />}
        </Field>
      </FieldGroup>

      <FieldGroup className="w-full flex flex-row justify-between">
        <Button
          type="button"
          variant="outline"
          onClick={() => props.onPrevious()}
        >
          Previous
        </Button>

        <Button
          type="button"
          onClick={() => {
            if (!file) {
              setError(new Error("Resume file is required"));
              return;
            }

            props.onSubmit();
          }}
        >
          Submit
        </Button>
      </FieldGroup>
    </div>
  );
}
