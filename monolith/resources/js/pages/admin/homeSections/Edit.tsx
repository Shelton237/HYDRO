import AdminLayout from '@/layouts/AdminLayout';
import { Head, useForm } from '@inertiajs/react';
import type { ChangeEvent, FormEvent, ReactNode } from 'react';

type SectionRow = {
  id: number;
  identifier: string;
  label: string;
  is_visible: boolean;
  title?: string | null;
  subtitle?: string | null;
  description?: string | null;
  image_path?: string | null;
  icon_path?: string | null;
};

type Props = {
  sections: SectionRow[];
  needsMigration?: boolean;
};

type SectionFormData = {
  is_visible: boolean;
  title: string;
  subtitle: string;
  description: string;
  image_path: string;
  icon_path: string;
  image_upload: File | null;
  icon_upload: File | null;
  _method?: string;
};

const SectionEditor = ({ section }: { section: SectionRow }) => {
  const form = useForm<SectionFormData>({
    is_visible: section.is_visible,
    title: section.title ?? '',
    subtitle: section.subtitle ?? '',
    description: section.description ?? '',
    image_path: section.image_path ?? '',
    icon_path: section.icon_path ?? '',
    image_upload: null,
    icon_upload: null,
  });

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    form.transform((data) => ({
      ...data,
      _method: 'put',
    }));

    form.post(`/admin/home-sections/${section.identifier}`, {
      forceFormData: true,
    });
  };

  const handleFileChange = (field: 'image_upload' | 'icon_upload') => (event: ChangeEvent<HTMLInputElement>) => {
    form.setData(field, event.target.files?.[0] ?? null);
  };

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-slate-500">{section.label}</p>
            <p className="text-sm text-slate-600">Identifiant: {section.identifier}</p>
          </div>
          <label className="inline-flex items-center gap-2 text-sm text-slate-600">
            <input
              type="checkbox"
              checked={form.data.is_visible}
              onChange={(event) => form.setData('is_visible', event.target.checked)}
              className="h-4 w-4 rounded border-slate-300 text-emerald-600 focus:ring-0"
            />
            Visible sur la page d’accueil
          </label>
        </div>

        <div className="grid gap-3 md:grid-cols-2">
          <label className="text-xs font-semibold text-slate-700">
            Sous-titre
            <input
              className="mt-2 w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
              value={form.data.subtitle}
              onChange={(event) => form.setData('subtitle', event.target.value)}
            />
            {form.errors.subtitle && <p className="mt-1 text-xs font-semibold text-red-600">{form.errors.subtitle}</p>}
          </label>
          <label className="text-xs font-semibold text-slate-700">
            Titre
            <input
              className="mt-2 w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
              value={form.data.title}
              onChange={(event) => form.setData('title', event.target.value)}
            />
            {form.errors.title && <p className="mt-1 text-xs font-semibold text-red-600">{form.errors.title}</p>}
          </label>
        </div>

        <label className="text-xs font-semibold text-slate-700">
          Description
          <textarea
            rows={2}
            className="mt-2 w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
            value={form.data.description}
            onChange={(event) => form.setData('description', event.target.value)}
          />
          {form.errors.description && <p className="mt-1 text-xs font-semibold text-red-600">{form.errors.description}</p>}
        </label>

        <div className="grid gap-3 md:grid-cols-2">
          <label className="text-xs font-semibold text-slate-700">
            Lien image
            <input
              className="mt-2 w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
              value={form.data.image_path}
              onChange={(event) => form.setData('image_path', event.target.value)}
              placeholder="Ex: /img/section/bg.jpg"
            />
            {section.image_path && (
              <p className="mt-1 text-xs text-slate-400">
                Image actuelle : <span className="text-emerald-600">{section.image_path}</span>
              </p>
            )}
            {form.errors.image_path && <p className="mt-1 text-xs font-semibold text-red-600">{form.errors.image_path}</p>}
          </label>
          <label className="text-xs font-semibold text-slate-700">
            Lien icône
            <input
              className="mt-2 w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
              value={form.data.icon_path}
              onChange={(event) => form.setData('icon_path', event.target.value)}
              placeholder="Ex: /img/icons/light.svg"
            />
            {section.icon_path && (
              <p className="mt-1 text-xs text-slate-400">
                Icône actuelle : <span className="text-emerald-600">{section.icon_path}</span>
              </p>
            )}
            {form.errors.icon_path && <p className="mt-1 text-xs font-semibold text-red-600">{form.errors.icon_path}</p>}
          </label>
        </div>

        <div className="grid gap-3 md:grid-cols-2">
          <label className="text-xs font-semibold text-slate-700">
            Importer une image
            <input
              type="file"
              accept="image/*"
              className="mt-2 w-full rounded-md border border-dashed border-slate-300 px-3 py-2 text-sm text-slate-500"
              onChange={handleFileChange('image_upload')}
            />
            {form.data.image_upload && <p className="mt-1 text-xs text-slate-500">Sélectionné : {form.data.image_upload.name}</p>}
            {form.errors.image_upload && <p className="mt-1 text-xs font-semibold text-red-600">{form.errors.image_upload}</p>}
          </label>
          <label className="text-xs font-semibold text-slate-700">
            Importer une icône
            <input
              type="file"
              accept="image/*"
              className="mt-2 w-full rounded-md border border-dashed border-slate-300 px-3 py-2 text-sm text-slate-500"
              onChange={handleFileChange('icon_upload')}
            />
            {form.data.icon_upload && <p className="mt-1 text-xs text-slate-500">Sélectionné : {form.data.icon_upload.name}</p>}
            {form.errors.icon_upload && <p className="mt-1 text-xs font-semibold text-red-600">{form.errors.icon_upload}</p>}
          </label>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={form.processing}
            className="inline-flex items-center rounded-md bg-[#0f2d19] px-5 py-2.5 text-xs font-semibold uppercase tracking-[0.3em] text-white transition hover:bg-[#0d2415] disabled:opacity-50"
          >
            {form.processing ? 'Enregistrement…' : 'Mettre à jour'}
          </button>
        </div>
      </form>
    </div>
  );
};

const HomeSectionsEdit = ({ sections, needsMigration = false }: Props) => {
  return (
    <section className="space-y-6">
      <Head title="Sections de la page d’accueil" />
      <header className="border-b border-slate-200 pb-5">
        <p className="text-xs uppercase tracking-[0.35em] text-slate-500">Page d’accueil</p>
        <h1 className="mt-3 text-2xl font-semibold text-slate-900">Contrôles des sections</h1>
        <p className="mt-2 max-w-3xl text-sm text-slate-500">
          Affichez/masquez chaque section et définissez les textes, images et icônes associées aux en-têtes.
        </p>
      </header>

      {needsMigration && (
        <div className="rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900">
          La table <span className="font-semibold">home_sections</span> est manquante. Lancez <code>php artisan migrate</code> puis rechargez cette page.
        </div>
      )}

      <div className="grid gap-4 md:grid-cols-2">
        {sections.map((section) => (
          <SectionEditor key={section.id} section={section} />
        ))}
      </div>
    </section>
  );
};

HomeSectionsEdit.layout = (page: ReactNode) => <AdminLayout>{page}</AdminLayout>;

export default HomeSectionsEdit;
