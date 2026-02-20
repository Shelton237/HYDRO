import { workProcessData } from "@/db/workProcessData"
import SectionTitle from "../ui/sectionTitle"

const WorkProcess = () => {
    return (
        <section className="work-process-section fix section-padding pt-4">
            <div className="container">
                <SectionTitle className="text-center">
                    <SectionTitle.SubTitle>Flexibles hydrauliques sur mesure</SectionTitle.SubTitle>
                    <SectionTitle.Title>Processus de confection</SectionTitle.Title>
                </SectionTitle>
                <div className="process-work-wrapper">
                    <div className="line-shape">
                        <img src="/img/process/linepng.png" alt="img" />
                    </div>
                    <div className="row">
                        {workProcessData.map((process, index) => (
                            <div key={process.id} className="col-xl-4 col-lg-4 col-md-6">
                                <div className={`work-process-items text-center  d-flex ${index % 2 === 0 ? 'flex-column' : 'flex-xl-column-reverse flex-column'}`} >
                                    <div className={`icon`}>
                                        <img src={process.icon} alt="img" />
                                        <h6 className="number">{process.id}</h6>
                                    </div>
                                    <div className={`content ${process.style || ''}`}>
                                        <h4>{process.title}</h4>
                                        <p>{process.description}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>

    )
}

export default WorkProcess
