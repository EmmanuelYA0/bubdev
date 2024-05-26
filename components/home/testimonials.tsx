
import { InfiniteMovingCards } from "../ui/infinite-moving-cards";


export function TestimonialsSection() {
    return (
        <section className="h-[40rem] rounded-md flex flex-col antialiased bg-coolbg dark:bg-black dark:bg-grid-white/[0.05] items-center justify-center relative overflow-hidden">
            <h1 className='font-[Cormorant] text-6xl  bg-transparent font-medium mb-16 text-myblack'>Ils parlent de nous</h1>

            <InfiniteMovingCards
                items={testimonials}
                direction="right"
                speed="slow"
                className="bg-transparent"
            />
        </section>
    );
}

const testimonials = [
    {
        img: "./avatars/leilani-angel-K84vnnzxmTQ-unsplash.jpg",
        name: "Djédjé Boni",
        title: "Passionate Wine Lover",
        quote:
            "Je suis vraiment impressionné par la sélection de vins de cette entreprise. Chaque bouteille que j'ai commandée était exceptionnelle. De plus, le service client était toujours disponible pour répondre à mes questions. Je recommande vivement!",
    },
    {
        img: "./avatars/istockphoto-1017932446-170667a.webp",
        name: "Aya Kouamé",
        title: "Champagne Connoisseur",
        quote:
            "C'est de loin le meilleur site pour acheter du champagne en ligne. Leur choix est vaste et leur équipe est très compétente. J'ai reçu mes commandes rapidement et en parfait état. Bravo pour ce service de qualité!",
    },
    {
        img: "./avatars/dani-RqdkfHl0L3A-unsplash.jpg",
        name: "Kouassi Yao",
        title: "Spirit Lover",
        quote: "Je suis ravi de la diversité des spiritueux disponibles sur ce site. Le processus de commande était simple et le service client était très réactif lorsque j'avais des questions. Je recommande sans hésitation!",
    },
    {
        img: "./avatars/istockphoto-1218066385-170667a.webp",
        name: "Ahou Bédié",
        title: "Enthusiastic Wine Collector",
        quote:
            "En tant que collectionneuse de vins, je suis très satisfaite de mes achats sur ce site. Leur sélection de vins rares est remarquable et leur équipe m'a aidée à trouver des bouteilles uniques pour ma collection. Merci pour cette expérience exceptionnelle!",
    },
    {
        img: "./avatars/pavel-anoshin-d0peGya6R5Y-unsplash.jpg",
        name: "Florentin Zouzoua",
        title: "Adventurous Explorer",
        quote:
            "J'ai découvert ce site en cherchant des vins pour une soirée spéciale et je suis très content de mes achats. Le service client était très serviable et m'a même donné des recommandations pour des accords mets-vins. Je reviendrai certainement!",
    },
];



