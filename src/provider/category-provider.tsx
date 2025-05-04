"use client";

import { Category, Subcategory } from "@prisma/client";
import { createContext, useContext, ReactNode } from "react";

interface Categories extends Category {
  subcategories: Subcategory[];
}

type CategoryContextType = {
  categoriesPromise: Promise<Categories[]>;
};

const CategoryContext = createContext<CategoryContextType | null>(null);

export function useCategory(): CategoryContextType {
  const context = useContext(CategoryContext);
  if (context === null) {
    throw new Error("useCategory must be used within a CategoryProvider");
  }
  return context;
}

export function CategoryProvider({
  children,
  categoriesPromise,
}: {
  children: ReactNode;
  categoriesPromise: Promise<Categories[]>;
}) {
  return (
    <CategoryContext.Provider value={{ categoriesPromise }}>
      {children}
    </CategoryContext.Provider>
  );
}
