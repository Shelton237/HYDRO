import { partnersData } from "@/db/partnersData"
import { Swiper, SwiperSlide } from "swiper/react"
import { Autoplay } from "swiper/modules"
import 'swiper/css';
import type { HomeSectionData } from "@/types/homeSection"

const PartnersSection = ({ className, section }: { className?: string; section?: HomeSectionData }) => {
    return (
        <div className={`brand-section fix section-padding ${className}`}>
            <div className="container">
                <div className="brand-wrapper">
                    <h6 className="text-center wow slideUp" data-delay=".3">
                        {section?.subtitle ?? 'Partenaires & clients'}
                    </h6>
                    {section?.title && (
                        <p className="text-center text-sm text-slate-500">{section.title}</p>
                    )}
                    <Swiper
                        breakpoints={{
                            1199: {
                                slidesPerView: 5,
                            },
                            991: {
                                slidesPerView: 4,
                            },
                            767: {
                                slidesPerView: 3,
                            },
                            575: {
                                slidesPerView: 2,
                            },
                            0: {
                                slidesPerView: 1,
                            },
                        }}
                        spaceBetween={30}
                        speed={1300}
                        centeredSlides
                        loop
                        autoplay={{
                            delay: 2000,
                            disableOnInteraction: false,
                        }}
                        modules={[Autoplay]}
                    >
                        {partnersData.map(({ id, img, name }) => (
                            <SwiperSlide key={id}>
                                <div className="brand-image d-flex align-items-center justify-content-center text-center">
                                    {img ? (
                                        <img src={img} alt={name ?? 'brand-img'} />
                                    ) : (
                                        <span className="brand-name text-uppercase tracking-[0.3em] text-white/70">
                                            {name}
                                        </span>
                                    )}
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            </div>
        </div>
    )
}

export default PartnersSection
