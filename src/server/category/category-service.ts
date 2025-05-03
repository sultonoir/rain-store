import { db } from "@/server/db";
import { unstable_cache } from "../unstable-chache";

async function queryCategories() {
  return await db.category.findMany({
    include: {
      subcategories: true,
    },
  });
}

export const getCategories = unstable_cache(
  queryCategories,
  ["categories"],
  {
    revalidate: 6000,
  },
);
