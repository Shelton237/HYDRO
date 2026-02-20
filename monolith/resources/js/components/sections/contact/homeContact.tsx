import type { HomeSectionData } from "@/types/homeSection";

const HomeContact = ({ section }: { section?: HomeSectionData }) => {
    const imageSrc = section?.image_path ?? "/img/contact-2.jpg";
    const subtitle = section?.subtitle ?? "Support 24h/24";
    const title =
        section?.title ?? "Demandez un flexible ou une pièce sur mesure";
    const description = section?.description ?? "Douala : (+237) 674 048 225 • Yaoundé : (+237) 696 781 077 • BP 9593 Douala Cameroun.";

    return (
        <div className="contact-section-21 section-padding section-bg">
            <div className="contact-image-2">
                <img src={imageSrc} alt="img" />
            </div>
            <div className="contact-wrapper-21">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-6" />
                        <div className="col-xl-6 col-lg-8">
                            <div className="contact-content">
                                <div className="section-title">
                                    <span className="wow slideUp" style={{ visibility: 'visible' }}>
                                        {subtitle}
                                    </span>
                                    <h2
                                        className="wow slideUp"
                                        data-delay=".3"
                                        style={{ visibility: 'visible', animationDelay: '0.3s' }}
                                        dangerouslySetInnerHTML={{ __html: title }}
                                    />
                                </div>
                                {description && (
                                    <p className="wow slideUp text-sm text-slate-500" dangerouslySetInnerHTML={{ __html: description }} />
                                )}
                                <ul className="contact-meta wow slideUp" data-delay=".5">
                                    <li>Douala : entre Texaco Nkolouloun et Carrefour Photo Golden (face Boulangerie de luxe)</li>
                                    <li>Douala Yassa : entrée salle de fête BOCOM</li>
                                    <li>Yaoundé : face Tradex Olembe</li>
                                </ul>
                                <form action="#" id="contact-form" method="POST" className="mt-4 mt-md-0">
                                    <div className="row g-4">
                                        <div className="col-lg-6 wow slideUp" data-delay=".3" style={{ visibility: 'visible', animationDelay: '0.3s' }}>
                                            <div className="form-clt">
                                                <input type="text" name="name" id="name" placeholder="Votre nom" />
                                            </div>
                                        </div>
                                        <div className="col-lg-6 wow slideUp" data-delay=".5" style={{ visibility: 'visible', animationDelay: '0.5s' }}>
                                            <div className="form-clt">
                                                <input type="text" name="email" id="email" placeholder="Votre e-mail" />
                                            </div>
                                        </div>
                                        <div className="col-lg-6 wow slideUp" data-delay=".3" style={{ visibility: 'visible', animationDelay: '0.3s' }}>
                                            <div className="form-clt">
                                                <input type="text" name="phone" id="phone" placeholder="Votre téléphone" />
                                            </div>
                                        </div>
                                        <div className="col-lg-6 wow slideUp" data-delay=".5" style={{ visibility: 'visible', animationDelay: '0.5s' }}>
                                            <div className="form-clt">
                                                <input type="text" name="subject" id="subject" placeholder="Objet" />
                                            </div>
                                        </div>
                                        <div className="col-lg-12 wow slideUp" data-delay=".3" style={{ visibility: 'visible', animationDelay: '0.3s' }}>
                                            <div className="form-clt">
                                                <textarea name="message" id="message" placeholder="Décrivez votre besoin" defaultValue={""} />
                                            </div>
                                        </div>
                                        <div className="col-lg-6 wow slideUp" data-delay=".5" style={{ visibility: 'visible', animationDelay: '0.5s' }}>
                                            <button type="submit" className="theme-btn">
                                                Envoyer <i className="far fa-long-arrow-right" />
                                            </button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default HomeContact
