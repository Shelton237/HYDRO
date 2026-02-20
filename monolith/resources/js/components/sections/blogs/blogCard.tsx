import { BlogPostDataType } from "@/types/blog"
import { Link } from "@inertiajs/react"

const BlogCard = ({ news, className }: { news: BlogPostDataType, className?: string }) => {
    return (
        <div className={`news-card-items ${className}`}>
            <div className="news-image">
                <img src={news.image} alt="news-img" />
                <div className="post-date">
                    <h3>
                        {news.date.day} <br />
                        <span>{news.date.month}</span>
                    </h3>
                </div>
            </div>
            <div className="news-content">
                <ul>
                    <li>
                        <i className="fa-regular fa-user" />
                        Par {news.author}
                    </li>
                    <li>
                        <i className="fa-solid fa-tag" />
                        {news.category}
                    </li>
                </ul>
                <h3>
                    <Link href={news.link}>{news.title}</Link>
                </h3>
                <Link href={news.link} className="theme-btn-2 mt-3">
                    En savoir plus
                    <i className="fa-solid fa-arrow-right-long" />
                </Link>
            </div>
        </div>
    )
}

export default BlogCard
