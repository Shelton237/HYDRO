import SectionTitle from "../ui/sectionTitle"
import type { HomeSectionData } from "@/types/homeSection"

const ChooseUs = ({ section }: { section?: HomeSectionData }) => {
    const imageSrc = section?.image_path ?? "/img/choose/01.png"
    const subtitle = section?.subtitle ?? "Conseils & raisons"
    const title = section?.title ?? "Qualité, regard d'hydraulicien et possibilités étendues"
    const description =
        section?.description ??
        "Composants issus des leaders mondiaux, regard d’hydraulicien sur vos usages et accompagnement selon votre secteur d’activité (BTP, forestier, industriel, logistique)."

    return (
        <section className="choose-us-section fix section-padding">
            <div className="choose-shape">
                <img src="/img/choose/shape.png" alt="shape-img" />
            </div>
            <div className="bottom-shape">
                <img src="/img/choose/bottom-shape.png" alt="shape-img" />
            </div>
            <div className="arrow-shape-1 bounce-x">
                <img src="/img/choose/arrow-shape-1.png" alt="shape-img" />
            </div>
            <div className="circle-shape">
                <img src="/img/choose/circle.png" alt="shape-img" />
            </div>
            <div className="line-shape">
                <img src="/img/choose/line-shape.png" alt="shape-img" />
            </div>
            <div className="container">
                <div className="choose-us-wrapper">
                    <div className="row">
                        <div className="col-lg-6">
                            <div className="choose-us-image wow slideUp" data-delay=".4">
                                <img src={imageSrc} alt="img" />
                            </div>
                        </div>
                        <div className="col-lg-6 mt-4 mt-lg-0">
                            <div className="choose-content">
                                <SectionTitle>
                                    <SectionTitle.SubTitle>{subtitle}</SectionTitle.SubTitle>
                                    <SectionTitle.Title
                                        dangerouslySetInnerHTML={{
                                            __html: title,
                                        }}
                                    />
                                </SectionTitle>
                                <p
                                    className="mt-3 mt-md-0 wow slideUp"
                                    data-delay=".5"
                                    dangerouslySetInnerHTML={{ __html: description }}
                                />
                                <div className="choose-list-area">
                                    <ul className="choose-list wow slideUp" data-delay=".7">
                                        <li>
                                            <i className="fa-solid fa-check" />
                                            Composants de qualité issus de leaders mondiaux
                                        </li>
                                        <li>
                                            <i className="fa-solid fa-check" />
                                            Regard d’hydraulicien et conseils d’utilisation
                                        </li>
                                    </ul>
                                    <ul className="choose-list wow slideUp" data-delay=".9">
                                        <li>
                                            <i className="fa-solid fa-check" />
                                            Possibilités étendues : pompes, distribution, vérins, moteurs
                                        </li>
                                        <li>
                                            <i className="fa-solid fa-check" />
                                            Points de choix : tuyau (diamètre, longueur/rayon, matière) & raccords (DIN, BSP, ORFS, US, brides, droits/coudés)
                                        </li>
                                    </ul>
                                </div>
                                <div className="progress-wrap">
                                    <div className="pro-items wow slideUp" data-delay=".5">
                                        <div className="pro-head">
                                            <h6 className="title">
                                                Conseil métier
                                            </h6>
                                            <span className="point">
                                                3 raisons
                                            </span>
                                        </div>
                                        <div className="progress">
                                            <div className="progress-value" />
                                        </div>
                                    </div>
                                    <div className="pro-items wow slideUp" data-delay=".7">
                                        <div className="pro-head">
                                            <h6 className="title">
                                                Secteurs accompagnés
                                            </h6>
                                            <span className="point">
                                                BTP • Forêt • Industrie
                                            </span>
                                        </div>
                                        <div className="progress">
                                            <div className="progress-value style-two" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

    )
}

export default ChooseUs
