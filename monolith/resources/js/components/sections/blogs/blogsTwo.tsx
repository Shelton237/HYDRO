import { blogPostsTwoData } from "@/db/blogPostsTwoData"
import BlogCard from "./blogCard"
import SectionTitle from "@/components/ui/sectionTitle"
import { Link } from "@inertiajs/react"
import type { HomeSectionData } from "@/types/homeSection"

const BlogsTwo = ({ section }: { section?: HomeSectionData }) => {
  return (
    <section id="blog" className="news-section fix section-padding">
      <div className="container">
        <div className="section-title-area">
          <SectionTitle>
            <SectionTitle.SubTitle>{section?.subtitle ?? "Actualités"}</SectionTitle.SubTitle>
            <SectionTitle.Title>{section?.title ?? "Notes Atelier & Conseils"}</SectionTitle.Title>
          </SectionTitle>
          {section?.description && (
            <p className="text-sm text-slate-500">{section.description}</p>
          )}
          <Link href="/news" className="theme-btn wow slideUp" data-delay=".5">
            Voir toutes les actualités
            <i className="fa-solid fa-arrow-right-long" />
          </Link>
        </div>
        <div className="row">
          {blogPostsTwoData.map((news) => (
            <div
              key={news.id}
              className="col-xl-4 col-lg-6 col-md-6 wow slideUp"
              data-delay={news.delay}
            >
              <BlogCard news={news} />
            </div>
          ))}
        </div>
      </div>
    </section>

  )
}

export default BlogsTwo
