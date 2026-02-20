import { ServiceDataType } from "@/types/service"
import { Link } from "@inertiajs/react"

const ServiceCardTwo = ({ service }: { service: ServiceDataType }) => {
    return (
        <div className="service-card-items">
            <div className="service-image">
                <img src={service.image} alt="service-img" />
            </div>
            <div className="icon-2">
                <img src={service.icon} alt="img" />
            </div>
            <div className="service-content">
                <div className="icon">
                    <img src={service.icon} alt="img" />
                </div>
                <h4>
                    <Link href={service.link}>{service.title}</Link>
                </h4>
                <p>{service.description}</p>
                <Link href={service.link} className="theme-btn-2 mt-3">
                    read More
                    <i className="fa-solid fa-arrow-right-long" />
                </Link>
            </div>
        </div>
    )
}

export default ServiceCardTwo
