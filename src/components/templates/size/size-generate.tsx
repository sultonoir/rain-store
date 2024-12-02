"use client";
import React from "react";
import { LoadingButton } from "../button/loading-button";
import { api } from "@/trpc/react";
import { toast } from "sonner";

export default function SizeGenerate() {
  const { mutate, isPending } = api.size.generate.useMutation({
    onError: (err) => {
      toast.error(err.message);
    },
  });

  return (
    <LoadingButton
      loading={isPending}
      disabled={isPending}
      onClick={() => mutate()}
    >
      Geneate Size
    </LoadingButton>
  );
}
