import { Link } from "@inertiajs/react";
import type { ProductListItem } from "@/types/product";

type ProjectCardPropsType = {
    product: ProductListItem & {
        image?: string | null;
        title?: string | null;
        link?: string;
        delay?: string;
    };
    className?: string;
    iconCalss?: string;
    isIconShow?: boolean;
};

const formatPrice = (product: ProductListItem) => {
    if (product.price === undefined || product.price === null) {
        return null;
    }

    const currency = product.currency ?? 'XAF';
    try {
        return new Intl.NumberFormat('fr-FR', {
            style: 'currency',
            currency,
        }).format(product.price);
    } catch {
        return `${currency} ${product.price}`;
    }
};

const ProjectCard = ({ product, className, iconCalss, isIconShow = true }: ProjectCardPropsType) => {
    if (!product) {
        return null;
    }
    const image = product.image_url ?? product.image ?? '/img/project/05.jpg';
    const priceLabel = formatPrice(product);
    const title = product.name ?? product.title ?? 'Produit hydraulique';
    const url = product.slug ? `/produit/${product.slug}` : product.link ?? '/produit';

    return (
        <div className={`project-items ${className}`}>
            <div className="project-image">
                <img src={image} alt={title} />
                <div className="project-content">
                    <p className="text-uppercase text-[0.65rem] tracking-[0.25em] text-emerald-100">Produit hydraulique</p>
                    <h4>
                        <Link href={url}>{title}</Link>
                    </h4>
                    {product.excerpt && <p className="text-sm text-slate-200">{product.excerpt}</p>}
                    {priceLabel && <strong className="text-white">{priceLabel}</strong>}
                    {isIconShow && (
                    <Link href={url} className={`${iconCalss ?? 'icon'}`}>
                            <i className="fa-solid fa-arrow-right" />
                        </Link>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProjectCard;
