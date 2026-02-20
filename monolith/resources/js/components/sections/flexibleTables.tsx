import SectionTitle from "@/components/ui/sectionTitle"

const jupeSizes = [
    { diameter: '1/4"', code: '06' },
    { diameter: '5/16"', code: '08' },
    { diameter: '3/8"', code: '10' },
    { diameter: '1/2"', code: '12' },
    { diameter: '5/8"', code: '16' },
    { diameter: '3/4"', code: '19' },
    { diameter: '1"', code: '25' },
    { diameter: '1-1/4"', code: '32' },
    { diameter: '1-1/2"', code: '38' },
    { diameter: '2"', code: '51' },
]

const flexibleReferences = [
    '2SN 06', '2SN 08', '2SN 10', '2SN 12', '2SN 16', '2SN 20', '2SN 25 (1")', '2SN 32', '2SN 38',
    '2SN 50', '4SP 10', '4SP 12', '4SP 16', '4SP 20', '4SP/4SH 25', '4SP/4SH 32', '4SP/4SH 38',
]

const FlexibleTables = () => {
    return (
        <section className="section-padding fix" id="flexibles">
            <div className="container">
                <SectionTitle className="text-center">
                    <SectionTitle.SubTitle>Table jupes & flexibles</SectionTitle.SubTitle>
                    <SectionTitle.Title>Références disponibles</SectionTitle.Title>
                </SectionTitle>
                <div className="row g-4 mt-4">
                    <div className="col-lg-6">
                        <div className="p-4 rounded-3 shadow-sm h-100 bg-white">
                            <h3 className="mb-3 text-center text-emerald-700">Jupes à sertir</h3>
                            <div className="table-responsive">
                                <table className="table table-striped mb-0">
                                    <thead>
                                        <tr>
                                            <th>Diamètre</th>
                                            <th>Référence (mm)</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {jupeSizes.map((item) => (
                                            <tr key={item.diameter}>
                                                <td>{item.diameter}</td>
                                                <td>{item.code}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-6">
                        <div className="p-4 rounded-3 shadow-sm h-100 bg-white">
                            <h3 className="mb-3 text-center text-emerald-700">Flexibles hydrauliques</h3>
                            <div className="row g-2">
                                {flexibleReferences.map((reference) => (
                                    <div className="col-sm-6" key={reference}>
                                        <div className="d-flex align-items-center rounded border px-3 py-2 text-slate-700">
                                            <i className="fa-solid fa-check text-emerald-500 me-2" />
                                            <span>{reference}</span>
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

export default FlexibleTables
