import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { createClient } from "@/lib/supabase/client";

const supabase = createClient();

export const postRouter = createTRPCRouter({
  hello: publicProcedure
    .input(z.object({ text: z.string() }))
    .query(({ input }) => {
      return {
        greeting: `Hello ${input.text}`,
      };
    }),

  create: publicProcedure
    .input(z.object({ name: z.string().min(1) }))
    .mutation(async ({ ctx, input }) => {
      const post = await ctx.db.post.create({
        data: {
          name: input.name,
        },
      });
      await supabase.channel("posts").send({
        type: "broadcast",
        event: "message",
        payload: post,
      });
    }),

  getLatest: publicProcedure.query(async ({ ctx }) => {
    const post = await ctx.db.post.findFirst({
      orderBy: { createdAt: "desc" },
    });

    return post ?? null;
  }),

  getAll: publicProcedure.query(async ({ ctx }) => ctx.db.post.findMany()),

  remove: publicProcedure
    .input(z.object({ id: z.number() }))
    .mutation(async ({ ctx, input }) => {
      const post = await ctx.db.post.delete({
        where: {
          id: input.id,
        },
      });

      await supabase.channel("posts").send({
        type: "broadcast",
        event: "remove",
        payload: post,
      });
    }),

  edit: publicProcedure
    .input(z.object({ id: z.number(), name: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const post = await ctx.db.post.update({
        where: {
          id: input.id,
        },
        data: {
          name: input.name,
        },
      });

      await supabase.channel("posts").send({
        type: "broadcast",
        event: "edit",
        payload: post,
      });
    }),
});
