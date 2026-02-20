import { Link } from "@inertiajs/react"

const TopHeader = ({ wrapperClass, className }: { wrapperClass?: string; className?: string }) => {
    return (
        <div className={`header-top-section fix ${className}`}>
            <div className="container-fluid">
                <div className={`header-top-wrapper ${wrapperClass}`}>
                    <ul className="contact-list">
                        <li>
                            <i className="fa-solid fa-phone-volume" />
                            <Link href="tel:+237674048225">(+237) 674 048 225</Link>
                            <span className="mx-1 text-white/70">/</span>
                            <Link href="tel:+237696781077">(+237) 696 781 077</Link>
                        </li>
                        <li>
                            <i className="far fa-envelope" />
                            <Link href="mailto:contact@camerounhydraulique.com" className="link">contact@camerounhydraulique.com</Link>
                            <span className="mx-1 text-white/70">;</span>
                            <Link href="mailto:cameroun.hydraulique@yahoo.fr" className="link">cameroun.hydraulique@yahoo.fr</Link>
                        </li>
                    </ul>
                    <div className="top-right">
                        <div className="social-icon d-flex align-items-center">
                            <span>Suivez-nous :</span>
                            <a href="#" aria-label="Facebook"><i className="fab fa-facebook-f" /></a>
                            <a href="#" aria-label="Twitter"><i className="fa-brands fa-x-twitter"/></a>
                            <a href="#" aria-label="LinkedIn"><i className="fa-brands fa-linkedin-in" /></a>
                            <a href="#" aria-label="YouTube"><i className="fa-brands fa-youtube" /></a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TopHeader
