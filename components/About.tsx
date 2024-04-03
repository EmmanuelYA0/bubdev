import Image from 'next/image'
import React from 'react'

const About = () => {
    return (
        <section className=' flex flex-wrap items-center'>
            <div className=" flex-grow basis-48 w-[500px] h-24 mx-11  relative z-0 text-myblack text-6xl font-medium font-['Cormorant']">
            {/* left-[351px] top-[-750px]*/}
                A propos de nous
            </div>
            <Image
                src='/grappes.svg'
                alt='grappes-img'
                width={313}
                height={199}
                className=' bg-transparent z-10'
                // left-[900px] top-[-900px]
            />
            <div className="w-[700px] ms-5 h-32   text-center">
            {/* top-[-650px] */}
                <span className="text-myblack text-xl font-normal font-['Montaga']">
                    Nous sommes une entreprise passionnée par le vin et le champagne. Chez
                </span>
                <span className="text-redhot text-2xl font-normal font-['Montaga']">Bubbly
                </span>
                <span className="text-myblack text-xl font-normal font-['Montaga']">
                    , nous nous efforçons de présenter à nos clients une sélection minutieusement choisie, mettant en lumière les meilleurs vignobles et les techniques artisanales. Chaque bouteille que nous proposons raconte une histoire, reflétant la richesse de son terroir et le savoir-faire de ses producteurs. Notre engagement envers la qualité et l'authenticité guide chacun de nos choix, car nous croyons que chaque dégustation devrait être une expérience mémorable. Rejoignez-nous dans notre exploration du monde des saveurs, où chaque gorgée révèle un nouveau voyage gustatif.
                </span>
            </div>
            <Image
                src='/wine-tonneau.svg'
                alt='tonneau-img'
                width={313}
                height={199}
                className=' bg-transparent z-10'
                // left-[900px] top-[-900px]
            />
        </section>
    )
}

export default About    