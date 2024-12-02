"use client";
import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import categories from "@/lib/categories";
import { api } from "@/trpc/react";
import { motion } from "framer-motion";
import { LoadingButton } from "../button/loading-button";
import { XIcon } from "lucide-react";
import SubCategoryCreator from "./subcategory-creator";
import SubCategoryGenerate from "./subcategory-generate";
import { toast } from "sonner";

export default function SubCategoryCard() {
  const [selected, setSelected] = React.useState(categories[0]?.id ?? "");

  const utils = api.useUtils();
  const { data, isLoading } = api.subcategory.byCategoryId.useQuery({
    categoryId: selected,
  });

  const { isPending, variables, mutate } = api.subcategory.post.useMutation({
    onSuccess: (newData) => {
      utils.subcategory.byCategoryId.setData(
        { categoryId: selected },
        (oldData) => {
          if (!oldData) {
            return [newData];
          }
          return [...oldData, newData];
        },
      );
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const handeSumit = (value: string) => {
    mutate({
      name: value,
      category: selected,
    });
  };

  const remove = api.subcategory.removeById.useMutation({
    onSuccess: (newData) => {
      utils.subcategory.byCategoryId.setData(
        { categoryId: selected },
        (oldData) => {
          if (!oldData) {
            return [newData];
          }
          return oldData.filter((item) => item.id !== newData.id);
        },
      );
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle>Sub Categories</CardTitle>
        <CardDescription>Build Subcategory and generate</CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        <SubCategoryCreator addSubCategory={handeSumit} />
        <p className="text-xl">Categories</p>
        <ToggleGroup
          value={selected}
          defaultValue={selected}
          onValueChange={setSelected}
          variant="outline"
          type="single"
          className="flex-wrap justify-start"
        >
          {categories.map((item) => (
            <ToggleGroupItem value={item.id} key={item.id}>
              {item.name}
            </ToggleGroupItem>
          ))}
        </ToggleGroup>
        <p className="text-xl">Sub Categories</p>
        <ul className="flex flex-wrap gap-2">
          {isLoading ? (
            <React.Fragment>
              {Array.from({ length: 8 }).map((_, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, filter: "blur(4px)" }}
                  animate={{ opacity: 1, filter: "blur(0px)" }}
                  exit={{ opacity: 0, filter: "blur(4px)" }}
                  transition={{
                    duration: 0.3,
                    delay: index * 0.05, // delay bertingkat untuk tiap item
                  }}
                  className="h-9 w-[20%] animate-pulse rounded-md bg-muted"
                />
              ))}
            </React.Fragment>
          ) : (
            <>
              {data?.map((item, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, filter: "blur(4px)" }}
                  animate={{ opacity: 1, filter: "blur(0px)" }}
                  exit={{ opacity: 0, filter: "blur(4px)" }}
                  transition={{
                    duration: 0.3,
                    // delay: index * 0.05, // delay bertingkat untuk tiap item
                  }}
                >
                  <LoadingButton
                    variant="outline"
                    disabled={remove.variables?.id === item.id}
                    loading={remove.variables?.id === item.id}
                    onClick={() => remove.mutate({ id: item.id })}
                    endContent={<XIcon className="size-4" />}
                  >
                    {item.name}
                  </LoadingButton>
                </motion.li>
              ))}
              {isPending && (
                <motion.li
                  style={{ opacity: 0.5 }}
                  transition={{
                    duration: 0.2,
                    delay: 0.05, // delay bertingkat untuk tiap item
                  }}
                  className="flex cursor-not-allowed gap-2 rounded-lg border border-border/40 px-3 py-1"
                >
                  {variables.name}
                </motion.li>
              )}
            </>
          )}
        </ul>
      </CardContent>
      <CardFooter>
        <SubCategoryGenerate />
      </CardFooter>
    </Card>
  );
}
