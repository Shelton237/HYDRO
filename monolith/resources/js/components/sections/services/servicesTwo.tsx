// src/components/sections/servicesTwo/index.tsx
import SectionTitle from "@/components/ui/sectionTitle"
import { servicesTwoData } from "@/db/servicesTwoData"
import ServiceCard from "./serviceCard"
import type { HomeSectionData } from "@/types/homeSection"
import type { ServiceDataType } from "@/types/service"

type ServiceRecord = {
  id: number | string
  title: string
  description?: string | null
  icon_path?: string | null
  link_url?: string | null
  animation_delay?: string | null
  is_featured?: boolean | null
}

const ServicesTwo = ({
  services = [],
  section,
}: {
  services?: ServiceRecord[]
  section?: HomeSectionData
}) => {
  const normalized: ServiceDataType[] =
    services.length > 0
      ? services.map((service, index) => ({
          id: service.id,
          title: service.title,
          description: service.description ?? "",
          icon: service.icon_path ?? "/img/service/icon/s-icon-1.svg",
          link: service.link_url ?? "/contact",
          delay: service.animation_delay ?? `.${index + 3}`,
          active: Boolean(service.is_featured),
        }))
      : servicesTwoData.slice(0, 4)

  const subtitle = section?.subtitle ?? "Services We Offer"
  const description = section?.description

  const renderTitle = () => {
    if (section?.title) {
      return (
        <SectionTitle.Title
          dangerouslySetInnerHTML={{
            __html: section.title,
          }}
        />
      )
    }
    return (
      <SectionTitle.Title>
        Provide Comprehensive Ecological
        <br />
        Service
      </SectionTitle.Title>
    )
  }

  return (
    <section id="services" className="service-section-2 fix section-padding pb-0">
      <div className="container">
        <SectionTitle className="text-center">
          <SectionTitle.SubTitle>{subtitle}</SectionTitle.SubTitle>
          {renderTitle()}
        </SectionTitle>

        {description && (
          <p className="mx-auto max-w-2xl text-center text-sm text-slate-500">{description}</p>
        )}

        <div className="row">
          {normalized.map((service) => (
            <div
              key={service.id}
              className="col-lg-6 col-md-6 service-col wow slideUp"
              data-delay={service.delay}
            >
              <ServiceCard service={service} className={`style-2 ${service.active ? "active" : ""}`} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default ServicesTwo
