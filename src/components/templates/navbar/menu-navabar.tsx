"use client";
import React from "react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";
import { categories } from "@/lib/constants";
import Link from "next/link";
import { useIsMobile } from "@/hooks/use-mobile";
import { MenuNavbarMobile } from "./menu-navbar-mobile";
import { stringToPathname } from "@/lib/pathname";
import { FilterMobileButton } from "../filter/filter-mobile";
import { SortCombobox } from "@/components/ui/sort-combobox";
import { useShow } from "@/hooks/use-show";

type Props = React.HTMLAttributes<HTMLDivElement>;

export const MenuNavbar = ({ className }: Props) => {
  const show = useShow();
  const isMobile = useIsMobile();

  if (isMobile) {
    return <MenuNavbarMobile />;
  }

  return (
    <div className="flex items-center justify-between">
      <NavigationMenu>
        <NavigationMenuList
          className={cn("flex-wrap justify-start", className)}
        >
          {categories.map((category) => (
            <NavigationMenuItem key={category.id}>
              <NavigationMenuTrigger className="bg-transparent capitalize">
                {category.name}
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid gap-3 p-6 md:w-[400px] lg:w-max lg:grid-cols-2">
                  <li className="col-span-1">
                    <NavigationMenuLink asChild>
                      <Link
                        className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                        href={`/p/${category.name}`}
                      >
                        <div className="mb-2 mt-4 text-lg font-medium capitalize">
                          {category.name}
                        </div>
                        <p className="text-sm leading-tight text-muted-foreground">
                          {category.description}
                        </p>
                      </Link>
                    </NavigationMenuLink>
                  </li>
                  <li className="col-span-1 grid grid-cols-1">
                    {category.subcategories.map((sub) => (
                      <NavigationMenuLink asChild key={sub.id}>
                        <Link
                          href={`/p/${category.name}/${stringToPathname(sub.name)}`}
                          className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                        >
                          <div className="text-sm font-medium capitalize leading-none">
                            {sub.name}
                          </div>
                          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                            {sub.description}
                          </p>
                        </Link>
                      </NavigationMenuLink>
                    ))}
                  </li>
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
          ))}
        </NavigationMenuList>
      </NavigationMenu>
      <div
        className={cn("flex items-center gap-2 md:hidden", {
          hidden: show,
        })}
      >
        <FilterMobileButton />
        <div className="lg:hidden">
          <SortCombobox />
        </div>
      </div>
    </div>
  );
};
