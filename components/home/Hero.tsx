"use client";

import React from "react";
import Button from "../Button";
import Image from "next/image";
import Link from "next/link";
import { WordRotating } from "./wordRotating";
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { TextTyping } from "./typingText";

const Hero = () => {
  gsap.registerPlugin(useGSAP);

  const bottle = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.fromTo(bottle.current,
        {x: 500,},
        { x: 70, duration: 2},
        
        );
    },
  ); 

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
          {/* <p className="w-[550px] left-1 top-16 text-myblack text-2xl font-normal font-['Montaga']"> */}
            {/*  */}
            {/* Explorez notre sélection exquise de vins, champagnes et autres
            spiritueux , conçue pour éveiller vos sens et élever chaque moment
            spécial. */}
            <TextTyping/>
          {/* </p> */}
          <Link href="/vins">
            <Button
              type="button"
              title="Visiter la boutique"
              variant="bg-[#4A050D] w-44 h-12 p-2.5 text-white transition-all hover:bg-redhot gap-2.5 inline-flex"
              position="top-28 left-24"
            />
          </Link>
          <Link href="#About">
            <Image
              src="/fleche.svg"
              alt="fleche"
              width={14}
              height={36}
              className=" z-20 bg-transparent left-96 top-80 "
            />
          </Link>
        </div>
        <div ref={bottle} className=" imge left-[552px] top-[-630px] w-[600px] h-[900px] overflow-hidden z-40 object-contain">
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

