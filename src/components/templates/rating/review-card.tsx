import { Star } from "lucide-react";
import { cn } from "@/lib/utils";
import Image from "next/image";

interface ReviewCardProps {
  name: string;
  value: number;
  message: string;
}

export function ReviewCard({ name, value, message }: ReviewCardProps) {
  return (
    <div className="rounded-lg border bg-card p-6 shadow-sm transition-all hover:shadow-md">
      <div className="mb-3 flex items-center justify-between">
        <div className="flex gap-5">
          <div className="relative size-10 flex-shrink-0 overflow-hidden rounded-full">
            <Image
              src="/avatar-placeholder.png"
              alt="avatar"
              fill
              sizes="100%"
            />
          </div>

          <div className="flex flex-col gap-1">
            <h3 className="text-lg font-semibold">{name}</h3>
            <p className="text-muted-foreground">{message}</p>
          </div>
        </div>

        <div className="flex items-center gap-1">
          {Array.from({ length: 5 }).map((_, index) => (
            <Star
              key={index}
              className={cn(
                "h-5 w-5",
                index < value
                  ? "fill-yellow-400 text-yellow-400"
                  : "fill-muted text-muted",
              )}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
