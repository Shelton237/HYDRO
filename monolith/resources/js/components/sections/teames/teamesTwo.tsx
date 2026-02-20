import SectionTitle from "@/components/ui/sectionTitle"
import { teamMembersTwoData } from "@/db/teamMembersTwoData"
import { Link } from "@inertiajs/react"
import type { HomeSectionData } from "@/types/homeSection"

const TeamesTwo = ({ isTitleShow, section }: { isTitleShow: boolean; section?: HomeSectionData }) => {
    const backgroundImage = section?.image_path ?? "/img/team/bg.jpg"

    const renderDescription = (description?: string) => {
        if (!description) {
            return null
        }

        const items = description.split('\n').map((line) => line.trim()).filter(Boolean)

        if (!items.length) {
            return null
        }

        return (
            <ul className="text-left text-sm text-white/80 mt-2">
                {items.map((item) => (
                    <li key={item} className="mb-1 flex items-center gap-2">
                        <i className="fa-solid fa-circle-check text-emerald-400" />
                        <span>{item}</span>
                    </li>
                ))}
            </ul>
        )
    }

    return (
        <section id="team" className="team-section-2 section-padding bg-cover" style={{ backgroundImage: `url("${backgroundImage}")` }}>
            <div className="container">
                {
                    isTitleShow &&
                    <div className="section-title-area">
                        <SectionTitle>
                            <SectionTitle.SubTitle>{section?.subtitle ?? 'Départements'}</SectionTitle.SubTitle>
                            <SectionTitle.Title>{section?.title ?? 'Nos pôles et ateliers'}</SectionTitle.Title>
                        </SectionTitle>
                        {section?.description && <p className="text-sm text-slate-500">{section.description}</p>}
                        <Link href="/team" className="theme-btn wow slideUp" data-delay=".5">
                            Tous nos départements
                            <i className="fa-solid fa-arrow-right-long" />
                        </Link>
                    </div>
                }
                <div className="row">
                    {teamMembersTwoData.map((member) => (
                        <div
                            key={member.id}
                            className="col-xl-4 col-lg-4 col-md-6 wow slideUp"
                            data-delay={member.delay}
                        >
                            <div className="team-card-items">
                                <div className="team-image">
                                    <img src={member.image} alt="team-img" />
                                    <div className="social-profile">
                                        <span className="plus-btn">
                                            <i className="fas fa-share-alt" />
                                        </span>
                                        <ul>
                                            {member.socialLinks.map(({ icon, link }) => (
                                                <li key={icon}>
                                                    {link ? (
                                                        <Link href={link}>
                                                            <i className={icon} />
                                                        </Link>
                                                    ) : (
                                                        <span aria-hidden="true">
                                                            <i className={icon} />
                                                        </span>
                                                    )}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                                <div className="team-content text-center">
                                    <h3>
                                        <Link href="/team-details">{member.name}</Link>
                                    </h3>
                                    <p>{member.role}</p>
                                    {renderDescription(member.description)}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>

    )
}

export default TeamesTwo
