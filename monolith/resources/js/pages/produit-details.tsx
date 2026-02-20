import PageTitle from "@/components/sections/pageTitle"
import SectionHeader from "@/components/ui/SectionHeader"
import { Link } from "@inertiajs/react"
import type { ProductDetail } from "@/types/product"

type Props = {
    product: ProductDetail
}

const formatPrice = (product: ProductDetail) => {
    if (product.price === undefined || product.price === null) {
        return null
    }

    const currency = product.currency ?? 'XAF'
    try {
        return new Intl.NumberFormat('fr-FR', {
            style: 'currency',
            currency,
        }).format(product.price)
    } catch {
        return `${currency} ${product.price}`
    }
}

const ProduitDetails = ({ product }: Props) => {
    const priceLabel = formatPrice(product)
    return (
        <>
            <PageTitle
                title={product.name}
                currentPage="Produit hydraulique"
                backgroundImage={product.image_url ?? '/img/project/details.jpg'}
            />
            <section className="Project-details-section fix section-padding">
                <div className="container">
                    <SectionHeader
                        eyebrow="Solution hydraulique sur mesure"
                        title={product.name}
                        description={product.excerpt}
                    />

                    <div className="project-details-wrapper mt-6">
                        <div className="row g-4">
                            <div className="col-lg-7">
                                <div className="details-image rounded-2xl overflow-hidden shadow-lg">
                                    <img
                                        src={product.image_url ?? '/img/project/details-2.jpg'}
                                        alt={product.name}
                                    />
                                </div>

                                <div className="details-content pt-5">
                                    <h3>Description de la solution hydraulique</h3>
                                    <p>
                                        {product.description ??
                                            "Chaque flexible est dépollué, testé et livré avec marquage permanent. Nos équipes dimensionnent la bonne combinaison tuyau / raccords / jupes selon la pression, le fluide et le rayon de courbure exigé."}
                                    </p>
                                </div>

                                <div className="details-content pt-5">
                                    <h3>Caractéristiques clés</h3>
                                    <div className="row g-4">
                                        {[
                                            'Sertissage jusqu\'à 4" 4SH (340 T)',
                                            'Plus de 1 500 références disponibles',
                                            'Livraison express Douala & Yaoundé',
                                        ].map((item) => (
                                            <div className="col-lg-4 col-md-6" key={item}>
                                                <div className="list">
                                                    <i className="fa-regular fa-circle-check" />
                                                    {item}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            <div className="col-lg-5">
                                <div className="project-catagory rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                                    <h3>Informations produit</h3>
                                    <ul className="space-y-3">
                                        <li>
                                            Référence : <span>{product.sku ?? '-'}</span>
                                        </li>
                                        <li>
                                            Prix : <span>{priceLabel ?? 'Sur devis'}</span>
                                        </li>
                                        <li>
                                            Stock : <span>{product.stock ?? 0} unités disponibles</span>
                                        </li>
                                        <li>
                                            Catégorie : <span>Solutions hydrauliques Cameroun Hydraulique</span>
                                        </li>
                                    </ul>
                                </div>

                                <div
                                    className="project-catagory mt-4 rounded-2xl border border-slate-200 p-5 text-white shadow-sm"
                                    style={{ backgroundColor: '#1f6b2a' }}
                                >
                                    <h3>Besoin d'une assistance immédiate ?</h3>
                                    <p className="text-sm text-white/80">
                                        Nos experts vous orientent sur la bonne configuration et coordonnent les interventions terrain 7j/7.
                                    </p>
                                    <Link
                                        href="/contact"
                                        className="mt-4 inline-flex items-center justify-center rounded-md border border-white/40 px-4 py-2 text-sm font-semibold text-white transition"
                                    >
                                        Parler à un hydraulicien
                                        <i className="fa-solid fa-arrow-right ms-2" />
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default ProduitDetails
