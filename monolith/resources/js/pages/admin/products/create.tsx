import ProductForm from '@/components/admin/ProductForm';
import AdminLayout from '@/Layouts/AdminLayout';
import type { ReactNode } from 'react';

const ProductCreate = () => {
  return (
    <section className="space-y-6">
      <header>
        <p className="admin-section-title">Nouveau produit</p>
        <h1 className="mt-2 text-2xl font-semibold text-slate-900">Ajouter un element au catalogue</h1>
        <p className="mt-1 text-sm text-slate-500">
          Renseignez les informations produit puis validez pour le publier dans le backoffice.
        </p>
      </header>
      <div className="admin-card p-6">
        <ProductForm submitLabel="Creer le produit" submitUrl="/admin/products" />
      </div>
    </section>
  );
};

ProductCreate.layout = (page: ReactNode) => <AdminLayout>{page}</AdminLayout>;

export default ProductCreate;
