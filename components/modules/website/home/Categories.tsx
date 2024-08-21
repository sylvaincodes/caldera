"use client";
import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "./style.css";
import { m } from "framer-motion";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Slide } from "@/types";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { topCategories } from "@/constants/index";
import Container from "@/components/custom/Container";
import Heading from "@/components/custom/Heading";
import Row from "@/components/custom/Row";
import { useRouter } from "next/navigation";

export default function Categories() {
  const [slides, setSlides] = useState<Slide[]>(topCategories);
  const animation = {
    hide: { scale: 0, opacity: 0 },
    show: {
      scale: 1,
      opacity: 1,
    },
  };

  const router = useRouter();

  const handleClick = (link: string) => {
    router.push(link);
  };

  return (
    <m.section
      initial={{ y: 80, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.3, ease: "easeIn", delay: 0.3, type: "tween" }}
      className="mt-10"
    >
      <Container>
        <Row className="mb-10">
          <Heading name="shop by top categories" />
        </Row>
        <Swiper
          breakpoints={{
            // when window width is >= 340
            360: {
              slidesPerView: 1,
              spaceBetween: 40,
            },
            // when window width is >= 768
            575: {
              slidesPerView: 1,
              spaceBetween: 40,
            },

            768: {
              slidesPerView: 2,
              spaceBetween: 40,
            },
            // when window width is >= 1024
            1024: {
              slidesPerView: 3,
              spaceBetween: 40,
            },
            1280: {
              slidesPerView: 3,
              spaceBetween: 40,
            },
            1440: {
              slidesPerView: 4,
              spaceBetween: 100,
            },
            1680: {
              slidesPerView: 4,
              spaceBetween: 100,
            },
          }}
          autoplay={{
            delay: 105000,
            disableOnInteraction: false,
          }}
          spaceBetween={50}
          slidesPerView={1}
          navigation={false}
          pagination={true}
          history={{
            key: "slide",
          }}
          modules={[Autoplay, Navigation, Pagination]}
          className={cn("")}
        >
          {slides &&
            slides.map((item: Slide, idx: number) => (
              <SwiperSlide
                key={idx}
                className="relative [&>button:block] hover:scale-105 duration-300 ease-linear cursor-pointer"
                style={{
                  backgroundImage: `url(${item.image})`,
                  height: "600px",
                  width: "auto",
                  backgroundSize: "cover",
                  backgroundPosition: "top",
                }}
              >
                {item?.title !== "" ? (
                  item.title !== "" && (
                    <div className="absolute bg-white rounded-lg p-4 bottom-10 w-80 shadow-xl cursor-pointer hover:bg-black hover:text-white drop-shadow-xl duration-300 ease-linear">
                      <m.h1
                        initial={animation.hide}
                        whileInView={animation.show}
                        transition={{ delay: 0.3 }}
                        className={cn("text-xl capitalize")}
                        style={{
                          color: `${item.textColor}`,
                        }}
                        onClick={() => handleClick(item.link)}
                      >
                        {item.title}
                      </m.h1>
                    </div>
                  )
                ) : (
                  <div className="flex items-center justify-center">
                    <Button
                      variant="default"
                      size="lg"
                      className="hover:shadow-button px-12 py-8"
                    >
                      <Link href={item.link} className="text-xl">
                        BUY NOW
                      </Link>
                    </Button>
                  </div>
                )}
              </SwiperSlide>
            ))}
        </Swiper>
      </Container>
    </m.section>
  );
}
