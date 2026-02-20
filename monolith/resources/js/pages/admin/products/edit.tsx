import ProductForm from '@/components/admin/ProductForm';
import AdminLayout from '@/Layouts/AdminLayout';
import type { ReactNode } from 'react';

type EditProps = {
  product: Record<string, any>;
};

const ProductEdit = ({ product }: EditProps) => {
  return (
    <section className="space-y-6">
      <header>
        <p className="admin-section-title">Edition produit</p>
        <h1 className="mt-2 text-2xl font-semibold text-slate-900">Modifier {product.name}</h1>
        <p className="mt-1 text-sm text-slate-500">
          Ajustez les informations du produit puis sauvegardez vos changements.
        </p>
      </header>
      <div className="admin-card p-6">
        <ProductForm
          initialValues={product}
          submitLabel="Mettre a jour"
          submitUrl={`/admin/products/${product.id}`}
          method="put"
        />
      </div>
    </section>
  );
};

ProductEdit.layout = (page: ReactNode) => <AdminLayout>{page}</AdminLayout>;

export default ProductEdit;
