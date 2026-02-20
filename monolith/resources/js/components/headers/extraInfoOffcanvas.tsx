import { useState } from 'react';
import { Link } from '@inertiajs/react';
import MobileMenuList from './mobileNavBar';

const ExtraInfoOffcanvas = () => {
    const [isInfoOpen, setInfoOpen] = useState(false);

    const toggleOffcanvas = () => {
        setInfoOpen(!isInfoOpen);
    };

    return (
        <>
            <div className="sidebar__toggle" onClick={toggleOffcanvas}>
                <i className="fas fa-bars" />
            </div>
            <div className="fix-area">
                <div className={`offcanvas__info ${isInfoOpen ? 'info-open' : ''}`}>
                    <div className="offcanvas__wrapper">
                        <div className="offcanvas__content">
                            <div className="offcanvas__top mb-5 d-flex justify-content-between align-items-center">
                                <div className="offcanvas__logo">
                                    <Link href="/">
                                        <img src="/img/logo/logo.jpg" alt="logo" />
                                    </Link>
                                </div>
                                <div className="offcanvas__close">
                                    <button onClick={toggleOffcanvas}>
                                        <i className="fas fa-times" />
                                    </button>
                                </div>
                            </div>
                            <MobileMenuList/>
                            <p className="text d-none d-lg-block">
                                Cameroun Hydraulique SARL conçoit des flexibles hydrauliques sur mesure, fournit accessoires, pièces d’engins et matériel de soudure depuis Douala et Yaoundé avec une promesse : excellente qualité, réactivité et SAV assuré.
                            </p>
                            <div className="mobile-menu fix mb-3" />
                            <div className="offcanvas__contact">
                                <h4>Informations de contact</h4>
                                <ul>
                                    <li className="d-flex align-items-center">
                                        <div className="offcanvas__contact-icon">
                                            <i className="fal fa-map-marker-alt" />
                                        </div>
                                        <div className="offcanvas__contact-text">
                                            <span>Douala : entre Texaco Nkolouloun et Carrefour Photo Golden (face Boulangerie de luxe) • Douala Yassa : entrée salle de fête BOCOM • Yaoundé : face Tradex Olembe • BP 9593 Douala Cameroun</span>
                                        </div>
                                    </li>
                                    <li className="d-flex align-items-center">
                                        <div className="offcanvas__contact-icon mr-15">
                                            <i className="fal fa-envelope" />
                                        </div>
                                        <div className="offcanvas__contact-text">
                                            <Link href="mailto:contact@camerounhydraulique.com"><span>contact@camerounhydraulique.com</span></Link>
                                            <span className="mx-1 text-white/60">;</span>
                                            <Link href="mailto:cameroun.hydraulique@yahoo.fr"><span>cameroun.hydraulique@yahoo.fr</span></Link>
                                        </div>
                                    </li>
                                    <li className="d-flex align-items-center">
                                        <div className="offcanvas__contact-icon mr-15">
                                            <i className="fal fa-clock" />
                                        </div>
                                        <div className="offcanvas__contact-text">
                                            <span>Atelier disponible 7j/7 – réception & livraisons promptes sous 24h</span>
                                        </div>
                                    </li>
                                    <li className="d-flex align-items-center">
                                        <div className="offcanvas__contact-icon mr-15">
                                            <i className="far fa-phone" />
                                        </div>
                                        <div className="offcanvas__contact-text">
                                            <Link href="tel:+237674048225">(+237) 674 048 225</Link>
                                            <span className="mx-1 text-white/60">/</span>
                                            <Link href="tel:+237696781077">(+237) 696 781 077</Link>
                                        </div>
                                    </li>
                                </ul>
                                <div className="header-button mt-4">
                                        <Link href="/contact" className="theme-btn text-center">
                                            <span>Demander un devis<i className="fa-solid fa-arrow-right-long" /></span>
                                        </Link>
                                </div>
                                <div className="social-icon d-flex align-items-center">
                                    <a href="#" aria-label="Facebook"><i className="fab fa-facebook-f" /></a>
                                    <a href="#" aria-label="Twitter"><i className="fa-brands fa-x-twitter" /></a>
                                    <a href="#" aria-label="YouTube"><i className="fab fa-youtube" /></a>
                                    <a href="#" aria-label="LinkedIn"><i className="fab fa-linkedin-in" /></a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className={`offcanvas__overlay ${isInfoOpen ? 'overlay-open' : ''}`} onClick={toggleOffcanvas} />
        </>
    );
};

export default ExtraInfoOffcanvas;
