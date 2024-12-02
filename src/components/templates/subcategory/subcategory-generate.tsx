"use client";
import React from "react";
import { LoadingButton } from "@/components/templates/button/loading-button";
import { api } from "@/trpc/react";
import { toast } from "sonner";

export default function SubCategoryGenerate() {
  const { mutateAsync, isPending } = api.subcategory.generate.useMutation();

  const handleDownload = async () => {
    try {
      await mutateAsync(); // Clean up the URL object
    } catch (error) {
      console.error("Error generating categories:", error);
    }
  };

  const ctx = api.useUtils();
  const upload = api.subcategory.upload.useMutation({
    onSuccess: async () => {
      await ctx.subcategory.byCategoryId.invalidate();
      toast.success("success upload subcategories");
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  return (
    <div className="flex w-full gap-2">
      <LoadingButton
        onClick={handleDownload}
        loading={isPending}
        disabled={isPending}
        className="w-full"
      >
        Generate Subcategory
      </LoadingButton>
      <LoadingButton
        onClick={() => upload.mutate()}
        loading={upload.isPending}
        disabled={upload.isPending}
        className="w-full"
      >
        Upload Subcategory
      </LoadingButton>
    </div>
  );
}
