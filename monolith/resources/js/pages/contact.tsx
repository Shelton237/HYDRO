import ContactAddress from "@/components/sections/contact/contactAddress"
import ContactForm from "@/components/sections/contact/contactForm"
import ContactMap from "@/components/sections/contact/contactMap"
import PageTitle from "@/components/sections/pageTitle"
import { defaultContact, type ContactInfo } from "@/data/contact"

type Props = {
    contact?: ContactInfo | null
}

const pickImage = (value?: string | null, fallback: string) => {
    if (typeof value === 'string' && value.trim().length > 0) {
        return value
    }

    return fallback
}

const Contact = ({ contact }: Props) => {
    const data = contact ?? defaultContact
    const bannerImage = pickImage(data.banner_image, defaultContact.banner_image)
    const contactInfo = {
        ...data,
        video_image: pickImage(data.video_image, defaultContact.video_image),
    }

    return (
        <>
            <PageTitle currentPage="Contact" title="Contact" backgroundImage={bannerImage} />
            <section className="contact-section fix section-padding">
                <div className="container">
                    <div className="contact-wrapper-2">
                        <div className="row g-4 align-items-center">
                            <div className="col-lg-6">
                                <ContactAddress contact={contactInfo} />
                            </div>
                            <div className="col-lg-6">
                                <ContactForm form_title={data.form_title} form_subtitle={data.form_subtitle} />
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <ContactMap map_embed_url={data.map_embed_url} />
        </>
    )
}

export default Contact
