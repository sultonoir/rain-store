import React, { useMemo } from "react";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import subcategory from "@/lib/subcategory";

interface Props {
  id: string;
  value: string;
  setValue: (values: string) => void;
}

const FieldSubcategory = ({ id, value, setValue }: Props) => {
  const subs = useMemo(() => {
    if (!id) return [];
    return subcategory.filter((item) => item.categoryId === id);
  }, [id]);

  return (
    <ToggleGroup
      value={value}
      defaultValue={value}
      onValueChange={setValue}
      variant="outline"
      type="single"
      className="flex-wrap justify-start"
    >
      {subs.map((item) => (
        <ToggleGroupItem value={item.id} key={item.id} className="capitalize">
          {item.name}
        </ToggleGroupItem>
      ))}
    </ToggleGroup>
  );
};

export default FieldSubcategory;
