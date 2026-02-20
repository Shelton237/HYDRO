import AboutTwo, { type AboutContent } from '@/components/sections/about/aboutTwo';
import AchievementTwo from '@/components/sections/achievements/achievementTwo';
import BlogsTwo from '@/components/sections/blogs/blogsTwo';
import ChooseUs from '@/components/sections/chooseUs';
import HomeContact from '@/components/sections/contact/homeContact';
import HeroTwo, { type HeroContent } from '@/components/sections/heros/heroTwo';
import MarqueeTicker from '@/components/sections/marques/marqueeTicker';
import Offer from '@/components/sections/offer';
import PartnersSection from '@/components/sections/partners/partnersSection';
import ProjectsTwo from '@/components/sections/projects/projectsTwo';
import ServicesTwo from '@/components/sections/services/servicesTwo';
import TeamesTwo from '@/components/sections/teames/teamesTwo';
import TestimonialTwo from '@/components/sections/testimonials/testimonialTwo';
import WorkProcess from '@/components/sections/workProcess';
import FlexibleTables from '@/components/sections/flexibleTables';
import ItinerarySection from '@/components/sections/itinerary';
import LayoutTwo from '@/layout/layoutTwo';
import type { HomeSectionData } from '@/types/homeSection';
import type { ReactNode } from 'react';

type ServiceRecord = {
  id: number | string;
  title: string;
  description?: string | null;
  icon_path?: string | null;
  link_url?: string | null;
  animation_delay?: string | null;
  is_featured?: boolean | null;
};

type Props = {
  hero?: HeroContent | null;
  services?: ServiceRecord[];
  about?: AboutContent | null;
  homeSections?: Record<string, HomeSectionData>;
};

const shouldRender = (section?: HomeSectionData | null) => section ? section.is_visible : true;

const HomeTwo = ({ hero, services = [], about, homeSections = {} }: Props) => {
  const sections = homeSections;
  const heroSection = sections.hero ?? null;
  const servicesSection = sections.services ?? null;
  const aboutSection = sections.about ?? null;
  const marqueSection = sections.marque ?? null;
  const offerSection = sections.offer ?? null;
  const projectsSection = sections.projects ?? null;
  const partnersSection = sections.partners ?? null;
  const teamsSection = sections.teams ?? null;
  const chooseUsSection = sections.choose_us ?? null;
  const achievementSection = sections.achievement ?? null;
  const homeContactSection = sections.home_contact ?? null;
  const testimonialSection = sections.testimonial ?? null;
  const blogsSection = sections.blogs ?? null;
  return (
    <div className="home-two-page">
      {shouldRender(heroSection) && <HeroTwo hero={hero} section={heroSection || undefined} />}
      {shouldRender(servicesSection) && <ServicesTwo services={services} section={servicesSection ?? undefined} />}
      {shouldRender(aboutSection) && <AboutTwo about={about} />}
      {shouldRender(marqueSection) && <MarqueeTicker />}
      {shouldRender(offerSection) && <Offer section={offerSection ?? undefined} />}
      <WorkProcess />
      {shouldRender(projectsSection) && <ProjectsTwo section={projectsSection ?? undefined} />}
      <FlexibleTables />
      {shouldRender(partnersSection) && (
        <PartnersSection className="section-bg" section={partnersSection ?? undefined} />
      )}
      {shouldRender(teamsSection) && (
        <TeamesTwo isTitleShow section={teamsSection ?? undefined} />
      )}
      {shouldRender(chooseUsSection) && (
        <ChooseUs section={chooseUsSection ?? undefined} />
      )}
      {shouldRender(achievementSection) && (
        <AchievementTwo
          achievementWrapperClass="style-2"
          className="section-bg-2"
          section={achievementSection ?? undefined}
        />
      )}
      {shouldRender(homeContactSection) && (
        <HomeContact section={homeContactSection ?? undefined} />
      )}
      <ItinerarySection />
      {shouldRender(testimonialSection) && (
        <TestimonialTwo section={testimonialSection ?? undefined} />
      )}
      {shouldRender(blogsSection) && (
        <BlogsTwo section={blogsSection ?? undefined} />
      )}
    </div>
  );
};

HomeTwo.layout = (page: ReactNode) => <LayoutTwo>{page}</LayoutTwo>;

export default HomeTwo;
