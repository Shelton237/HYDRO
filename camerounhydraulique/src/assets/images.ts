// Do not edit manually

export const IMAGES = {
  AGRICULTURAL_TRACTOR_1_7: "/images/agricultural_tractor_1.jpeg",
  AGRICULTURAL_TRACTOR_2_8: "/images/agricultural_tractor_2.jpeg",
  CONSTRUCTION_EQUIPMENT_1_4: "/images/construction_equipment_1.jpeg",
  CONSTRUCTION_EQUIPMENT_2_5: "/images/construction_equipment_2.webp",
  CONSTRUCTION_EQUIPMENT_3_6: "/images/construction_equipment_3.jpeg",
  HYDRAULIC_HERO_1_1: "/images/hydraulic_hero_1.jpeg",
  HYDRAULIC_HERO_2_2: "/images/hydraulic_hero_2.png",
  HYDRAULIC_HERO_3_3: "/images/hydraulic_hero_3.jpeg",
  INDUSTRIAL_TEAM_1_9: "/images/industrial_team_1.jpeg",
  INDUSTRIAL_TEAM_2_10: "/images/industrial_team_2.jpeg",
} as const;

export type ImageKey = keyof typeof IMAGES;
