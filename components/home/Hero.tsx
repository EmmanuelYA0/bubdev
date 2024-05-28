"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { WordRotating } from "./wordRotating";
import { useRef } from "react";
import gsap from "gsap-trial";
import ScrollSmoother from "gsap-trial/ScrollSmoother";
import ScrollTrigger from "gsap-trial/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { TextTyping } from "./typingText";
import { Button } from "../ui/button";
// import Button from "../Button";

const Hero = () => {
  gsap.registerPlugin(useGSAP, ScrollTrigger, ScrollSmoother);

  const bottle = useRef<HTMLDivElement>(null);
  const smoother = useRef<ScrollSmoother | null>(null);

  const handleScrollToAboutText = () => {
    if (smoother.current) {
      gsap.to(smoother.current, {
        scrollTop: smoother.current.offset(".AboutText", "center center"),
        duration: 2,
        ease: "back.out",
      });
    }
  };

  useGSAP(() => {
    gsap.fromTo(bottle.current, { x: 500 }, { x: 70, duration: 2 });

    smoother.current = ScrollSmoother.create({
      wrapper: "smooth-wrapper",
      content: "smooth-content",
      smooth: 2,
    });

    ScrollTrigger.create({
      trigger: ".AboutText",
      pin: true,
      start: "center center",
      end: "+=500",
    });
  });

  return (
    <>
      <section className=" w-full left-8 h-[900px] mt-56 sm:left-3 md:left-2 lg:left-2 top-40 object-contain static">
        <div className="absolute top-0 -right-5">
          <Image
            src="/rectangle.svg"
            alt=""
            width={500}
            height={590}
            className="hidden lg:flex  top-0 z-10"
          />
        </div>
        {/* left-8 top-40  h-[300px] */}
        <div className="w-[600px] -top-16 h-[500px]">
          <h1 className="text-myblack lg:text-5xl sm:text-4xl text-4xl font-normal text-justify font-['Montserrat'] leading-normal ">
            DECOUVREZ L’ <WordRotating /> DANS
            <span className="text-myblack lg:text-5xl sm:text-4xl text-4xl font-normal text-justify font-['Montserrat'] leading-normal">
              CHAQUE GORGEE
            </span>
          </h1>
          <TextTyping />
          <Link href="/vins">
            <Button className=" bg-[#4A050D] text-lg w-44 h-12 p-2.5 text-white transition-all hover:bg-redhot gap-2.5 inline-flex top-20 left-24">
              Visiter la boutique
            </Button>
          </Link>
          <Button
            onClick={handleScrollToAboutText}
            variant="outline"
            className="z-20 left-96 bg-transparent hover:bg-transparent border-0 top-80"
          >
            <Image
              src="/fleche.svg"
              alt="fleche"
              width={14}
              height={36}
              className=""
            />
          </Button>
        </div>
        <div
          ref={bottle}
          className=" imge left-[552px] top-[-630px] w-[600px] h-[900px] overflow-hidden z-40 object-contain"
        >
          <Image
            src="/hero-bottle.svg"
            alt="bottle-image"
            width={405}
            height={949}
            className=" z-20 bg-transparent drop-shadow-sm left-[-80px] top-[-40px] "
            //
          />
          <Image
            src="/hero-glass.svg"
            alt="glass-image"
            width={391}
            height={511}
            className=" z-20 bg-transparent left-32  top-[-580px]"
            //
          />
        </div>
      </section>
    </>
  );
};
export default Hero;
