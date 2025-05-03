import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Logo = ({ className }: React.ComponentProps<"a">) => {
  return (
    <Link
      href="/"
      className={cn(
        "inline-flex w-fit items-center ring-0 outline-none",
        className,
      )}
    >
      <Image src="/logo.png" height={40} width={40} alt="logo" priority />
      <p className="hidden text-lg font-bold lg:block">Rizal Official</p>
    </Link>
  );
};

export default Logo;
