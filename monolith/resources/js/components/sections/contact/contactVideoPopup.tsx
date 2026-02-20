import { useState } from "react";
import ModalVideo from 'react-modal-video';

type ContactVideoPopupProps = {
    imageSrc?: string
}

const ContactVideoPopup = ({ imageSrc }: ContactVideoPopupProps) => {
    const [isOpen, setOpen] = useState(false);
    const fallbackImage = imageSrc ?? '/img/video.png';

    return (
        <>
            <div className="video-image">
                <img src={fallbackImage} alt="img" />
                <div className="video-box">
                    <a href="#" onClick={(e) => {e.preventDefault(), setOpen(true)}} className="video-btn ripple video-popup">
                        <i className="fa-solid fa-play" />
                    </a>
                </div>
            </div>
            <ModalVideo
                channel="youtube"
                youtube={{ mute: 0, autoplay: 0 }}
                isOpen={isOpen}
                videoId="Cn4G2lZ_g2I"
                onClose={() => setOpen(false)}
            />
        </>
    )
}

export default ContactVideoPopup
