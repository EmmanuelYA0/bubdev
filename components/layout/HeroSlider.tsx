import Image from 'next/image'
import React from 'react'
import { Splide, SplideSlide, SplideTrack } from 'react-splide-ts'
import "@splidejs/react-splide/css";

export default function HeroSlider() {
  return (
    <div className=" w-full left-0 mb-0 right-0 mt-28">
        <Splide
          options={{
            type: "loop",
            gap: 15,
            autoplay: true,
            perPage: 1,
            pauseOnHover: false,
            resetProgress: false,
            arrows: false,
            pagination: false,
          }}
          hasTrack={ false }
        >
          <SplideTrack>
            <SplideSlide>
              <Image
                src="/bgs/bg-vins.jpg"
                alt=""
                width={900}
                height={525}
                className=" object-cover w-full h-[520px] rounded-sm"
              />
            </SplideSlide>
            <SplideSlide>
              <Image
                src="/bgs/bg-spiritueux.jpg"
                alt=""
                width={900}
                height={525}
                className=" object-cover w-full h-[520px] rounded-sm"
              />
            </SplideSlide>
            <SplideSlide>
              <Image
                src="/bgs/Ruinart_AT_HOME_StudioMB_01_1.jpeg"
                alt=""
                width={900}
                height={525}
                className=" object-cover w-full h-[520px] rounded-sm"
              />
            </SplideSlide>
          </SplideTrack>
        </Splide>
      </div>
  )
}
