"use client";

import { api } from "@/orpc";
import { useSuspenseQuery } from "@tanstack/react-query";

export default function Client() {
  const { data, error } = useSuspenseQuery(api.greet.hello.queryOptions());

  return (
    <div>
      DATA: {data} <br /> ERROR: {error?.message ?? null}
    </div>
  );
}
