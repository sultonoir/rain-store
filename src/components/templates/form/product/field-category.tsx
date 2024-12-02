"use client";

import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import categories from "@/lib/categories";

interface Props {
  value: string;
  setValue: (value: string) => void;
}

export function FieldCategory({ value, setValue }: Props) {
  return (
    <ToggleGroup
      value={value}
      defaultValue={value}
      onValueChange={setValue}
      variant="outline"
      type="single"
      className="flex-wrap justify-start"
    >
      {categories.map((item) => (
        <ToggleGroupItem value={item.id} key={item.id} className="capitalize">
          {item.name}
        </ToggleGroupItem>
      ))}
    </ToggleGroup>
  );
}
