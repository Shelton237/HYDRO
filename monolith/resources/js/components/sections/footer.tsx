import { SuCallMessage, SuEmail, SuLocation } from "@/lib/icons";
import { FooterContent, defaultQuickLinks, defaultRecentPosts, defaultServices } from "@/data/footer";
import { Link } from "@inertiajs/react";

type FooterProps = {
    footer?: FooterContent | null;
};

const Footer = ({ footer }: FooterProps) => {
    const padTel = (value?: string | null) => {
        if (!value) {
            return undefined;
        }

        const clean = value.replace(/[^\d+]/g, "");
        return clean ? `tel:${clean}` : undefined;
    };

    const contactInfo = [
        {
            icon: <SuCallMessage />,
            label: "Téléphone / WhatsApp",
            items: [
                {
                    title: "Téléphone",
                    value: footer?.contact_phone ?? "(+237) 674 048 225",
                    link: padTel(footer?.contact_phone ?? "(+237) 674 048 225"),
                },
                {
                    title: "WhatsApp",
                    value: footer?.contact_whatsapp ?? "(+237) 696 781 077",
                    link: padTel(footer?.contact_whatsapp ?? "(+237) 696 781 077"),
                },
            ],
        },
        {
            icon: <SuEmail />,
            label: "Email",
            items: [
                {
                    value: footer?.contact_email ?? "contact@camerounhydraulique.com",
                    link: `mailto:${footer?.contact_email ?? "contact@camerounhydraulique.com"}`,
                },
            ],
        },
        {
            icon: <SuLocation />,
            label: "Adresse / Localisation",
            items: [
                {
                    value: footer?.contact_address ?? "Douala : Texaco Nkolouloun & Yassa • Yaoundé : face Tradex Olembe • BP 9593 Douala Cameroun",
                },
            ],
        },
    ].filter((info) => info.items.length);

    const quickLinks = footer?.quick_links?.length ? footer.quick_links : defaultQuickLinks;
    const serviceLinks = footer?.services?.length ? footer.services : defaultServices;
    const recentPosts = footer?.recent_posts?.length ? footer.recent_posts : defaultRecentPosts;
    const description =
        footer?.footer_description ??
        "Flexibles hydrauliques sur mesure, accessoires, pièces d'engins et livraisons express partout au Cameroun.";

    const socialLinks = [
        { href: footer?.facebook_url ?? "#", icon: "fab fa-facebook-f", label: "Facebook" },
        { href: footer?.twitter_url ?? "#", icon: "fa-brands fa-x-twitter", label: "Twitter" },
        { href: footer?.linkedin_url ?? "#", icon: "fa-brands fa-linkedin-in", label: "LinkedIn" },
        { href: footer?.youtube_url ?? "#", icon: "fa-brands fa-youtube", label: "YouTube" },
    ];

    const copyrightText =
        footer?.copyright_text ??
        "© 2025 Cameroun Hydraulique SARL";

    return (
        <footer className="footer-section footer-bg">
            <div className="container">
                <div className="contact-info-area">
                    {contactInfo.map((info, index) => (
                        <div
                            key={index}
                            className="contact-info-items wow slideUp"
                            data-delay={`${0.3 + index * 0.2}`}
                        >
                            <div className="icon">{info.icon}</div>
                            <div className="content">
                                <p>{info.label}</p>
                                <h3>
                                    {info.items.map((item, itemIndex) => (
                                        <span key={itemIndex} className="block">
                                            {item.title && <strong className="mr-1">{item.title} :</strong>}
                                            {item.link ? (
                                                <Link href={item.link}>{item.value}</Link>
                                            ) : (
                                                item.value
                                            )}
                                        </span>
                                    ))}
                                </h3>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div className="footer-widgets-wrapper">
                <div className="shape-1">
                    <img src="/img/footer-shape-1.png" alt="shape-img" />
                </div>
                <div className="container">
                    <div className="row">
                        <div
                            className="col-xl-3 col-lg-3 col-md-6 wow slideUp"
                            data-delay=".3"
                        >
                            <div className="single-footer-widget">
                                <div className="widget-head">
                                    <Link href="/">
                                        <img src="/img/logo/logo.jpg" alt="logo" />
                                    </Link>
                                </div>
                                <div className="footer-content">
                                    <p>{description}</p>
                                    <div className="social-icon d-flex align-items-center">
                                        {socialLinks.map((social) => (
                                            <a href={social.href} aria-label={social.label} key={social.label}>
                                                <i className={social.icon} />
                                            </a>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div
                            className="col-xl-3 col-lg-3 col-md-6 ps-lg-5 wow slideUp"
                            data-delay=".5"
                        >
                            <div className="single-footer-widget">
                                <div className="widget-head">
                                    <h3>Liens utiles</h3>
                                </div>
                                <ul className="list-area">
                                    {quickLinks.map((link, index) => (
                                        <li key={index}>
                                            <Link href={link.link}>
                                                <i className="fa-solid fa-chevron-right" />
                                                {link.text}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                        <div
                            className="col-xl-3 col-lg-3 col-md-6 ps-lg-5 wow slideUp"
                            data-delay=".5"
                        >
                            <div className="single-footer-widget style-margin">
                                <div className="widget-head">
                                    <h3>Nos solutions</h3>
                                </div>
                                <ul className="list-area">
                                    {serviceLinks.map((service, index) => (
                                        <li key={index}>
                                            <Link href={service.link}>
                                                <i className="fa-solid fa-chevron-right" />
                                                {service.text}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                        <div
                            className="col-xl-3 col-lg-3 col-md-6 wow slideUp"
                            data-delay=".7"
                        >
                            <div className="single-footer-widget style-margin">
                                <div className="widget-head">
                                    <h3>Actualités</h3>
                                </div>
                                <div className="recent-post-area">
                                    {recentPosts.map((post, index) => (
                                        <div
                                            key={index}
                                            className={`recent-post-items ${index === recentPosts.length - 1 ? "mb-0" : ""}`}
                                        >
                                            <div className="thumb">
                                                <img src={post.image} alt="post-img" />
                                            </div>
                                            <div className="content">
                                                <ul className="post-date">
                                                    <li>
                                                        <i className="fa-solid fa-calendar-days me-2" />
                                                        {post.date}
                                                    </li>
                                                </ul>
                                                <h6>
                                                    <Link href={post.link}>{post.title}</Link>
                                                </h6>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="footer-bottom style-2">
                <div className="container">
                    <div className="footer-wrapper d-flex align-items-center justify-content-between">
                        <p className="wow slideLeft color-2" data-delay=".3">
                            {copyrightText}
                        </p>
                        <ul className="footer-menu wow slideRight" data-delay=".5">
                            <li>
                                <Link href="/contact">Mentions légales</Link>
                            </li>
                            <li>
                                <Link href="/contact">Politique de confidentialité</Link>
                            </li>
                        </ul>
                    </div>
                </div>
                <a href="#" id="scrollUp" className="scroll-icon" aria-label="Scroll to top">
                    <i className="fa fa-arrow-up" />
                </a>
            </div>
        </footer>
    );
};

export default Footer;

