"use client";

import { PlaceholdersAndVanishInput } from "@/components/ui/placehorders-and-vanish-input";
import { useSearch } from "@/hooks/useSearch";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import useCreateQueryString from "@/hooks/useCreateQueryString";
import { SearchRecent } from "../search/search-recent";
import { useDialogSearch } from "@/hooks/use-dialog-search";
import { useOutsideClick } from "@/hooks/use-outside-click";

export function SearchInput() {
  const { active, setActive } = useDialogSearch();
  const [inputvalue, setInputvalue] = useState("");
  const placeholders = ["T-Shirt", "Shirt", "Pants", "Shoes", "Bag"];
  const router = useRouter();
  const { add } = useSearch();
  const ref = useRef<HTMLDivElement | null>(null);

  const createQueryString = useCreateQueryString("q", inputvalue);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputvalue(e.target.value);
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    add({
      id: new Date().getTime().toString(),
      name: inputvalue,
    });
    setActive(false);
    router.push("/search" + "?" + createQueryString);
  };

  function handleOnClick(event: MouseEvent | TouchEvent) {
    if (ref.current && !event.composedPath().includes(ref.current)) {
      setActive(false);
    }
  }

  useOutsideClick(ref, handleOnClick);

  return (
    <div
      className="relative hidden flex-grow md:flex"
      onClick={() => setActive(true)}
      ref={ref}
    >
      <PlaceholdersAndVanishInput
        placeholders={placeholders}
        onChange={handleChange}
        onSubmit={onSubmit}
      />
      <AnimatePresence>
        {active && (
          <motion.div
            initial={{ opacity: 0, y: 20, x: "-50%" }} // translateX(-50%) dan translateY(20px)
            animate={{ opacity: 1, y: 0, x: "-50%" }} // tetap translateX(-50%) dan translateY(0px)
            exit={{ opacity: 0, y: 20, x: "-50%" }} // tetap translateX(-50%) dan translateY(20px)
            transition={{
              duration: 0.5, // durasi transisi
              ease: "easeInOut", // jenis transisi
            }}
            className="absolute left-1/2 top-[calc(100%_+_0rem)] z-[60] w-full transform"
          >
            <div className="mt-2 h-max rounded-lg border bg-background p-2">
              <div className="space-y-2">
                <SearchRecent close={() => setActive(false)} />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
