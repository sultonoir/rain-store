import { useSearch } from "@/hooks/useSearch";
import React from "react";
import { useStore } from "zustand";
import { LoadingButton } from "../button/loading-button";
import Link from "next/link";

interface Props {
  close: () => void;
}

export function SearchRecent({ close }: Props) {
  const search = useStore(useSearch, (state) => state.search);
  const { remove } = useSearch();
  return (
    <>
      {search && search.length > 0 && (
        <div className="space-y-2 rounded-sm bg-accent/60 p-2">
          <div className="flex items-center justify-between">
            <p className="text-lg capitalize">previous search :</p>
            <LoadingButton onClick={remove} variant="link">
              Remove all
            </LoadingButton>
          </div>
          <div className="flex flex-wrap gap-1">
            {search?.map((item) => (
              <Link
                href={{
                  pathname: "/search",
                  query: {
                    q: item.name,
                  },
                }}
                key={item.id}
                onClick={(e) => {
                  e.stopPropagation();
                  close();
                }}
                className="relative flex select-none items-center rounded-sm border px-2 py-1.5 text-sm outline-none hover:bg-accent"
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
