/* eslint-disable @next/next/no-img-element */
"use client";

import { cn, formatSize } from "@/lib/utils";
import { X } from "lucide-react";
import { useCallback, useState } from "react";
import { FileRejection, useDropzone } from "react-dropzone";
import { toast } from "sonner";

type FileUploaderProps = {
  onFileSelect?: (file: File | null) => void;
  defaultValue: File | null;
};

const MAX_FILE_SIZE = 16 * 1024 * 1024; // 16MB in bytes

export default function FileUploader({
  onFileSelect,
  defaultValue,
}: FileUploaderProps) {
  const [selectedFile, setSelectedFile] = useState<File | null>(defaultValue);

  const onDrop = useCallback(
    (acceptedFiles: File[], rejectedFiles: FileRejection[]) => {
      if (rejectedFiles.length) {
        const error = rejectedFiles[0].errors.at(0);
        toast.error("Oops! check your file", {
          description: error?.message ?? "Something went wrong",
        });
        return;
      }

      const file = acceptedFiles[0] || null;
      setSelectedFile(file);
      onFileSelect?.(file);
    },
    [onFileSelect]
  );

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    multiple: false,
    accept: { "application/pdf": [".pdf"] },
    maxSize: MAX_FILE_SIZE,
  });

  const handleRemoveFile = (e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedFile(null);
    onFileSelect?.(null);
  };

  return (
    <div
      {...getRootProps()}
      className={cn("relative rounded-lg cursor-pointer")}
    >
      <input {...getInputProps()} />

      {selectedFile ? (
        <UploadedFileDisplay file={selectedFile} onRemove={handleRemoveFile} />
      ) : (
        <EmptyState maxFileSize={MAX_FILE_SIZE} />
      )}
    </div>
  );
}

type UploadedFileDisplayProps = {
  file: File;
  onRemove: (e: React.MouseEvent) => void;
};

const UploadedFileDisplay = ({ file, onRemove }: UploadedFileDisplayProps) => (
  <div
    className="flex flex-col items-center justify-center gap-2 p-8 text-center"
    onClick={(e) => e.stopPropagation()}
  >
    <div className="rounded-full bg-muted p-3 relative">
      <img src="/images/pdf.png" alt="upload" className="size-12" />

      <div className="absolute top-0 right-0">
        <button
          type="button"
          onClick={onRemove}
          className="shrink-0 rounded-md p-1.5 text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
          aria-label="Remove file"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>

    <div className="space-y-1">
      <p className="text-sm max-w-[280px] font-medium text-foreground truncate">
        {file.name}
      </p>
      <p className="text-xs text-muted-foreground">{formatSize(file.size)}</p>
    </div>
  </div>
);

type EmptyStateProps = {
  maxFileSize: number;
};

const EmptyState = ({ maxFileSize }: EmptyStateProps) => (
  <div className="flex flex-col items-center justify-center gap-2 p-8 text-center">
    <div className="rounded-full bg-muted p-3">
      <img src="/icons/info.svg" alt="upload" className="size-12" />
    </div>

    <div className="space-y-1">
      <p className="text-sm font-medium text-foreground">
        <span className="text-primary">Click to upload</span> or drag and drop
      </p>
      <p className="text-xs text-muted-foreground">
        PDF (max {formatSize(maxFileSize)})
      </p>
    </div>
  </div>
);
