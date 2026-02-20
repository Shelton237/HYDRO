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
  const resolvedAbout = aboutSection
    ? {
        subtitle: aboutSection.subtitle ?? about?.subtitle ?? null,
        title: aboutSection.title ?? about?.title ?? null,
        highlight: about?.highlight ?? null,
        description: aboutSection.description ?? about?.description ?? null,
        background_image: aboutSection.image_path ?? about?.background_image ?? null,
        button_label: about?.button_label ?? null,
        button_url: about?.button_url ?? null,
        icon_one_title: about?.icon_one_title ?? null,
        icon_one_description: about?.icon_one_description ?? null,
        icon_two_title: about?.icon_two_title ?? null,
        icon_two_description: about?.icon_two_description ?? null,
        author_name: about?.author_name ?? null,
        author_title: about?.author_title ?? null,
        author_image: aboutSection.icon_path ?? about?.author_image ?? null,
      }
    : about ?? null;

  return (
    <div className="home-two-page">
      {shouldRender(heroSection) && <HeroTwo hero={hero} section={heroSection || undefined} />}
      {shouldRender(servicesSection) && <ServicesTwo services={services} section={servicesSection ?? undefined} />}
      {shouldRender(aboutSection) && <AboutTwo about={resolvedAbout} />}
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
