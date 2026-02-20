import AboutTwo, { type AboutContent } from "@/components/sections/about/aboutTwo";
import MarqueTwo from "@/components/sections/marques/marqueTwo";
import PartnersSection from "@/components/sections/partners/partnersSection";
import ProjectsTwo from "@/components/sections/projects/projectsTwo";
import Offer from "@/components/sections/offer";
import PageTitle from "@/components/sections/pageTitle";
import TeamesTwo from "@/components/sections/teames/teamesTwo";
import RootLayout from "@/layout/root";
import WorkProcess from "@/components/sections/workProcess";
import FlexibleTables from "@/components/sections/flexibleTables";
import type { ReactNode } from "react";

type Props = {
  about?: AboutContent | null;
};

const About = ({ about }: Props) => {
  return (
    <>
      <PageTitle title="À propos" currentPage="À propos" />
      <AboutTwo about={about} />
      <Offer />
      <WorkProcess />
      <ProjectsTwo />
      <FlexibleTables />
      <MarqueTwo className="section-padding" />
      <TeamesTwo isTitleShow />
      <PartnersSection />
    </>
  );
};

About.layout = (page: ReactNode) => <RootLayout>{page}</RootLayout>;

export default About;
