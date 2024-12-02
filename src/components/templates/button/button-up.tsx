"use client";
import { Button } from "@/components/ui/button";
import { ChevronUp } from "lucide-react";
import React from "react";

export default function ButtonUP() {
  const handleUp = () => {
    // Scroll to top smoothly when page changes
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  return (
    <div className="fixed bottom-20 right-10 z-[100]">
      <Button onClick={handleUp} size="icon" className="rounded-full">
        <ChevronUp />
      </Button>
    </div>
  );
}
