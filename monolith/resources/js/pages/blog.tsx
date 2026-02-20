import BlogCard from '@/components/sections/blogs/blogCard';
import PageTitle from '@/components/sections/pageTitle';
import Pagination from '@/components/ui/pagination';
import { blogPostsTwoData } from '@/db/blogPostsTwoData';
import RootLayout from '@/layout/root';
import type { ReactNode } from 'react';

const Blog = () => {
  return (
    <>
      <PageTitle currentPage="Actualités" title="Actualités" />
      <section className="news-section-4 fix section-padding">
        <div className="container">
          <div className="row g-4">
            {blogPostsTwoData.map((news) => (
              <div
                key={news.id}
                className="col-xl-4 col-lg-6 col-md-6 wow slideUp"
                data-delay=".3"
              >
                <BlogCard news={news} className="style-2 mt-0 pb-0" />
              </div>
            ))}
          </div>
          <Pagination />
        </div>
      </section>
    </>
  );
};

Blog.layout = (page: ReactNode) => <RootLayout>{page}</RootLayout>;

export default Blog;
