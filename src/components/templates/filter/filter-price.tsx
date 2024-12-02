"use client";

import { Section } from "@/components/ui/section";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { PriceInput } from "../input/price-input";
import useFilter from "@/hooks/use-filter";

export function FilterPrice() {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();

  const { filter, setFilterValue } = useFilter();

  // State error
  const [err, setErr] = useState("");

  // Handle change for max price
  const handleMaxChange = (value: number) => {
    console.log("Max changed:", value);
    setFilterValue({ max: value });
    if (value <= filter.min) {
      setErr("Max value must not be less than or equal to Min value");
    } else {
      setErr(""); // Clear error if max is valid
    }
  };

  // Handle change for min price
  const handleMinChange = (value: number) => {
    console.log("Min changed:", value);
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
    <Section className="space-y-3">
      <p className="text-sm font-bold">Price</p>
      <form onSubmit={handleSubmit} className="flex items-center gap-5">
        <PriceInput
          value={filter.min}
          onChange={handleMinChange}
          label="Min price"
        />
        <PriceInput
          value={filter.max}
          onChange={handleMaxChange}
          label="Max price"
        />
        {/* Optional: Add a submit button */}
        <button type="submit" className="sr-only hidden" />
      </form>
      {err && <p className="text-xs text-red-600">{err}</p>}
    </Section>
  );
}
