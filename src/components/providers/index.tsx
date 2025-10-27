"use client";

import { QueryProvider } from "./query-provider";

export function Providers(props: { children: React.ReactNode }) {
  return <QueryProvider>{props.children}</QueryProvider>;
}
