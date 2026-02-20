import { Link } from '@inertiajs/react';
import { motion } from 'motion/react';
import type { HomeSectionData } from '@/types/homeSection';

export type HeroContent = {
  kicker?: string | null;
  title?: string | null;
  description?: string | null;
  primary_label?: string | null;
  primary_url?: string | null;
  secondary_label?: string | null;
  secondary_url?: string | null;
  background_image?: string | null;
};

const HeroTwo = ({
  hero,
  section,
}: {
  hero?: HeroContent | null;
  section?: HomeSectionData;
}) => {
  const image =
    hero?.background_image || section?.image_path || '/img/hero/hero-4.jpg';
  const title =
    hero?.title || section?.title || 'Satisfaction assurée en hydraulique';
  const description =
    hero?.description ||
    section?.description ||
    'Accessoires hydrauliques, pièces d’engins, matériel de soudure, flexibles sur mesure et prestations livrés avec excellente qualité, réactivité et SAV assuré.';
  const kicker = hero?.kicker || section?.subtitle || 'Cameroun Hydraulique SARL';

  return (
    <section className="hero-section hero-2 fix bg-cover" style={{ backgroundImage: `url("${image}")` }}>
      <div className="container">
        <div className="row">
          <div className="col-lg-8">
            <div className="hero-content">
              {kicker && <span className="text-uppercase text-white">{kicker}</span>}
              <motion.h1
                initial={{ y: 40 }}
                animate={{ y: 0 }}
                transition={{
                  duration: 0.5,
                }}
              >
                {title}
              </motion.h1>
              <motion.p
                initial={{ y: 40 }}
                animate={{ y: 0 }}
                transition={{
                  duration: 0.5,
                  delay: 0.3,
                }}
              >
                {description}
              </motion.p>
              <motion.div
                initial={{ y: 40 }}
                animate={{ y: 0 }}
                transition={{
                  duration: 0.5,
                  delay: 0.6,
                }}
                className="hero-button"
              >
                {hero?.primary_label && hero?.primary_url && (
                  <Link href={hero.primary_url} className="theme-btn hover-white">
                    <span>
                      {hero.primary_label} <i className="fas fa-chevron-right" />
                    </span>
                  </Link>
                )}
                {hero?.secondary_label && hero?.secondary_url && (
                  <Link href={hero.secondary_url} className="theme-btn bg-white">
                    <span>
                      {hero.secondary_label} <i className="fas fa-chevron-right" />
                    </span>
                  </Link>
                )}
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroTwo;
