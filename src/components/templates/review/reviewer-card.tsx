import { Star } from "lucide-react";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { fromNow } from "@/lib/from-now";

interface ReviewCardProps {
  name?: string | null;
  value: number;
  message: string;
  image?: string | null;
  createdAt: Date;
}

export function ReviewCard({
  name,
  value,
  message,
  image,
  createdAt,
}: ReviewCardProps) {
  const now = fromNow(new Date(createdAt));
  return (
    <div className="flex items-center justify-between gap-5 py-4 first:pt-0 last:pb-0">
      <div className="relative size-10 flex-shrink-0 overflow-hidden rounded-full">
        <Image src={image ?? "/avatar.png"} alt="avatar" fill sizes="100%" />
      </div>
      <div className="flex flex-grow flex-col gap-1">
        <p className="text-lg font-semibold">
          {name}
          <span className="ml-2 text-sm text-muted-foreground">{now}</span>
        </p>
        <div className="flex items-center">
          {Array.from({ length: 5 }).map((_, index) => (
            <Star
              key={index}
              className={cn(
                "size-4",
                index < value
                  ? "fill-yellow-400 text-yellow-400"
                  : "fill-muted text-muted",
              )}
            />
          ))}
        </div>
        <p className="text-muted-foreground">{message}</p>
      </div>
    </div>
  );
}
