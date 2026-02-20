import { useForm } from '@inertiajs/react';
import { ChangeEvent, FormEvent, ReactNode, useEffect, useRef, useState } from 'react';

const toRenderableIcon = (value?: string | null) => {
  if (!value) {
    return null;
  }

  const trimmed = value.trim();
  if (!trimmed) {
    return null;
  }

  if (trimmed.startsWith('<svg')) {
    const encoded = encodeURIComponent(trimmed).replace(/'/g, '%27').replace(/"/g, '%22');
    return `data:image/svg+xml,${encoded}`;
  }

  return trimmed;
};

type ServiceFormValues = {
  title: string;
  slug?: string;
  description?: string;
  link_url?: string;
  animation_delay?: string;
  position: number;
  is_featured: boolean;
  icon_upload: File | null;
};

type ServiceFormInitialValues = Partial<ServiceFormValues> & {
  icon_path?: string | null;
};

type Props = {
  submitUrl: string;
  method?: 'post' | 'put';
  submitLabel?: string;
  initialValues?: ServiceFormInitialValues;
};

const defaultValues: ServiceFormValues = {
  title: '',
  slug: '',
  description: '',
  link_url: '/service-details',
  animation_delay: '.3',
  position: 1,
  is_featured: false,
  icon_upload: null,
};

const ServiceForm = ({ submitUrl, method = 'post', submitLabel = 'Enregistrer', initialValues }: Props) => {
  const { icon_path: initialIconPath, ...initialFormValues } = initialValues ?? {};
  const form = useForm<ServiceFormValues>({
    ...defaultValues,
    ...initialFormValues,
  });
  const fallbackIcon = toRenderableIcon(initialIconPath);
  const [iconPreview, setIconPreview] = useState<string | null>(fallbackIcon);
  const objectUrlRef = useRef<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    return () => {
      if (objectUrlRef.current) {
        URL.revokeObjectURL(objectUrlRef.current);
      }
    };
  }, []);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (method === 'put') {
      form.transform((data) => ({
        ...data,
        _method: 'put',
      }));
    } else {
      form.transform((data) => data);
    }

    form.post(submitUrl, { forceFormData: true });
  };

  const inputClass = (field: keyof ServiceFormValues) =>
    [
      'mt-1 block w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-900 focus:border-slate-900 focus:ring-1 focus:ring-slate-900/20',
      form.errors[field] ? 'border-red-400 focus:border-red-500 focus:ring-red-200' : '',
    ].join(' ');

  const resetUpload = () => {
    form.setData('icon_upload', null);
    if (objectUrlRef.current) {
      URL.revokeObjectURL(objectUrlRef.current);
      objectUrlRef.current = null;
    }
    setIconPreview(fallbackIcon);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] ?? null;
    if (!file) {
      resetUpload();
      return;
    }

    form.setData('icon_upload', file);

    if (objectUrlRef.current) {
      URL.revokeObjectURL(objectUrlRef.current);
      objectUrlRef.current = null;
    }

    const objectUrl = URL.createObjectURL(file);
    objectUrlRef.current = objectUrl;
    setIconPreview(objectUrl);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6" encType="multipart/form-data">
      <div className="grid gap-4 md:grid-cols-2">
        <Field label="Titre" error={form.errors.title}>
          <input
            type="text"
            name="title"
            className={inputClass('title')}
            value={form.data.title}
            onChange={(e) => form.setData('title', e.target.value)}
          />
        </Field>
        <Field label="Slug" error={form.errors.slug}>
          <input
            type="text"
            name="slug"
            className={inputClass('slug')}
            value={form.data.slug ?? ''}
            onChange={(e) => form.setData('slug', e.target.value)}
            placeholder="services-we-offer"
          />
        </Field>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Field label={"Icône"} error={form.errors.icon_upload}>
          <div className="space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-slate-500">
              <p>PNG, SVG ou WebP - 5 Mo max - format carré recommandé.</p>
              {form.data.icon_upload && (
                <button type="button" onClick={resetUpload} className="font-semibold text-emerald-700 hover:text-emerald-900">
                  Annuler la sélection
                </button>
              )}
            </div>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              name="icon_upload"
              className="block w-full cursor-pointer rounded-xl border border-dashed border-slate-300 bg-white px-4 py-2 text-sm text-slate-700 file:me-4 file:rounded-xl file:border-none file:bg-slate-100 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-slate-700"
              onChange={handleFileChange}
            />
            {iconPreview ? (
              <div className="flex items-center gap-3 rounded-xl border border-slate-100 bg-slate-50 p-3">
                <img src={iconPreview} alt={"Prévisualisation"} className="h-12 w-12 rounded-md border border-slate-200 object-cover" />
                <div className="text-xs text-slate-500">
                  <p className="font-semibold text-slate-700">{"Aperçu actuel"}</p>
                  <p>Cette image sera affichée sur la carte service.</p>
                </div>
              </div>
            ) : (
              <p className="text-xs text-slate-400">Aucune icône n'est encore définie pour ce service.</p>
            )}
          </div>
        </Field>

        <Field label="Lien" error={form.errors.link_url}>
          <input
            type="text"
            name="link_url"
            className={inputClass('link_url')}
            value={form.data.link_url ?? ''}
            onChange={(e) => form.setData('link_url', e.target.value)}
            placeholder="/contact"
          />
        </Field>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Field label="Ordre d'affichage" error={form.errors.position}>
          <input
            type="number"
            name="position"
            className={inputClass('position')}
            value={form.data.position}
            min={1}
            onChange={(e) => form.setData('position', Number(e.target.value) || 1)}
          />
        </Field>
        <Field label={"Délai d'animation (.3, .5, etc.)"} error={form.errors.animation_delay}>
          <input
            type="text"
            name="animation_delay"
            className={inputClass('animation_delay')}
            value={form.data.animation_delay ?? ''}
            onChange={(e) => form.setData('animation_delay', e.target.value)}
            placeholder=".3"
          />
        </Field>
      </div>

      <Field label="Description" error={form.errors.description}>
        <textarea
          name="description"
          className={inputClass('description')}
          value={form.data.description ?? ''}
          rows={4}
          onChange={(e) => form.setData('description', e.target.value)}
        />
      </Field>

      <label className="flex items-center gap-3 text-sm font-semibold text-slate-700">
        <input
          type="checkbox"
          name="is_featured"
          checked={form.data.is_featured}
          onChange={(e) => form.setData('is_featured', e.target.checked)}
          className="h-4 w-4 rounded border-slate-300 text-slate-900 focus:ring-slate-900/30"
        />
        Mettre ce service en avant
      </label>

      <div className="flex justify-end pt-4">
        <button
          type="submit"
          className="inline-flex items-center rounded-full bg-slate-900 px-6 py-2 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:bg-slate-400"
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
    {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
  </label>
);

export default ServiceForm;
