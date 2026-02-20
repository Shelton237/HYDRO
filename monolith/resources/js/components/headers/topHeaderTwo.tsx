import { useState } from "react";
import CustomDropdown from "../ui/customDropdown";
import { Link } from "@inertiajs/react";

const options = [
    { value: 'english', label: 'English' },
    { value: 'bangla', label: 'Bangla' },
    { value: 'hindi', label: 'Hindi' }
];
interface Option {
    value: string;
    label: string;
}
const TopHeaderTwo = () => {
    const [_, setSelectedLanguage] = useState<Option | null>(null);

    const handleSelect = (option: Option) => {
        setSelectedLanguage(option);
    };
    // console.log(selectedLanguage)

    return (
        <div className="header-top-section top-style-3">
            <div className="container">
                <div className="header-top-wrapper">
                    <ul className="contact-list">
                        <li>
                            <i className="far fa-envelope" />
                            <Link href="mailto:info@example.com" className="link">info@example.com</Link>
                        </li>
                        <li>
                            <i className="fa-solid fa-phone-volume" />
                            <Link href="tel:2086660112">+208-666-0112</Link>
                        </li>
                    </ul>
                    <div className="top-right">
                        <div className="flag-wrap d-flex justify-content-end">
                            <div className="flag">
                                <img src="/img/flag.png" alt="flag" />
                            </div>
                            <CustomDropdown options={options} onSelect={handleSelect} />
                        </div>
                        <div className="social-icon d-flex align-items-center">
                            <span>Follow Us:</span>
                            <a href="#" aria-label="Facebook"><i className="fab fa-facebook-f" /></a>
                            <a href="#" aria-label="Twitter"><i className="fa-brands fa-x-twitter" /></a>
                            <a href="#" aria-label="LinkedIn"><i className="fa-brands fa-linkedin-in" /></a>
                            <a href="#" aria-label="YouTube"><i className="fa-brands fa-youtube" /></a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TopHeaderTwo
