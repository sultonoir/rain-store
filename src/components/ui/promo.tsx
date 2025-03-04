"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

// import required modules
import {
  Navigation,
  Pagination,
  Mousewheel,
  Keyboard,
  Autoplay,
} from "swiper/modules";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { type Promo } from "@prisma/client";
import { Image } from "@unpic/react/nextjs";

interface PromoHeroProps {
  hero: Promo[];
}

const Promo = ({ hero }: PromoHeroProps) => {
  return (
    <Swiper
      loop={true}
      navigation={{
        prevEl: ".swiper-button-prev",
        nextEl: ".swiper-button-next",
      }}
      autoplay={{
        delay: 2500,
        disableOnInteraction: false,
      }}
      pagination={{
        clickable: true,
      }}
      mousewheel={true}
      keyboard={true}
      modules={[Navigation, Pagination, Mousewheel, Keyboard, Autoplay]}
      className="container relative z-0 max-w-[1028px] overflow-hidden rounded-2xl"
    >
      {hero.map((item, index) => (
        <SwiperSlide className="relative z-0" key={item.id}>
          <Link aria-label={item.title} href={`promotions/${item.slug}`}>
            <Image
              src={item.image}
              alt={item.title}
              priority={index === 0}
              className="object-cover"
              width={1028}
              height={400}
              layout="constrained"
            />
          </Link>
        </SwiperSlide>
      ))}
      <Button
        size="icon"
        aria-label="button slide left"
        className="swiper-button-prev absolute left-2 top-1/2 z-10 -translate-y-1/2 cursor-pointer rounded-full bg-accent/40 backdrop-blur-lg hover:bg-accent/50"
      >
        <ChevronLeft size={20} />
      </Button>
      <Button
        size="icon"
        aria-label="button slide right"
        className="swiper-button-next absolute right-2 top-1/2 z-10 -translate-y-1/2 cursor-pointer rounded-full bg-accent/40 backdrop-blur-lg hover:bg-accent/50"
      >
        <ChevronRight size={20} />
      </Button>
    </Swiper>
  );
};

export default Promo;
