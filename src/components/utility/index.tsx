import { createQueryClient } from "@/orpc/query-client";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { cache } from "react";

const client = cache(createQueryClient);

export function HydrateClient(props: { children: React.ReactNode }) {
  const queryClient = client();

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      {props.children}
    </HydrationBoundary>
  );
}

export function prefetch<T extends { queryKey: readonly unknown[] }>(
  queryOptions: T
) {
  const queryClient = client();
  return queryClient.prefetchQuery(queryOptions);
}
