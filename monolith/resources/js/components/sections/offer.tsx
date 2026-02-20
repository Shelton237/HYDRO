import { SuAndroid, SuApple, SuBoost, SuInternet, SuSmartWatch, SuTV } from "@/lib/icons"
import SectionTitle from "../ui/sectionTitle";
import type { HomeSectionData } from "@/types/homeSection"

const offerItems = [
    { id: 1, icon: <SuBoost />, title: 'Sertisseuse électrique 340 T', isActive: true, delay: '.2' },
    { id: 2, icon: <SuSmartWatch />, title: 'Dénudeuse industrielle', isActive: false, delay: '.4' },
    { id: 3, icon: <SuAndroid />, title: 'Presse électrique', isActive: false, delay: '.6' },
    { id: 4, icon: <SuInternet />, title: 'Tronçonneuse flexibles', isActive: false, delay: '.8' },
    { id: 5, icon: <SuTV />, title: 'Meuleuse & ébavurage', isActive: false, delay: '.9' },
    { id: 6, icon: <SuApple />, title: 'Établi de contrôle', isActive: false, delay: '1.1' },
]

const Offer = ({ section }: { section?: HomeSectionData }) => {
    return (
        <section className="offer-section fix section-bg-2 section-padding">
            <div className="line-shape">
                <img src="/img/team/line-shape.png" alt="shape-img" />
            </div>
            <div className="mask-shape">
                <img src="/img/team/mask-shape.png" alt="shape-img" />
            </div>
            <div className="container">
                <SectionTitle className="text-center">
                    <SectionTitle.SubTitle>
                        {section?.subtitle ?? 'Outils de services'}
                    </SectionTitle.SubTitle>
                    {section?.title ? (
                        <SectionTitle.Title
                            className="text-white"
                            dangerouslySetInnerHTML={{ __html: section.title }}
                        />
                    ) : (
                        <SectionTitle.Title className="text-white">
                            Atelier équipé pour vos flexibles sur mesure
                        </SectionTitle.Title>
                    )}
                </SectionTitle>
                {section?.description && (
                    <p className="mx-auto max-w-2xl text-center text-white opacity-70">
                        {section.description}
                    </p>
                )}
                <div className="row">
                    {offerItems.map((item) => (
                        <div
                            key={item.id}
                            className={`col-xl-2 col-lg-4 col-md-4 col-sm-6 wow slideUp `}
                            data-delay={item.delay}
                        >
                            <div className={`offer-items ${item.isActive ? 'active' : ''}`}>
                                <div className="shape-top">
                                    <img src="/img/shape/offer-top.png" alt="shape-img" />
                                </div>
                                <div className="shape-bottom">
                                    <img src="/img/shape/offer-bottom.png" alt="shape-img" />
                                </div>
                                <div className="icon">{item.icon}</div>
                                <div className="content">
                                    <h5>{item.title}</h5>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>

    )
}

export default Offer
