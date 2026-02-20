import SectionTitle from "@/components/ui/sectionTitle"

const itineraryPoints = [
    'CAMEROUN HYDRAULIQUE',
    'Station MRS',
    'Marché Nkolouloun',
    'Gendarmerie Nkolouloun',
    'Boulangerie de luxe',
    'Vers terminus',
    'Venant du marché Nkolouloun',
]

const ItinerarySection = () => {
    return (
        <section className="section-padding section-bg" id="itineraire">
            <div className="container">
                <SectionTitle className="text-center">
                    <SectionTitle.SubTitle>Itinéraire</SectionTitle.SubTitle>
                    <SectionTitle.Title>Repères pour accéder à l’atelier</SectionTitle.Title>
                </SectionTitle>
                <div className="row justify-content-center">
                    <div className="col-lg-10">
                        <div className="itinerary-card p-4 rounded-3 bg-white shadow-sm">
                            <p className="text-sm text-slate-600 mb-3">
                                Situé entre Texaco Nkolouloun et Carrefour Photo Golden (face Boulangerie de luxe), à proximité des repères suivants :
                            </p>
                            <div className="row g-3">
                                {itineraryPoints.map((point) => (
                                    <div className="col-sm-6" key={point}>
                                        <div className="d-flex align-items-center gap-3 border rounded px-3 py-2">
                                            <i className="fa-solid fa-location-dot text-emerald-500" />
                                            <span className="text-slate-800">{point}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default ItinerarySection
