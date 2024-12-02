import * as React from "react";
import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  siblingsCount?: number;
}

export function PaginationState({
  currentPage,
  totalPages,
  onPageChange,
  siblingsCount = 1,
}: PaginationProps) {
  const generatePagesArray = React.useCallback(() => {
    const pages: Array<number | string> = [];

    // Previous Button Logic
    if (currentPage > 1) {
      pages.push(currentPage - 1);
    }

    // First Page
    if (currentPage > 2) {
      pages.unshift(1);
      if (currentPage > 3) {
        pages.push("...");
      }
    }

    // Current Page
    if (!pages.includes(currentPage)) {
      pages.push(currentPage);
    }

    // Next Pages
    for (let i = 1; i <= siblingsCount; i++) {
      if (currentPage + i <= totalPages) {
        pages.push(currentPage + i);
      }
    }

    // Last Page
    if (currentPage < totalPages - 1) {
      if (currentPage < totalPages - 2) {
        pages.push("...");
      }
      pages.push(totalPages);
    }

    return pages;
  }, [currentPage, totalPages, siblingsCount]);

  const pages = generatePagesArray();

  return (
    <nav
      role="navigation"
      aria-label="pagination"
      className="mx-auto flex w-full justify-center"
    >
      <ul className="flex flex-row items-center gap-1">
        <PaginationItem
          onClick={() => currentPage > 1 && onPageChange(currentPage - 1)}
          disabled={currentPage <= 1}
          aria-label="Go to previous page"
        >
          <ChevronLeft className="h-4 w-4" />
          <span className="sr-only">Previous page</span>
        </PaginationItem>

        {pages.map((page, index) => {
          if (page === "...") {
            return (
              <PaginationItem key={`ellipsis-${index}`} disabled>
                <MoreHorizontal className="h-4 w-4" />
                <span className="sr-only">More pages</span>
              </PaginationItem>
            );
          }

          return (
            <PaginationItem
              key={page}
              onClick={() => onPageChange(page as number)}
              isActive={currentPage === page}
              aria-label={`Go to page ${page}`}
              aria-current={currentPage === page ? "page" : undefined}
            >
              {page}
            </PaginationItem>
          );
        })}

        <PaginationItem
          onClick={() =>
            currentPage < totalPages && onPageChange(currentPage + 1)
          }
          disabled={currentPage >= totalPages}
          aria-label="Go to next page"
        >
          <ChevronRight className="h-4 w-4" />
          <span className="sr-only">Next page</span>
        </PaginationItem>
      </ul>
    </nav>
  );
}

interface PaginationItemProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isActive?: boolean;
}

function PaginationItem({
  className,
  isActive,
  ...props
}: PaginationItemProps) {
  return (
    <li>
      <button
        {...props}
        className={cn(
          buttonVariants({
            variant: isActive ? "default" : "outline",
            size: "icon",
          }),
          className,
        )}
      />
    </li>
  );
}
