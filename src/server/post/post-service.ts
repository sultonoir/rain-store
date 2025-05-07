"use server";
import { action } from "@/lib/safe-action";
import { db } from "../db";
import { unstable_cache } from "../unstable-chache";
import { z } from "zod";
import { supabase } from "@/lib/supabase/client";

export const getPosts = unstable_cache(
  async () => {
    return await db.post.findMany();
  },
  ["posts"],
  {
    revalidate: 60 * 60 * 2,
  },
);

const schema = z.object({
  name: z.string(),
});

export const createPost = action
  .metadata({ actionName: "createpost" })
  .schema(schema)
  .action(async ({ parsedInput: { name } }) => {
    const post = await db.post.create({
      data: {
        name,
      },
    });

    await supabase.channel("posts").send({
      type: "broadcast",
      event: "message",
      payload: post,
    });
  });
