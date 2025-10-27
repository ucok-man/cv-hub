import { HydrateClient, prefetch } from "@/components/utility";
import { api } from "@/orpc";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import Client from "./client";

export default function HomePage() {
  prefetch(api.greet.hello.queryOptions());

  return (
    <HydrateClient>
      <ErrorBoundary fallback={<div>Oops!</div>}>
        <Suspense fallback={<div>Loading...</div>}>
          <Client />
        </Suspense>
      </ErrorBoundary>
    </HydrateClient>
  );
}
