import React from 'react'
import Button from './Button'
import Image from "next/image"
import Link from 'next/link'

const Hero = () => {
    return (
        <>
            <section className="relative flex flex-col items-center justify-center w-full h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px]">
                <div className="w-[90%] max-w-[650px] text-center">
                    <h1 className="text-myblack text-5xl font-normal text-justify font-['Montserrat'] leading-normal sm:text-6xl md:text-7xl">
                        DECOUVREZ L’
                        <span className="text-redhot  text-5xl font-normal font-['Montaga'] ">
                            EXCELLENCE
                        </span>
                        DANS CHAQUE GORGEE
                    </h1>
                    <div className="w-full max-w-[550px] mt-4 text-myblack text-2xl font-normal font-['Montaga']">
                        Explorez notre sélection exquise de vins et champagnes, conçue pour éveiller vos sens et élever chaque moment spécial.
                    </div>
                    <Link href='#'>
                        <Button
                            type="button"
                            title="Visiter la boutique"
                            variant="btn_pourpre"
                        />
                    </Link>
                </div>
                <Image
                    src='/hero-bottle.svg'
                    alt='bottle-image'
                    width={405}
                    height={949}
                    className='absolute top-[-430px] left-[-150px] z-30 bg-transparent drop-shadow-sm sm:left-[-200px] md:left-[-250px] lg:left-[-300px]'
                />
                <Image
                    src='/hero-glass.svg'
                    alt='glass-image'
                    width={391}
                    height={511}
                    className='absolute top-[-970px] right-[-150px] z-30 bg-transparent sm:right-[-200px] md:right-[-250px] lg:right-[-300px]'
                />
            </section>

        </>
    )
}

export default Hero



// import React from 'react'
// import Button from './Button'
// import Image from "next/image"
// import Link from 'next/link'

// const Hero = () => {
//     return (
//         <>
//             <section className=" w-[650px] relative flex flex-col object-fill ">
//             {/* left-8 top-40  h-[300px] */}
//                 <h1 className="text-myblack text-5xl font-normal text-justify font-['Montserrat'] leading-normal ">
//                     DECOUVREZ L’
//                     <span className="text-redhot  text-5xl font-normal font-['Montaga'] ">
//                         EXCELLENCE
//                     </span>
//                     DANS CHAQUE GORGEE
//                 </h1>
//                 <div className="w-[550px]  text-myblack text-2xl font-normal font-['Montaga']">
//                 {/* left-14 top-32 */}
//                     Explorez notre sélection exquise de vins et champagnes, conçue pour éveiller vos sens et élever chaque moment spécial.
//                 </div>
//                 <Link href='#'>
//                     <Button
//                         type="button"
//                         title="Visiter la boutique"
//                         variant="btn_pourpre"
//                         // position='top-[600px] left-24'
//                     />
//                 </Link>
//                 <Image
//                     src='/hero-bottle.svg'
//                     alt='bottle-image'
//                     width={405}
//                     height={949}
//                     className=' z-20 bg-transparent drop-shadow-sm'
//                     // left-[552px] top-[-430px]
//                 />
//                 <Image
//                     src='/hero-glass.svg'
//                     alt='glass-image'
//                     width={391}
//                     height={511}
//                     className=' z-20 bg-transparent'
//                     // left-[750px] top-[-970px]
//                 />
//             </section>

//         </>
//     )
// }

// export default Hero