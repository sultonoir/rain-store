"use client";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, Search, ArrowRight } from "lucide-react";
import React, { useState } from "react";
import { LoadingButton } from "../button/loading-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { SearchRecent } from "../search/search-recent";
import { useSearch } from "@/hooks/useSearch";
import RecomendPagination from "../recommend/recommend-pagination";
export default function SearchMobile() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const hanldeToggle = () => {
    setOpen((prev) => !prev);
  };

  React.useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <>
      <button
        onClick={hanldeToggle}
        className="relative inline-flex h-8 w-full items-center justify-start gap-4 whitespace-nowrap rounded-[0.5rem] border border-input bg-muted/50 px-4 py-2 text-sm font-normal text-muted-foreground shadow-none transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 sm:pr-12 md:hidden [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0"
      >
        <div className="pointer-events-none flex items-center justify-center text-muted-foreground/80 peer-disabled:opacity-50">
          <Search size={16} strokeWidth={2} />
        </div>
        <span className="">Search...</span>
      </button>
      <AnimatePresence>
        {open && <SearchMobileContent close={hanldeToggle} />}
      </AnimatePresence>
    </>
  );
}

interface Props {
  close: () => void;
}

function SearchMobileContent({ close }: Props) {
  const [nameQuery, setNameQuery] = React.useState("");
  const { add } = useSearch();
  const router = useRouter();

  const searchParams = useSearchParams();

  const handelSubumit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const queryParams = new URLSearchParams(searchParams?.toString());
    queryParams.delete("q");
    queryParams.set("q", nameQuery);
    const path = `/search?${queryParams.toString()}`;
    add({
      id: Date().toString(),
      name: nameQuery,
    });
    setNameQuery("");
    close();
    router.push(path);
  };

  React.useLayoutEffect((): (() => void) => {
    const originalStyle: string = window.getComputedStyle(
      document.body,
    ).overflow;
    document.body.style.overflow = "hidden";
    return () => (document.body.style.overflow = originalStyle);
  }, []);

  return (
    <motion.div
      tabIndex={-1}
      initial={{ opacity: 0, y: 20 }} // translateX(-50%) dan translateY(20px)
      animate={{ opacity: 1, y: 0 }} // tetap translateX(-50%) dan translateY(0px)
      exit={{ opacity: 0, y: 20 }} // tetap translateX(-50%) dan translateY(20px)
      transition={{
        duration: 0.5, // durasi transisi
        ease: "easeInOut", // jenis transisi
      }}
      className="fixed inset-0 z-50 w-full transform bg-background"
    >
      <div className="relative size-full space-y-4 overflow-auto p-4 py-16">
        <div className="fixed inset-x-0 top-0 z-50 bg-background p-4">
          <div className="flex items-center gap-4">
            <LoadingButton
              variant="ghost"
              size="icon"
              onClick={close}
              className="size-9"
            >
              <ArrowLeft size={16} />
            </LoadingButton>
            <form onSubmit={handelSubumit} className="w-full">
              <Label htmlFor="input-26" className="sr-only">
                Search
              </Label>
              <div className="relative">
                <Input
                  id="input-26"
                  className="peer h-9 pe-9 ps-9"
                  placeholder="Search..."
                  type="text"
                  value={nameQuery}
                  onChange={(e) => setNameQuery(e.target.value)}
                />
                <div className="pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 text-muted-foreground/80 peer-disabled:opacity-50">
                  <Search size={16} strokeWidth={2} />
                </div>
                <button
                  className="absolute inset-y-0 end-0 flex h-full w-9 items-center justify-center rounded-e-lg text-muted-foreground/80 outline-offset-2 transition-colors hover:text-foreground focus:z-10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-ring/70 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
                  aria-label="Submit search"
                  type="submit"
                >
                  <ArrowRight size={16} strokeWidth={2} aria-hidden="true" />
                </button>
              </div>
            </form>
          </div>
        </div>

        <SearchRecent close={close} />
        <RecomendPagination title="Recommendations Product" />
        <div className="fixed inset-x-0 bottom-0 z-50 bg-background p-4">
          <LoadingButton
            variant="outline"
            size="sm"
            onClick={close}
            className="w-full"
          >
            Close
          </LoadingButton>
        </div>
      </div>
    </motion.div>
  );
}
