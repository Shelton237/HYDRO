import SectionTitle from "@/components/ui/sectionTitle"
import { Link } from "@inertiajs/react"

export type AboutContent = {
  subtitle?: string | null
  title?: string | null
  highlight?: string | null
  description?: string | null
  background_image?: string | null
  button_label?: string | null
  button_url?: string | null
  icon_one_title?: string | null
  icon_one_description?: string | null
  icon_two_title?: string | null
  icon_two_description?: string | null
}

type Props = {
  about?: AboutContent | null
}

const defaultContent = {
  subtitle: 'À propos',
  title: 'Cameroun Hydraulique, expert hydraulique camerounais',
  highlight: 'Satisfaction assurée',
  description:
    "Créée en 2008 à Douala avec un capital de 2 000 000 F CFA, Cameroun Hydraulique SARL fournit flexibles, raccords, matériel de soudure et pièces d'engins au Cameroun et en Afrique Centrale. Notre objectif est d’apporter les composants hydrauliques et les pièces de rechange adaptés à chaque secteur avec un respect rigoureux de la qualité, une réception et des livraisons promptes, un parc de matériels roulants pour les urgences et l’emploi de jeunes camerounais dynamiques et qualifiés.",
  background_image: '/img/about/03.png',
  button_label: 'Découvrir nos solutions',
  button_url: '/produit',
  icon_one_title: 'Qualité & réactivité',
  icon_one_description: 'Contrôles des produits/services et logistique 24h depuis Douala & Yaoundé.',
  icon_two_title: 'Parc roulant & équipes',
  icon_two_description: 'Matériels d’intervention et hydrauliciens certifiés pour chaque secteur d’activité.',
}

const AboutTwo = ({ about }: Props) => {
  const content = {
    subtitle: about?.subtitle ?? defaultContent.subtitle,
    title: about?.title ?? defaultContent.title,
    highlight: about?.highlight ?? defaultContent.highlight,
    description: about?.description ?? defaultContent.description,
    background_image: about?.background_image ?? defaultContent.background_image,
    button_label: about?.button_label ?? defaultContent.button_label,
    button_url: about?.button_url ?? defaultContent.button_url,
    icon_one_title: about?.icon_one_title ?? defaultContent.icon_one_title,
    icon_one_description: about?.icon_one_description ?? defaultContent.icon_one_description,
    icon_two_title: about?.icon_two_title ?? defaultContent.icon_two_title,
    icon_two_description: about?.icon_two_description ?? defaultContent.icon_two_description,
  }

  return (
    <section id="about" className="about-section section-padding fix bg-cover" style={{ backgroundImage: `url("${content.background_image}")` }}>
      <div className="container">
        <div className="about-wrapper style-2">
          <div className="row">
            <div className="col-lg-6">
              <div className="about-image-items">
                <div className="circle-shape">
                  <img src="/img/about/circle.png" alt="shape-img" />
                </div>
                <div className="counter-shape float-bob-y">
                  <div className="icon">
                    <img src="/img/about/icon-1.svg" alt="icon-img" />
                  </div>
                  <div className="content">
                    <h3>
                      <span className="count">18</span>Ans
                    </h3>
                    <p>d'expérience</p>
                  </div>
                </div>
                <div className="about-image-1 bg-cover wow slideLeft" data-delay=".3" style={{ backgroundImage: 'url("/img/about/03.png")' }}>
                  <div className="about-image-2 wow slideUp" data-delay=".5">
                    <img src="/img/about/04.jpg" alt="about-img" />
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-6 mt-4 mt-lg-0">
              <div className="about-content">
                <SectionTitle>
                  <SectionTitle.SubTitle>{content.subtitle}</SectionTitle.SubTitle>
                  <SectionTitle.Title>
                    {content.title}
                    {content.highlight && (
                      <>
                        {' '}
                        <span>{content.highlight}</span>
                      </>
                    )}
                  </SectionTitle.Title>
                </SectionTitle>
                <p className="mt-3 mt-md-0 wow slideUp" data-delay=".5">
                  {content.description}
                </p>
                
                <div className="about-button wow slideUp" data-delay=".5">
                  <Link href={content.button_url} className="theme-btn">
                    {content.button_label}
                    <i className="fa-solid fa-arrow-right-long" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default AboutTwo
