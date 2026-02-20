import { Link } from "@inertiajs/react";
import type { ServiceDataType } from "@/types/service";

const ServiceCard = ({ service, className = "" }: { service: ServiceDataType; className?: string }) => {
  const href = service.link || "#";

  const renderIcon = () => {
    if (!service.icon) {
      return null;
    }

    const trimmed = service.icon.trim();
    if (!trimmed) {
      return null;
    }

    if (trimmed.startsWith("<svg")) {
      const encoded = encodeURIComponent(trimmed).replace(/'/g, "%27").replace(/"/g, "%22");
      return <img src={`data:image/svg+xml,${encoded}`} alt="" className="service-card__image" />;
    }

    return <img src={trimmed} alt="" className="service-card__image" />;
  };

  return (
    <Link href={href} className={`service-card ${className}`}>
      <div className="service-card__media" aria-hidden="true">
        {renderIcon()}
      </div>

      <div className="service-card__body">
        <h3 className="service-card__title">{service.title}</h3>
        {service.description ? <p className="service-card__text">{service.description}</p> : null}

        <span className="service-card__cta">
          Voir plus
          <i className="fa-solid fa-arrow-right-long" />
        </span>
      </div>
    </Link>
  );
};

export default ServiceCard;
