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
import { api } from "@/trpc/react";
import { motion, AnimatePresence } from "framer-motion";
import CategoryCreator from "./category-creator";
import { LoadingButton } from "../button/loading-button";
import { XIcon } from "lucide-react";
import { toast } from "sonner";
import CategoryGenerate from "./category-generate";

export default function CategoryCard() {
  const utils = api.useUtils();
  const { data, isLoading } = api.category.getall.useQuery();

  const { variables, mutate, isPending } = api.category.post.useMutation({
    onSuccess: (newData) => {
      utils.category.getall.setData(undefined, (oldData) => {
        if (!oldData) {
          return [];
        }

        return [...oldData, { id: newData.id, name: newData.name }];
      });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const handleSubmit = (note: string) => {
    mutate({
      name: note,
    });
  };

  const remove = api.category.remove.useMutation({
    onSuccess: (newData) => {
      utils.category.getall.setData(undefined, (oldData) => {
        if (!oldData) {
          return [];
        }
        return oldData.filter((item) => item.id !== newData.id);
      });
    },
  });

  return (
    <Card className="h-fit">
      <CardHeader>
        <CardTitle>Categories</CardTitle>
        <CardDescription>Build categories and generate</CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        <CategoryCreator addCategory={handleSubmit} />
        <p className="text-xl">Categories</p>
        <AnimatePresence>
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
        </AnimatePresence>
      </CardContent>
      <CardFooter>
        <CategoryGenerate />
      </CardFooter>
    </Card>
  );
}
