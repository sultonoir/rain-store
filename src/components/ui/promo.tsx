"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
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
import { Button } from "./button";
import Link from "next/link";

const Promo = () => {
  const hero = [
    {
      image: "/promo-1.jpg",
      title: "hero2",
    },
    {
      image: "/promo-2.jpg",
      title: "hero1",
    },
    {
      image: "/promo-3.jpg",
      title: "hero3",
    },
    {
      image: "/promo-4.gif",
      title: "hero4",
    },
    {
      image: "/promo-5.gif",
      title: "hero5",
    },
    {
      image: "/promo-6.jpg",
      title: "hero6",
    },
  ];
  return (
    <>
      <Swiper
        cssMode={true}
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
        className="mySwiper container"
      >
        {hero.map((item) => (
          <SwiperSlide
            className="container relative z-0 overflow-hidden rounded-2xl py-40 lg:py-56"
            key={item.title}
          >
            <Link href="/search" className="absolute inset-0 z-10">
              <Image
                src={item.image}
                alt={item.title}
                fill
                priority
                sizes="100%"
                className="object-contain sm:object-cover"
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
    </>
  );
};

export default Promo;
