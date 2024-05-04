import React from 'react'
import Button from '../Button'
import Image from "next/image"
import Link from 'next/link'

const Hero = () => {
    return (
        <>
            <section className=" w-full left-8 h-[900px] mt-56 sm:left-3 md:left-2 lg:left-2 top-40 object-contain static">
                <div className='absolute top-0 -right-5'>
                    <Image
                        src='/rectangle.svg'
                        alt=''
                        width={500}
                        height={600}
                        className='hidden lg:flex  top-0 z-10'
                    />
                </div>
                {/* left-8 top-40  h-[300px] */}
                <div className='w-[600px] -top-7 h-[500px]'>
                    <h1 className="text-myblack lg:text-5xl sm:text-4xl text-4xl font-normal text-justify font-['Montserrat'] leading-normal ">
                        DECOUVREZ L’
                        <span className="text-redhot  text-5xl font-normal font-['Montaga'] ">
                            EXCELLENCE
                        </span>
                        DANS CHAQUE GORGEE
                    </h1>
                    <p className="w-[550px] left-1 top-16 text-myblack text-2xl font-normal font-['Montaga']">
                        {/*  */}
                        Explorez notre sélection exquise de vins, champagnes et autres spiritueux , conçue pour éveiller vos sens et élever chaque moment spécial.
                    </p>
                    <Link href='/vins'>
                        <Button
                            type="button"
                            title="Visiter la boutique"
                            variant="bg-[#4A050D] w-44 h-12 p-2.5 text-white transition-all hover:bg-redhot gap-2.5 inline-flex"
                            position='top-28 left-24'
                        />
                    </Link>
                    <Link href='#'>
                        <Image
                            src='/fleche.svg'
                            alt='fleche'
                            width={14}
                            height={36}
                            className=' z-20 bg-transparent left-96 top-80 '

                        />
                    </Link>
                </div>
                <div className='left-[552px] top-[-650px] w-[600px] h-[900px] overflow-hidden object-contain'>
                    <Image
                        src='/hero-bottle.svg'
                        alt='bottle-image'
                        width={405}
                        height={949}
                        className=' z-20 bg-transparent drop-shadow-sm left-[-80px] top-[-40px] '
                    // 
                    />
                    <Image
                        src='/hero-glass.svg'
                        alt='glass-image'
                        width={391}
                        height={511}
                        className=' z-20 bg-transparent left-32  top-[-580px]'
                    // 
                    />
                </div>

            </section>

        </>
    )
}
export default Hero

// const Hero = () => {
//     return (
//         <>
//             <section className="relative flex flex-col items-center justify-center w-full h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px]">
//                 <div className="w-[90%] max-w-[650px] text-center">
//                     <h1 className="text-myblack text-5xl font-normal text-justify font-['Montserrat'] leading-normal sm:text-6xl md:text-7xl">
//                         DECOUVREZ L’
//                         <span className="text-redhot  text-5xl font-normal font-['Montaga'] ">
//                             EXCELLENCE
//                         </span>
//                         DANS CHAQUE GORGEE
//                     </h1>
//                     <div className="w-full max-w-[550px] mt-4 text-myblack text-2xl font-normal font-['Montaga']">
//                         Explorez notre sélection exquise de vins et champagnes, conçue pour éveiller vos sens et élever chaque moment spécial.
//                     </div>
//                     <Link href='#'>
//                         <Button
//                             type="button"
//                             title="Visiter la boutique"
//                             variant="btn_pourpre"
//                         />
//                     </Link>
//                 </div>
//                 <Image
//                     src='/hero-bottle.svg'
//                     alt='bottle-image'
//                     width={405}
//                     height={949}
//                     className='absolute top-[-430px] left-[-150px] z-30 bg-transparent drop-shadow-sm sm:left-[-200px] md:left-[-250px] lg:left-[-300px]'
//                 />
//                 <Image
//                     src='/hero-glass.svg'
//                     alt='glass-image'
//                     width={391}
//                     height={511}
//                     className='absolute top-[-970px] right-[-150px] z-30 bg-transparent sm:right-[-200px] md:right-[-250px] lg:right-[-300px]'
//                 />
//             </section>

//         </>
//     )
// }

// export default Hero