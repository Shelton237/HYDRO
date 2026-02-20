import PageTitle from "@/components/sections/pageTitle"
import ProjectCard from "@/components/sections/projects/projectCard"
import SectionHeader from "@/components/ui/SectionHeader"
import type { ProductListItem } from "@/types/product"

type Props = {
  products: ProductListItem[]
}

const CatalogueHydraulique = ({ products }: Props) => {
  return (
    <>
      <PageTitle title="Catalogue Hydraulique" currentPage="Nos produits hydrauliques" />
      <section className="project-section section-padding fix">
        <div className="container space-y-8">
          <SectionHeader
            eyebrow="Catalogue Cameroun Hydraulique"
            title="Flexibles, accessoires et pièces prêts à livrer"
            description="Plus de 1 500 références : flexibles hydrauliques, jupes, embouts, coupleurs, durites et vannes conformes EN & ISO."
            badge="Livraison 24h"
            />

          <div className="row g-4">
            {products.map((product) => (
              <div key={product.slug} className="col-xl-4 col-lg-6 col-md-6 wow slideUp" data-delay=".3">
                <ProjectCard product={product} className="style-2" iconCalss="arrow-icon" />
              </div>
            ))}

            {products.length === 0 && (
              <div className="col-12">
                <p className="text-center text-slate-500">Aucun produit hydraulique actif pour le moment.</p>
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  )
}

export default CatalogueHydraulique

