"use client";
import React, { use } from "react";
import { ChevronRight } from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useCategory } from "@/provider/category-provider";

const FilterCategory = () => {
  const { categoriesPromise } = useCategory();
  const categories = use(categoriesPromise);
  const { subcategory, category } = useParams<{
    category: string;
    subcategory: string;
  }>();

  return (
    <SidebarGroup className="pt-0">
      <SidebarGroupLabel className="text-sm font-bold">
        Categories
      </SidebarGroupLabel>
      <SidebarMenu>
        {categories.map((item) => (
          <Collapsible
            key={`${item.id}-${category}`}
            asChild
            defaultOpen={item.slug === category}
          >
            <SidebarMenuItem>
              <SidebarMenuButton asChild tooltip={item.name}>
                <Link prefetch={true} href={`/products/${item.slug}`}>
                  <span className="capitalize">{item.name}</span>
                </Link>
              </SidebarMenuButton>
              <CollapsibleTrigger asChild>
                <SidebarMenuAction className="data-[state=open]:rotate-90">
                  <ChevronRight />
                  <span className="sr-only">Toggle</span>
                </SidebarMenuAction>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <SidebarMenuSub>
                  {item.subcategories.map((subItem) => (
                    <SidebarMenuSubItem key={subItem.id}>
                      <SidebarMenuSubButton
                        asChild
                        isActive={subItem.slug === subcategory}
                      >
                        <Link href={`/products/${item.slug}/${subItem.slug}`}>
                          <span className="capitalize">{subItem.name}</span>
                        </Link>
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                  ))}
                </SidebarMenuSub>
              </CollapsibleContent>
            </SidebarMenuItem>
          </Collapsible>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
};

export default FilterCategory;
