"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const HomeCategory = () => {
  const [hovered, setHovered] = useState<string | null>(null);
  const fadeInAnimationVariants = {
    initial: {
      opacity: 0,
      y: 100,
    },
    animate: (index: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.05 * index,
      },
    }),
  };
  const lists = [
    {
      name: "shoes",
      alt: "shoes page",
      path: "/products/accessories/shoes",
      bgImage: "/explore1.svg",
      image: "/2.jpg",
      totalProcuts: "155 products",
    },
    {
      name: "t-shirt",
      alt: "t-shirt page",
      path: "/products/t-shirt",
      bgImage: "/explore2.svg",
      image: "/4.jpg",
      totalProcuts: "141 products",
    },
    {
      name: "outwear",
      alt: "outwear page",
      path: "/products/outwear",
      bgImage: "/explore3.svg",
      image: "/3.jpg",
      totalProcuts: "133 products",
    },
    {
      name: "pants",
      alt: "pants page",
      path: "/products/pants",
      bgImage: "/explore4.svg",
      image: "/5.jpg",
      totalProcuts: "142 products",
    },
    {
      name: "shirt",
      alt: "shirt page",
      path: "/products/shirt",
      bgImage: "/explore5.svg",
      image: "/1.jpg",
      totalProcuts: "144 products",
    },
    {
      name: "bag",
      alt: "bag page",
      path: "/products/accessories/bags",
      bgImage: "/explore6.svg",
      image: "/6.jpg",
      totalProcuts: "149 products",
    },
  ];
  return (
    <div className="relative isolate flex flex-col space-y-5">
      <p className="text-2xl font-bold lg:text-4xl">
        Mix & Match your preferred category!
      </p>
      <ul
        className="grid grid-cols-3 lg:grid-cols-6"
        onMouseLeave={() => setHovered(null)}
      >
        {lists.map((list, index) => (
          <motion.li
            className="relative flex max-w-[220px] items-center justify-center"
            key={list.path}
            variants={fadeInAnimationVariants}
            initial="initial"
            whileInView="animate"
            viewport={{
              once: true,
            }}
            custom={index}
          >
            <Link
              className={cn(
                "group flex w-full flex-col items-center justify-center gap-4 p-3 transition dark:text-gray-300 dark:hover:text-gray-100",
              )}
              href={list.path}
              onMouseEnter={() => {
                setHovered(list.name);
              }}
            >
              <Image
                src={list.image}
                alt={list.alt}
                width={150}
                height={150}
                priority
                className="z-10 aspect-square size-full rounded-lg"
              />
              <span className="leading-none capitalize">{list.name}</span>
              {list.name === hovered && (
                <motion.span
                  className="bg-card absolute inset-0 -z-10 rounded-full"
                  style={{ borderRadius: 16 }}
                  layoutId="activeSection"
                  transition={{
                    type: "spring",
                    stiffness: 380,
                    damping: 30,
                  }}
                />
              )}
            </Link>
          </motion.li>
        ))}
      </ul>
    </div>
  );
};

export default HomeCategory;
