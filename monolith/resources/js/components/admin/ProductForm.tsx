import { useForm } from '@inertiajs/react';
import { FormEvent, ReactNode } from 'react';

type ProductFormValues = {
  name: string;
  slug?: string | null;
  sku?: string | null;
  status: string;
  currency: string;
  price: number;
  stock: number;
  image_url?: string | null;
  excerpt?: string | null;
  description?: string | null;
};

type ProductFormProps = {
  initialValues?: Partial<ProductFormValues>;
  submitLabel?: string;
  submitUrl: string;
  method?: 'post' | 'put';
};

const defaultValues: ProductFormValues = {
  name: '',
  slug: '',
  sku: '',
  status: 'draft',
  currency: 'XAF',
  price: 0,
  stock: 0,
  image_url: '',
  excerpt: '',
  description: '',
};

const ProductForm = ({
  initialValues,
  submitLabel = 'Enregistrer',
  submitUrl,
  method = 'post',
}: ProductFormProps) => {
  const form = useForm<ProductFormValues>({
    ...defaultValues,
    ...initialValues,
  });

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    method === 'put' ? form.put(submitUrl) : form.post(submitUrl);
  };

  const inputClass = (field: keyof ProductFormValues) =>
    [
      'mt-1 block w-full rounded-2xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-900 shadow-sm transition focus:border-slate-900 focus:ring-2 focus:ring-slate-900/10',
      form.errors[field] ? 'border-red-400 focus:border-red-500 focus:ring-red-200' : '',
    ].join(' ');

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2">
        <Field label="Nom *" error={form.errors.name}>
          <input
            className={inputClass('name')}
            value={form.data.name}
            onChange={(e) => form.setData('name', e.target.value)}
            required
          />
        </Field>
        <Field label="Slug" error={form.errors.slug}>
          <input
            className={inputClass('slug')}
            value={form.data.slug ?? ''}
            onChange={(e) => form.setData('slug', e.target.value)}
          />
        </Field>
        <Field label="SKU" error={form.errors.sku}>
          <input
            className={inputClass('sku')}
            value={form.data.sku ?? ''}
            onChange={(e) => form.setData('sku', e.target.value)}
          />
        </Field>
        <Field label="Statut" error={form.errors.status}>
          <select
            className={inputClass('status')}
            value={form.data.status}
            onChange={(e) => form.setData('status', e.target.value)}
          >
            <option value="draft">Brouillon</option>
            <option value="active">Actif</option>
            <option value="archived">Archive</option>
          </select>
        </Field>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Field label="Devise" error={form.errors.currency}>
          <input
            className={inputClass('currency')}
            value={form.data.currency}
            maxLength={3}
            onChange={(e) => form.setData('currency', e.target.value.toUpperCase())}
          />
        </Field>
        <Field label="Prix" error={form.errors.price}>
          <input
            type="number"
            step="0.01"
            className={inputClass('price')}
            value={form.data.price}
            onChange={(e) => form.setData('price', Number(e.target.value))}
          />
        </Field>
        <Field label="Stock" error={form.errors.stock}>
          <input
            type="number"
            className={inputClass('stock')}
            value={form.data.stock}
            onChange={(e) => form.setData('stock', Number(e.target.value))}
          />
        </Field>
      </div>

      <Field label="Image (URL)" error={form.errors.image_url}>
        <input
          className={inputClass('image_url')}
          value={form.data.image_url ?? ''}
          onChange={(e) => form.setData('image_url', e.target.value)}
        />
      </Field>
      <Field label="Resume" error={form.errors.excerpt}>
        <textarea
          className={inputClass('excerpt')}
          value={form.data.excerpt ?? ''}
          rows={3}
          onChange={(e) => form.setData('excerpt', e.target.value)}
        />
      </Field>
      <Field label="Description detaillee" error={form.errors.description}>
        <textarea
          className={inputClass('description')}
          value={form.data.description ?? ''}
          rows={6}
          onChange={(e) => form.setData('description', e.target.value)}
        />
      </Field>

      <div className="flex justify-end pt-4">
        <button
          className="inline-flex items-center justify-center rounded-full bg-slate-900 px-6 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:bg-slate-400"
          disabled={form.processing}
        >
          {form.processing ? 'Enregistrement...' : submitLabel}
        </button>
      </div>
    </form>
  );
};

const Field = ({ label, error, children }: { label: string; error?: string; children: ReactNode }) => (
  <label className="text-sm font-semibold text-slate-700">
    {label}
    {children}
    {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
  </label>
);

export default ProductForm;
