"use client";

import { use, useState } from "react";
import { useTheme } from "next-themes";
import Link from "next/link";
import { cn } from "@/lib/utils";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Button } from "@/components/ui/button";
import {
  LayoutDashboard,
  ChevronRight,
  Monitor,
  Moon,
  Sun,
} from "lucide-react";
import { useCategory } from "@/provider/category-provider";

export function MenuCategories() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="rounded-full"
          aria-label="button open categories"
        >
          <LayoutDashboard />
        </Button>
      </SheetTrigger>
      <SheetContent className="w-full sm:max-w-full" close>
        <SheetHeader>
          <SheetTitle>Categories</SheetTitle>
          <SheetDescription className="sr-only">
            Select Categories
          </SheetDescription>
        </SheetHeader>
        <CategoryMenu closeMenu={() => setIsOpen(false)} />
      </SheetContent>
    </Sheet>
  );
}

function CategoryMenu({ closeMenu }: { closeMenu: () => void }) {
  const { categoriesPromise } = useCategory();
  const categories = use(categoriesPromise);
  const [openCategoryId, setOpenCategoryId] = useState<string | null>(null);

  const toggleCategory = (categoryId: string | null) => {
    setOpenCategoryId((prev) => (prev === categoryId ? null : categoryId));
  };

  return (
    <div className="flex flex-col divide-y px-4">
      {categories.map((category) => (
        <CategoryItem
          key={category.id}
          category={category}
          isOpen={openCategoryId === category.id}
          toggle={() => toggleCategory(category.id)}
          closeMenu={closeMenu}
        />
      ))}
      <DarkModeSwitcher
        isOpen={openCategoryId === "darkmode"}
        toggle={() => toggleCategory("darkmode")}
      />
    </div>
  );
}

function CategoryItem({
  category,
  isOpen,
  toggle,
  closeMenu,
}: {
  category: {
    id: string;
    name: string;
    slug: string;
    subcategories: { id: string; name: string; slug: string }[];
  };
  isOpen: boolean;
  toggle: () => void;
  closeMenu: () => void;
}) {
  return (
    <Collapsible
      open={isOpen}
      onOpenChange={toggle}
      className="group/collapsible"
    >
      <div className="my-2 flex items-center justify-between">
        <Link
          prefetch
          href={`/products/${category.slug}`}
          className="capitalize"
          onClick={closeMenu}
        >
          {category.name}
        </Link>
        <CollapsibleTrigger asChild>
          <Button variant="ghost" size="sm">
            <ChevronRight
              className={cn("size-4 transition-transform duration-200", {
                "rotate-90": isOpen,
              })}
            />
            <span className="sr-only">Toggle</span>
          </Button>
        </CollapsibleTrigger>
      </div>
      <CollapsibleContent className="my-2">
        <div className="flex flex-col space-y-3 px-2.5">
          {category.subcategories.map((sub) => (
            <SubcategoryItem
              key={sub.id}
              categoryName={category.slug}
              subcategory={sub}
              closeMenu={closeMenu}
            />
          ))}
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
}

function SubcategoryItem({
  categoryName,
  subcategory,
  closeMenu,
}: {
  categoryName: string;
  subcategory: { id: string; name: string; slug: string };
  closeMenu: () => void;
}) {
  return (
    <div className="hover:bg-accent flex items-center justify-between rounded-lg px-2 py-1">
      <Link
        prefetch
        href={`/products/${categoryName}/${subcategory.slug}`}
        className="text-muted-foreground w-full text-base font-normal capitalize"
        onClick={closeMenu}
      >
        {subcategory.name}
      </Link>
    </div>
  );
}

function DarkModeSwitcher({
  isOpen,
  toggle,
}: {
  isOpen: boolean;
  toggle: () => void;
}) {
  const { setTheme } = useTheme();

  return (
    <Collapsible open={isOpen} onOpenChange={toggle} className="space-y-2">
      <CollapsibleTrigger className="my-2 flex w-full items-center justify-between">
        Dark mode
        <ChevronRight
          className={cn("mr-3 size-4 transition-transform duration-200", {
            "rotate-90": isOpen,
          })}
        />
        <span className="sr-only">Toggle</span>
      </CollapsibleTrigger>
      <CollapsibleContent className="space-y-2">
        <ThemeButton
          label="Dark"
          icon={<Moon size={16} />}
          onClick={() => setTheme("dark")}
        />
        <ThemeButton
          label="Light"
          icon={<Sun size={16} />}
          onClick={() => setTheme("light")}
        />
        <ThemeButton
          label="System"
          icon={<Monitor size={16} />}
          onClick={() => setTheme("system")}
        />
      </CollapsibleContent>
    </Collapsible>
  );
}

function ThemeButton({
  label,
  icon,
  onClick,
}: {
  label: string;
  icon: React.ReactNode;
  onClick: () => void;
}) {
  return (
    <Button
      variant="ghost"
      size="sm"
      className="w-full justify-start"
      onClick={onClick}
    >
      {icon}
      {label}
    </Button>
  );
}
