import { Hiws } from "@/lib/constants";
import Image from "next/image";
import React from "react";
import { Badge } from "./badge";

export default function Flow() {
  return (
    <div className="border-b border-t border-slate-200 py-24 dark:border-slate-700 lg:py-32">
      <div className="relative grid gap-10 sm:grid-cols-2 sm:gap-16 lg:grid-cols-4 xl:gap-20">
        <Image
          src="/VectorHIW.be5444ab.svg"
          alt="vector background"
          className="absolute inset-x-0 top-5 hidden md:block"
          width={1431}
          height={105}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        {Hiws.map((item) => (
          <div
            key={item.title}
            className="relative mx-auto flex max-w-xs flex-col items-center"
          >
            <div className="mx-auto mb-4 max-w-[140px] rounded-full bg-slate-50 p-2 sm:mb-10">
              <Image
                src={`${item.image}`}
                alt="hiw1"
                width={450}
                height={450}
                className="bg-blend-color-burn"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </div>
            <div className="mt-auto space-y-5 text-center">
              <Badge variant={item.type}>{item.step}</Badge>
              <h3 className="text-base font-semibold">{item.title}</h3>
              <span className="block text-sm leading-6 text-slate-600 dark:text-slate-400">
                {item.desc}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
