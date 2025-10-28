import { cn } from "@/lib/utils";
import { ReactNode } from "react";

type Props = {
  children: ReactNode;
  className?: string;
};

export default function MaxWidthWrapper({ children, className }: Props) {
  return (
    <div className={cn("relative max-w-5xl mx-auto", className)}>
      {children}
    </div>
  );
}
