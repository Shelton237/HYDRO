export type ProductListItem = {
  name: string;
  slug: string;
  sku?: string | null;
  excerpt?: string | null;
  image_url?: string | null;
  price?: number | null;
  currency?: string | null;
  stock?: number | null;
};

export type ProductDetail = ProductListItem & {
  description?: string | null;
};
