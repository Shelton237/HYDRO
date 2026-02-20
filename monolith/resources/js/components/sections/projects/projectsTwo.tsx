import { projectsTwoData } from "@/db/projectsTwoData"
import { Autoplay, Navigation } from "swiper/modules"
import { Swiper, SwiperSlide } from "swiper/react"
import ProjectCard from "./projectCard"
import SectionTitle from "@/components/ui/sectionTitle"
import type { HomeSectionData } from "@/types/homeSection"

const ProjectsTwo = ({ section }: { section?: HomeSectionData }) => {
    return (
        <section id="projects" className="project-section-2 section-padding fix">
            <div className="left-shape">
                <img src="/img/project/left-shape.png" alt="shape-img" />
            </div>
            <div className="right-shape">
                <img src="/img/project/right-shape.png" alt="shape-img" />
            </div>
            <div className="container">
            <div className="section-title-area">
                <SectionTitle>
                    <SectionTitle.SubTitle>{section?.subtitle ?? 'Catalogue'}</SectionTitle.SubTitle>
                    {section?.title ? (
                        <SectionTitle.Title>{section.title}</SectionTitle.Title>
                    ) : (
                        <SectionTitle.Title>Nos produits hydrauliques</SectionTitle.Title>
                    )}
                </SectionTitle>
                {section?.description && (
                    <p className="mt-2 max-w-2xl text-sm text-slate-500">{section.description}</p>
                )}
                    <div className="array-button wow slideUp" data-delay=".5">
                        <button className="array-prev"><i className="fa fa-arrow-right" /></button>
                        <button className="array-next"><i className="fa fa-arrow-left" /></button>
                    </div>
                </div>
                <div className="project-wrapper">
                    <Swiper
                        spaceBetween={30}
                        speed={1500}
                        loop={true}
                        autoplay={{
                            delay: 1500,
                            disableOnInteraction: false,
                        }}
                        pagination={{
                            el: ".dot-2",
                            clickable: true,
                        }}
                        navigation={{
                            nextEl: ".array-prev",
                            prevEl: ".array-next",
                        }}
                        breakpoints={{
                            1199: {
                                slidesPerView: 3,
                            },
                            991: {
                                slidesPerView: 2,
                            },
                            767: {
                                slidesPerView: 2,
                            },

                            575: {
                                slidesPerView: 1,
                            },

                            0: {
                                slidesPerView: 1,
                            },
                        }}
                        modules={[Navigation, Autoplay]}
                    >

                        {projectsTwoData.map((project) => (
                            <SwiperSlide key={project.id}>
                                <ProjectCard project={project} className="style-2" iconCalss="icon" />
                            </SwiperSlide>
                        ))}

                    </Swiper>
                </div>
            </div>
        </section >

    )
}

export default ProjectsTwo
