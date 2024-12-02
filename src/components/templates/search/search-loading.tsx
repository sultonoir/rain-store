"use client";

import { useEffect } from "react";

export function SearchLoading() {
  useEffect(() => {
    // Menonaktifkan scroll saat komponen dimuat
    document.body.style.overflow = "hidden";

    // Mengembalikan scroll ke normal saat komponen di-unmount
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <div className="fixed inset-0 z-50 backdrop-blur-sm">
      <div className="fixed left-1/2 top-1/2 translate-x-0 translate-y-1/2">
        <div className="flex items-center justify-center space-x-2">
          <div className="size-3.5 animate-bounce rounded-full bg-current [animation-delay:-0.3s]"></div>
          <div className="size-3.5 animate-bounce rounded-full bg-current [animation-delay:-0.13s]"></div>
          <div className="size-3.5 animate-bounce rounded-full bg-current"></div>
        </div>
      </div>
    </div>
  );
}
