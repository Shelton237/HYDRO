type ContactFormProps = {
    form_title: string
    form_subtitle: string
}

const ContactForm = ({ form_title, form_subtitle }: ContactFormProps) => {
    return (
        <div className="contact-content">
            <h2>{form_title}</h2>
            <p>{form_subtitle}</p>
            <form action="contact.php" id="contact-form" method="POST" className="contact-form-items">
                <div className="row g-4">
                    <div className="col-lg-6 wow slideUp" data-delay=".3">
                        <div className="form-clt">
                            <span>Votre nom*</span>
                            <input type="text" name="name" id="name" placeholder="Votre nom" />
                        </div>
                    </div>
                    <div className="col-lg-6 wow slideUp" data-delay=".5">
                        <div className="form-clt">
                            <span>Votre e-mail*</span>
                            <input type="text" name="email" id="email" placeholder="Votre e-mail" />
                        </div>
                    </div>
                    <div className="col-lg-12 wow slideUp" data-delay=".7">
                        <div className="form-clt">
                            <span>Votre message*</span>
                            <textarea name="message" id="message" placeholder="Décrivez votre besoin" defaultValue={""} />
                        </div>
                    </div>
                    <div className="col-lg-7 wow slideUp" data-delay=".9">
                        <button type="submit" className="theme-btn">
                            Envoyer <i className="fa-solid fa-arrow-right-long" />
                        </button>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default ContactForm
