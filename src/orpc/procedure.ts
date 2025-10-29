import { os } from "@orpc/server";
import { PrismaClient } from "@prismagen/client";
import { headers } from "next/headers";
const base = os.$context<{
  headers: Awaited<ReturnType<typeof headers>>;
  db: PrismaClient;
}>();

const withTimer = base.middleware(async ({ next, path }) => {
  const start = Date.now();
  const result = await next();

  const end = Date.now();
  console.log(`[ORPC] ${path.join(".")} took ${end - start}ms to execute`);

  return result;
});

export const pub = base.use(withTimer);
