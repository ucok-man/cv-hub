import { pub } from "../procedure";

export const greeRouter = {
  hello: pub.handler(async ({ context }) => {
    await context.db.document.count();
    await new Promise((res) => setTimeout(res, 2000));
    return "Hello, World!";
    // throw new ORPCError("NOT_IMPLEMENTED", {
    //   message: "Uhuy!!!",
    // });
  }),
};
