import { createTRPCRouter } from "../init";

import { messageRouter } from "@/modules/messages/procedures";

export const appRouter = createTRPCRouter({
  messages: messageRouter,
});

export type AppRouter = typeof appRouter;
