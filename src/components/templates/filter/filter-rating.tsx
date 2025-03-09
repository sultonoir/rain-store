"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Section } from "@/components/ui/section";
import { Star } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export function FilterRating() {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const rating = searchParams?.get("rating");

  const handleRating = (value: string) => {
    const queryParams = new URLSearchParams(searchParams?.toString());
    queryParams.set("rating", value);
    if (rating) {
      queryParams.delete("rating");
    }
    const path = `${pathname}?${queryParams.toString()}`;
    router.push(path);
  };

  return (
    <Section>
      <p className="text-sm font-bold">Rating</p>
      <div className="flex items-center gap-2">
        <Checkbox
          id="rating"
          checked={rating === "4"}
          onCheckedChange={() => handleRating("4")}
          className="size-5"
        />
        <Label htmlFor="rating" className="inline-flex items-center gap-1">
          <Star className="size-4 fill-yellow-400 text-yellow-400" />
          rating of more than 4
        </Label>
      </div>
    </Section>
  );
}
