import AdminLayout from '@/Layouts/AdminLayout';
import { Link, router } from '@inertiajs/react';
import type { ReactNode } from 'react';
import { FormEvent, useState } from 'react';

type Product = {
  id: number;
  name: string;
  status: string;
  price: string;
  currency: string;
  stock: number;
  slug: string;
  updated_at: string;
};

type Paginated<T> = {
  data: T[];
  links: { url: string | null; label: string; active: boolean }[];
};

type IndexProps = {
  products: Paginated<Product>;
  filters: {
    search?: string | null;
  };
};

const ProductIndex = ({ products, filters }: IndexProps) => {
  const [search, setSearch] = useState(filters.search ?? '');

  const handleDelete = (id: number) => {
    if (confirm('Supprimer ce produit ?')) {
      router.delete(`/admin/products/${id}`);
    }
  };

  const handleSearch = (event: FormEvent) => {
    event.preventDefault();
    router.get(
      '/admin/products',
      { search },
      {
        preserveState: true,
        replace: true,
      },
    );
  };

  return (
    <section className="space-y-6">
      <header className="flex flex-col gap-4 rounded-2xl bg-white/60 px-5 py-6 shadow-sm ring-1 ring-slate-100 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="admin-section-title">Catalogue produits</p>
          <h1 className="mt-2 text-2xl font-semibold text-slate-900">Suivi des articles</h1>
          <p className="mt-1 text-sm text-slate-500">
            Creez, mettez a jour ou retirez les elements visibles dans votre front-office.
          </p>
        </div>
        <Link
          href="/admin/products/create"
          className="inline-flex items-center justify-center rounded-full bg-slate-900 px-5 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-slate-800"
        >
          Ajouter un produit
        </Link>
      </header>

      <form
        onSubmit={handleSearch}
        className="admin-card flex flex-col gap-4 px-5 py-5 md:flex-row md:items-end"
      >
        <label className="w-full text-sm font-semibold text-slate-700 md:w-2/3">
          Rechercher un nom ou un SKU
          <input
            type="search"
            placeholder="Ex: pompe, ref-458, etc."
            className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-2.5 text-sm focus:border-slate-900 focus:ring-2 focus:ring-slate-900/10"
            value={search ?? ''}
            onChange={(e) => setSearch(e.target.value)}
          />
        </label>
        <button
          type="submit"
          className="inline-flex w-full items-center justify-center rounded-2xl border border-slate-900 px-4 py-2.5 text-sm font-semibold text-slate-900 transition hover:bg-slate-900 hover:text-white md:w-auto"
        >
          Rechercher
        </button>
      </form>

      <div className="admin-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-slate-200 text-sm">
            <thead className="bg-slate-50 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
              <tr>
                <th className="px-4 py-3">Produit</th>
                <th className="px-4 py-3">Statut</th>
                <th className="px-4 py-3">Prix</th>
                <th className="px-4 py-3">Stock</th>
                <th className="px-4 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {products.data.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-4 py-8 text-center text-sm text-slate-400">
                    Aucun produit pour le moment.
                  </td>
                </tr>
              )}
              {products.data.map((product) => (
                <tr key={product.id}>
                  <td className="px-4 py-4">
                    <div className="font-semibold text-slate-900">{product.name}</div>
                    <div className="text-xs text-slate-500">{product.slug}</div>
                  </td>
                  <td className="px-4 py-4">
                    <StatusBadge status={product.status} />
                  </td>
                  <td className="px-4 py-4">
                    {Number(product.price).toLocaleString('fr-FR')} {product.currency}
                  </td>
                  <td className="px-4 py-4">{product.stock}</td>
                  <td className="px-4 py-4">
                    <div className="flex justify-end gap-2">
                      <Link
                        href={`/admin/products/${product.id}/edit`}
                        className="rounded-full border border-slate-200 px-3 py-1.5 text-xs font-semibold text-slate-700 transition hover:border-slate-900 hover:text-slate-900"
                      >
                        Modifier
                      </Link>
                      <button
                        type="button"
                        onClick={() => handleDelete(product.id)}
                        className="rounded-full border border-red-200 px-3 py-1.5 text-xs font-semibold text-red-600 transition hover:bg-red-50"
                      >
                        Supprimer
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {products.links.length > 1 && (
          <div className="border-t border-slate-100 bg-slate-50 px-4 py-3">
            <div className="flex flex-wrap gap-2 text-xs font-semibold text-slate-600">
              {products.links.map((link, index) => (
                <PaginationLink key={index} link={link} />
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

const StatusBadge = ({ status }: { status: string }) => {
  const variants: Record<string, string> = {
    active: 'bg-emerald-50 text-emerald-700',
    archived: 'bg-slate-100 text-slate-600',
    draft: 'bg-amber-50 text-amber-700',
  };

  const tone = variants[status] ?? variants.archived;

  return <span className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${tone}`}>{status}</span>;
};

const PaginationLink = ({ link }: { link: { url: string | null; label: string; active: boolean } }) => {
  const label = formatLabel(link.label);

  if (!link.url) {
    return <span className="rounded-full border border-slate-200 px-3 py-1 text-slate-400">{label}</span>;
  }

  return (
    <Link
      href={link.url}
      preserveScroll
      className={`rounded-full border px-3 py-1 transition ${
        link.active
          ? 'border-slate-900 bg-slate-900 text-white'
          : 'border-slate-200 text-slate-600 hover:border-slate-900 hover:text-slate-900'
      }`}
    >
      {label}
    </Link>
  );
};

const formatLabel = (label: string) =>
  label.replace(/&laquo;/g, '<<').replace(/&raquo;/g, '>>').replace(/&amp;/g, '&');

ProductIndex.layout = (page: ReactNode) => <AdminLayout>{page}</AdminLayout>;

export default ProductIndex;
