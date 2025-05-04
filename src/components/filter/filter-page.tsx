import { type SearchProductsClient } from "@/types";
import FilterHeader from "../filter/filter-header";
import ProductCard from "../product/product-card";
import { use } from "react";
import { searchProducts } from "@/server/product/products-service";
import PaginateWithLink from "../ui/paginate-with-link";

export default function FilterPage({
  searchParams,
  title,
  params,
}: SearchProductsClient) {
  const results = use(
    searchProducts({
      ...searchParams,
      category: params.category,
      subcategory: params.subcategory,
      take: 12,
    }),
  );

  return (
    <main className="flex min-h-[calc(100dvh-130px)] w-full flex-col gap-5 p-5">
      <FilterHeader
        found={results.found}
        title={title}
        count={results.totalProduct}
      />
      <div className="mb-4 grid grid-cols-2 gap-5 md:grid-cols-3 xl:grid-cols-4">
        {results.products.map((item) => (
          <ProductCard key={item.id} product={item} />
        ))}
      </div>
      <PaginateWithLink
        currentPage={parseInt(searchParams.page ?? "1")}
        totalPages={Math.ceil(results.totalProduct / 12)}
      />
    </main>
  );
}
