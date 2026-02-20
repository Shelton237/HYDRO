import SectionTitle from "@/components/ui/sectionTitle";
import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";
import type { HomeSectionData } from "@/types/homeSection";

const achievementData = [
    {
        id: 1,
        icon: '/img/achievement-icon/01.svg',
        count: 18,
        description: "Années d'expérience depuis 2008",
        delay: '.3',
    },
    {
        id: 2,
        icon: '/img/achievement-icon/02.svg',
        count: 1500,
        description: 'Références flexibles en stock',
        delay: '.5',
    },
    {
        id: 3,
        icon: '/img/achievement-icon/03.svg',
        count: 3,
        description: 'Agences Douala (Texaco, Yassa) & Yaoundé',
        delay: '.7',
    },
    {
        id: 4,
        icon: '/img/achievement-icon/04.svg',
        count: 340,
        description: 'Tonnes de capacité de sertissage 4SH',
        delay: '.9',
    },
];


const AchievementTwo = ({
    achievementWrapperClass,
    className,
    section,
}: {
    achievementWrapperClass?: string;
    className?: string;
    section?: HomeSectionData;
}) => {
    const { ref, inView } = useInView({
        threshold: 1,
        triggerOnce: true
    });
    const backgroundStyle = section?.image_path
        ? { backgroundImage: `url("${section.image_path}")` }
        : undefined;
    return (
        <section
            className={`achievement-section-2 fix ${className}`}
            style={backgroundStyle}
        >
            <div className="container">
                <div className={`achievement-wrapper ${achievementWrapperClass}`}>
                    <SectionTitle className="mb-0">
                        <SectionTitle.SubTitle className="text-white">
                            {section?.subtitle ?? 'Mesures de performance'}
                        </SectionTitle.SubTitle>
                        <SectionTitle.Title className="text-white">
                            {section?.title ?? 'Qualité stricte, livraisons promptes & parc roulant'}
                        </SectionTitle.Title>
                    </SectionTitle>
                    <div className="counter-area" ref={ref}>
                        {achievementData.map((item) => (
                            <div
                                key={item.id}
                                className="counter-items wow slideUp"
                                data-delay={item.delay}
                            >
                                <div className="icon">
                                    <img src={item.icon} alt="icon-img" />
                                </div>
                                <div className="content">
                                    {
                                        inView &&
                                        <h2>
                                            <span className="count"><CountUp end={item.count} /></span>+
                                        </h2>
                                    }
                                    <p>{item.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>

    )
}

export default AchievementTwo
