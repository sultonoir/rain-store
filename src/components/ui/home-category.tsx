"use client";

import Image from "next/image";
import Link from "next/link";
import React from "react";

const HomeCategory = () => {
  const lists = [
    {
      name: "Shoes",
      path: "/products/accessories/shoes",
      bgImage: "/explore1.svg",
      image: "/2.jpg",
      totalProcuts: "155 products",
    },
    {
      name: "T-shirt",
      path: "/products/t-shirt",
      bgImage: "/explore2.svg",
      image: "/4.jpg",
      totalProcuts: "141 products",
    },
    {
      name: "Outwear",
      path: "/products/outwear",
      bgImage: "/explore3.svg",
      image: "/3.jpg",
      totalProcuts: "133 products",
    },
    {
      name: "Pants",
      path: "/products/pants",
      bgImage: "/explore4.svg",
      image: "/5.jpg",
      totalProcuts: "142 products",
    },
    {
      name: "Shirt",
      path: "/products/shirt",
      bgImage: "/explore5.svg",
      image: "/1.jpg",
      totalProcuts: "144 products",
    },
    {
      name: "Bag",
      path: "/products/accessories/bags",
      bgImage: "/explore6.svg",
      image: "/6.jpg",
      totalProcuts: "149 products",
    },
  ];
  return (
    <div className="flex flex-col space-y-5">
      <p className="font-bold ~text-2xl/3xl">
        Mix & Match your preferred category!
      </p>
      <div className="grid grid-cols-3 gap-4 lg:grid-cols-6">
        {lists.map((list) => (
          <Link
            href={list.path}
            key={list.name}
            className="flex flex-col gap-3"
          >
            <Image
              src={list.image}
              alt={list.name}
              width={150}
              height={150}
              priority
              className="aspect-square size-full rounded-lg"
            />
            <p className="text-center">{list.name}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default HomeCategory;
