import { Fragment } from "react";

const marqueeItems = [
    'Excellente qualité',
    'Réactivité 24h',
    'SAV assuré',
    '1500+ références flexibles',
    'Sertissage 4SH 4" – 340 T',
    'Douala Nkolouloun',
    'Douala Yassa',
    'Yaoundé Tradex Olembe',
    'Gravage spécial alu/inox',
    'Parc roulant urgences',
];
const MarqueeTicker = () => {
    return (
        <div className="marque-section-2 section-padding pt-0">
            <div className="container-fluid">
                <div className="marquee-wrapper style-2 text-slider">
                    <div className="marquee-inner to-left">
                        <ul className="marqee-list d-flex">
                            <li className="marquee-item style-2">
                                {marqueeItems.map((item, index) => (
                                    <Fragment key={index}>
                                        <span className="text-slider">
                                            <img src="/img/asterisk.svg" alt="img" />
                                        </span>
                                        <span className="text-slider text-style">{item}</span>
                                    </Fragment>
                                ))}
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default MarqueeTicker
