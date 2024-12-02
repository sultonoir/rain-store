// Dependencies: npm install @remixicon/react

import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { RiStarFill } from "@remixicon/react";

interface RatingOption {
  stars: number;
  count?: number;
}

interface RatingFilterProps {
  options: RatingOption[];
  value?: string;
  handleRating: (value: string) => void;
}

export function SelectRating({
  options,
  value = "all",
  handleRating,
}: RatingFilterProps) {
  return (
    <RadioGroup value={value} onValueChange={handleRating}>
      {options.map((option) => (
        <div key={String(option.stars)} className="flex items-center gap-2">
          <RadioGroupItem
            value={String(option.stars)}
            id={`radio-${String(option.stars)}`}
          />
          <Label
            htmlFor={`radio-${String(option.stars)}`}
            className="inline-flex w-full items-center gap-1"
            onClick={() => handleRating(String(option.stars))}
          >
            <Stars count={option.stars} />
            <span className="sr-only">{option.stars} stars</span>
            {option.count && (
              <span className="text-xs font-normal leading-[inherit] text-muted-foreground">
                ({option.count})
              </span>
            )}
          </Label>
        </div>
      ))}
    </RadioGroup>
  );
}

export function Stars({ count }: { count: number }) {
  return (
    <span
      className="inline-flex items-center text-amber-500"
      aria-hidden="true"
    >
      {Array.from({ length: 5 }).map((_, i) => (
        <RiStarFill
          key={i}
          size={16}
          className={i < count ? "" : "opacity-30"}
        />
      ))}
    </span>
  );
}
