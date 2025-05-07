"use client";
import { usePost } from "@/hooks/use-post";
import React from "react";
import { Button } from "./button";
import { BellIcon } from "lucide-react";

const PostLists = () => {
  const { posts } = usePost({ initialPosts: [] });
  return (
    <Button
      size="icon"
      variant="ghost"
      className="relative rounded-full"
      aria-label="notification button"
    >
      <div className="bg-primary text-primary-foreground absolute top-0 -right-1 flex size-5 items-center justify-center rounded-full p-1 text-xs leading-none">
        {posts.length > 99 ? "99" : posts.length}
      </div>
      <BellIcon />
    </Button>
  );
};

export default PostLists;
