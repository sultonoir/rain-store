"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useFilter } from "@/hooks/use-filter";
import { PriceInput } from "../ui/price-input";
import { SidebarGroup, SidebarGroupLabel } from "@/components/ui/sidebar";

function FilterPrice() {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();

  const { filter, setFilterValue } = useFilter();

  // Handle change for max price
  const handleMaxChange = (value: number) => {
    setFilterValue({ max: value });
  };

  // Handle change for min price
  const handleMinChange = (value: number) => {
    setFilterValue({ min: value });
  };

  // Handle Submit
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevent default form submission behavior

    const queryParams = new URLSearchParams(searchParams?.toString());

    // Menambahkan min dan max hanya jika nilainya bukan 0
    if (filter.min !== 0) {
      queryParams.delete("min");
      queryParams.set("min", String(filter.min));
    }
    if (filter.max !== 0) {
      queryParams.delete("max");
      queryParams.set("max", String(filter.max));
    }

    // Reset filter values after submit
    setFilterValue({ min: 0, max: 0 });

    const path = `${pathname}?${queryParams.toString()}`;
    console.log("Redirecting to:", path); // Check the final URL
    router.push(path);
  };

  return (
    <SidebarGroup className="pt-0">
      <SidebarGroupLabel className="text-sm font-bold">Price</SidebarGroupLabel>
      <form onSubmit={handleSubmit} className="flex items-center gap-5">
        <PriceInput
          value={filter.min}
          onChange={handleMinChange}
          placeholder="Min price"
          label="Min price"
        />
        <PriceInput
          value={filter.max}
          onChange={handleMaxChange}
          label="Max price"
          placeholder="Max price"
        />
        {/* Optional: Add a submit button */}
        <button type="submit" className="sr-only hidden" />
      </form>
    </SidebarGroup>
  );
}

export default FilterPrice;
