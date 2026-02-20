export type HomeSectionData = {
  id: number;
  identifier: string;
  label: string;
  is_visible: boolean;
  title?: string | null;
  subtitle?: string | null;
  description?: string | null;
  image_path?: string | null;
  icon_path?: string | null;
  metadata?: Record<string, unknown>;
};
