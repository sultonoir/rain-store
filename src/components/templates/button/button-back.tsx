"use client";
import React from "react";
import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { LoadingButton } from "./loading-button";

export function ButtonBack() {
  const router = useRouter();
  return (
    <LoadingButton
      onClick={() => router.back()}
      variant="secondary"
      startContent={
        <ChevronLeft className="size-4 transition-transform group-hover:-translate-x-1" />
      }
    >
      <span>Go back</span>
    </LoadingButton>
  );
}
