"use client";
import { supabase } from "@/lib/supabase/client";
import type { Post } from "@prisma/client";
import { useCallback, useEffect, useState } from "react";

export const usePost = ({ initialPosts }: { initialPosts: Post[] }) => {
  const [posts, setPosts] = useState(initialPosts);

  const created = useCallback(
    (newPost: Post) => {
      setPosts([...posts, newPost]);
    },
    [posts],
  );

  const remove = useCallback(
    (newPost: Post) => {
      setPosts(posts.filter((post) => post.id !== newPost.id));
    },
    [posts],
  );

  const edit = useCallback(
    (updatedPost: Post) => {
      setPosts(
        posts.map((post) => (post.id === updatedPost.id ? updatedPost : post)),
      );
    },
    [posts],
  );

  useEffect(() => {
    const channel = supabase
      .channel("posts")
      .on("broadcast", { event: "message" }, (payload) => {
        created(payload.payload as Post);
      })
      .on("broadcast", { event: "remove" }, (payload) => {
        remove(payload.payload as Post);
      })
      .on("broadcast", { event: "edit" }, (payload) => {
        edit(payload.payload as Post);
      })
      .subscribe();

    return () => {
      void supabase.removeChannel(channel);
    };
  }, [created, remove, edit]);

  return { posts };
};
