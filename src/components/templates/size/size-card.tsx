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
import { LoadingButton } from "../button/loading-button";
import { XIcon } from "lucide-react";
import { toast } from "sonner";
import SizeCreator from "./size-creator";
import SizeGenerate from "./size-generate";
import sizes from "@/lib/sizes";

export default function SizeCard() {
  const { variables, mutate, isPending } = api.size.create.useMutation({
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const handleSubmit = (note: string) => {
    mutate({
      value: note,
    });
  };

  const remove = api.size.remove.useMutation({
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return (
    <Card className="h-fit">
      <CardHeader>
        <CardTitle>Sizes</CardTitle>
        <CardDescription>Build sizes and generate</CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        <SizeCreator addSize={handleSubmit} />
        <p className="text-xl">Sizes</p>
        <AnimatePresence>
          <ul className="flex flex-wrap gap-2">
            {sizes.map((item, index) => (
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
                  {item.value}
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
                className="flex cursor-not-allowed items-center gap-2 rounded-lg border border-border/40 px-3 py-1"
              >
                {variables.value}
              </motion.li>
            )}
          </ul>
        </AnimatePresence>
      </CardContent>
      <CardFooter>
        <SizeGenerate />
      </CardFooter>
    </Card>
  );
}
