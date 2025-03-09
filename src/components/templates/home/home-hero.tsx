import Link from "next/link";
import Image from "next/image";
import { ShoppingBag } from "lucide-react";

export const Hero = () => {
  return (
    <div className="overflow-hidden bg-gray-100 dark:bg-background">
      <div className="mx-auto flex min-h-[80vh] max-w-7xl flex-col px-4 md:flex-row">
        <div className="flex flex-1 flex-col items-center justify-center pt-10 md:items-start md:px-4 md:pt-0">
          <span
            data-aos="fade-down"
            data-aos-delay="200"
            className="mb-2.5 rounded-md bg-primary/20 px-4 py-1 text-sm font-semibold text-primary md:mb-5"
          >
            sale 70%
          </span>
          <h2
            data-aos="fade-right"
            data-aos-delay="300"
            className="mb-5 text-center text-[2.5rem] font-bold leading-tight text-foreground md:text-left md:text-5xl"
          >
            An Industrial Take on Streetwear
          </h2>
          <h3
            data-aos="fade-right"
            data-aos-delay="400"
            className="font-regular mb-5 text-center text-lg leading-tight text-muted-foreground md:mb-10 md:text-left"
          >
            Anyone can beat you but no one can beat your outfit as long as you
            wear Dine outfits.
          </h3>
          <Link
            href={"/"}
            data-aos="fade-up"
            data-aos-delay="500"
            className="mb-10 flex items-center rounded bg-zinc-900 px-8 py-2.5 text-base font-normal text-white shadow-sm shadow-zinc-500"
          >
            <ShoppingBag />
            <span className="ml-2">Start Shopping</span>
          </Link>
          <div
            className="mb-5 flex w-full flex-wrap justify-center md:justify-between"
            data-aos-delay="600"
            data-aos="fade"
          >
            {["bazaar", "bustle", "versace", "instyle"].map((brand, index) => (
              <Image
                priority
                key={index}
                src={`/${brand}.svg`}
                alt={`${brand} brand`}
                width={100}
                height={50}
                className={"mx-4 my-1"}
              />
            ))}
          </div>
        </div>
        <div className="flex flex-1 items-end justify-start">
          <Image
            priority
            src="/hero.webp"
            alt="hero"
            quality={100}
            width={550}
            height={550}
            data-aos="fade-up"
          />
        </div>
      </div>
    </div>
  );
};

export const Promotions = () => {
  return (
    <div className="bg-accent">
      <div className="mx-auto flex flex-col items-center px-4 py-10 md:container">
        <span className="mb-4 text-sm font-bold uppercase text-violet-700 dark:text-white">
          Promotions
        </span>
        <h2 className="mb-6 text-center text-3xl font-bold text-black dark:text-white md:text-4xl">
          Our Promotions Events
        </h2>
        <div className="grid w-full max-w-[1150px] gap-3 md:grid-cols-4">
          <Link href="/" className="relative col-span-2">
            <Image src="/promo-banner-1.webp" fill alt="promo banner 1 image" />
          </Link>
          <Link href="/" className="relative row-span-2">
            <Image src="/promo-banner-2.webp" fill alt="promo banner 2 image" />
          </Link>
          <Link href="/" className="relative row-span-2">
            <Image
              src="/promo-banner-3.webp"
              width={400}
              height={200}
              alt="promo banner 3 image"
            />
          </Link>
          <Link href="/" className="relative col-span-2">
            <Image src="/promo-banner-4.webp" fill alt="promo banner 4 image" />
          </Link>
        </div>
      </div>
    </div>
  );
};
