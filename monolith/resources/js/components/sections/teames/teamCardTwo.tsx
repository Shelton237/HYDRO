import { TeamMemberDataType } from "@/types/teamMember"
import { Link } from "@inertiajs/react"

const TeamCardTwo = ({ member }: { member: TeamMemberDataType }) => {
    return (
        <div className="single-team-items">
            <div className="team-image">
                <img src={member.image} alt="team-img" />
                <div className="social-profile">
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
                    <span className="plus-btn">
                        <i className="fas fa-share-alt" />
                    </span>
                </div>
            </div>
            <div className="team-content text-center">
                <h3>
                    <Link href="/team-details">{member.name}</Link>
                </h3>
                <p>{member.role}</p>
            </div>
        </div>
    )
}

export default TeamCardTwo
