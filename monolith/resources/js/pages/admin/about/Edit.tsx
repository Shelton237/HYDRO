import AdminLayout from '@/layouts/AdminLayout';
import { Head, useForm } from '@inertiajs/react';
import type { ChangeEvent, FormEvent, PropsWithChildren, ReactNode } from 'react';

type About = {
  id: number;
  subtitle?: string | null;
  title: string;
  highlight?: string | null;
  description?: string | null;
  background_image?: string | null;
  button_label?: string | null;
  button_url?: string | null;
  icon_one_title?: string | null;
  icon_one_description?: string | null;
  icon_two_title?: string | null;
  icon_two_description?: string | null;
  author_name?: string | null;
  author_title?: string | null;
  author_image?: string | null;
};

type FormData = {
  subtitle: string;
  title: string;
  highlight: string;
  description: string;
  background_image: string;
  background_upload: File | null;
  button_label: string;
  button_url: string;
  icon_one_title: string;
  icon_one_description: string;
  icon_two_title: string;
  icon_two_description: string;
  author_name: string;
  author_title: string;
  author_image: string;
  author_upload: File | null;
  _method?: string;
};

type Props = {
  about: About;
};

const AboutEdit = ({ about }: Props) => {
  const form = useForm<FormData>({
    subtitle: about.subtitle ?? 'About Us',
    title: about.title ?? '',
    highlight: about.highlight ?? '',
    description: about.description ?? '',
    background_image: about.background_image ?? '/img/about/03.png',
    button_label: about.button_label ?? 'Explore More',
    button_url: about.button_url ?? '/about',
    icon_one_title: about.icon_one_title ?? 'Energy System',
    icon_one_description: about.icon_one_description ?? '',
    icon_two_title: about.icon_two_title ?? 'Evergreen Sun',
    icon_two_description: about.icon_two_description ?? '',
    author_name: about.author_name ?? '',
    author_title: about.author_title ?? '',
    author_image: about.author_image ?? '/img/about/author.png',
    background_upload: null,
    author_upload: null,
  });

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    form.transform((data) => ({
      ...data,
      _method: 'put',
    }));

    form.post('/admin/about', {
      forceFormData: true,
    });
  };

  const handleUploadChange =
    (field: 'background_upload' | 'author_upload') => (event: ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0] ?? null;
      form.setData(field, file);
    };

  return (
    <section className="space-y-6">
      <Head title="Section About" />
      <header className="border-b border-slate-200 pb-5">
        <p className="text-xs uppercase tracking-[0.35em] text-slate-500">Contenus</p>
        <h1 className="mt-3 text-2xl font-semibold text-slate-900">Section About</h1>
        <p className="mt-2 max-w-3xl text-sm text-slate-500">
          Modifiez le texte, l&apos;image et les points forts affichés sur les pages publiques.
        </p>
      </header>
      <form onSubmit={handleSubmit} className="space-y-6">
        <FormPanel title="Texte principal" description="Pilotez les titres et la description principale.">
          <Field label="Sous-titre" name="subtitle" errors={form.errors}>
            <input
              className="mt-2 w-full rounded-md border border-slate-300 px-4 py-2 text-sm focus:border-[#0f2d19] focus:ring-1 focus:ring-[#0f2d19]/30"
              value={form.data.subtitle}
              onChange={(event) => form.setData('subtitle', event.target.value)}
            />
          </Field>
          <Field label="Titre" name="title" helper="Texte qui précède la partie mise en valeur." errors={form.errors}>
            <input
              required
              className="mt-2 w-full rounded-md border border-slate-300 px-4 py-2 text-base font-semibold text-slate-900 focus:border-[#0f2d19] focus:ring-1 focus:ring-[#0f2d19]/30"
              value={form.data.title}
              onChange={(event) => form.setData('title', event.target.value)}
            />
          </Field>
          <Field label="Partie mise en valeur" name="highlight" helper="Texte mis en avant dans le span." errors={form.errors}>
            <input
              className="mt-2 w-full rounded-md border border-slate-300 px-4 py-2 text-sm focus:border-[#0f2d19] focus:ring-1 focus:ring-[#0f2d19]/30"
              value={form.data.highlight}
              onChange={(event) => form.setData('highlight', event.target.value)}
            />
          </Field>
          <Field label="Description" name="description" helper="2 à 3 lignes de texte." errors={form.errors}>
            <textarea
              className="mt-2 w-full rounded-md border border-slate-300 px-4 py-3 text-sm focus:border-[#0f2d19] focus:ring-1 focus:ring-[#0f2d19]/30"
              rows={4}
              value={form.data.description}
              onChange={(event) => form.setData('description', event.target.value)}
            />
          </Field>
        </FormPanel>

        <FormPanel title="Points forts" description="Décrivez les deux icônes qui viennent compléter la section.">
          <div className="grid gap-3 md:grid-cols-2">
            <div>
              <Field label="Titre icône 1" name="icon_one_title" errors={form.errors}>
                <input
                  className="mt-2 w-full rounded-md border border-slate-300 px-4 py-2 text-sm focus:border-[#0f2d19] focus:ring-1 focus:ring-[#0f2d19]/30"
                  value={form.data.icon_one_title}
                  onChange={(event) => form.setData('icon_one_title', event.target.value)}
                />
              </Field>
              <Field label="Description icône 1" name="icon_one_description" errors={form.errors}>
                <textarea
                  className="mt-2 w-full rounded-md border border-slate-300 px-4 py-3 text-sm focus:border-[#0f2d19] focus:ring-1 focus:ring-[#0f2d19]/30"
                  rows={3}
                  value={form.data.icon_one_description}
                  onChange={(event) => form.setData('icon_one_description', event.target.value)}
                />
              </Field>
            </div>
            <div>
              <Field label="Titre icône 2" name="icon_two_title" errors={form.errors}>
                <input
                  className="mt-2 w-full rounded-md border border-slate-300 px-4 py-2 text-sm focus:border-[#0f2d19] focus:ring-1 focus:ring-[#0f2d19]/30"
                  value={form.data.icon_two_title}
                  onChange={(event) => form.setData('icon_two_title', event.target.value)}
                />
              </Field>
              <Field label="Description icône 2" name="icon_two_description" errors={form.errors}>
                <textarea
                  className="mt-2 w-full rounded-md border border-slate-300 px-4 py-3 text-sm focus:border-[#0f2d19] focus:ring-1 focus:ring-[#0f2d19]/30"
                  rows={3}
                  value={form.data.icon_two_description}
                  onChange={(event) => form.setData('icon_two_description', event.target.value)}
                />
              </Field>
            </div>
          </div>
        </FormPanel>

        <FormPanel title="Bouton et auteur" description="Personnalisez le bouton et la signature du fondateur.">
          <div className="grid gap-3 md:grid-cols-2">
            <Field label="Libellé du bouton" name="button_label" errors={form.errors}>
              <input
                className="mt-2 w-full rounded-md border border-slate-300 px-4 py-2 text-sm focus:border-[#0f2d19] focus:ring-1 focus:ring-[#0f2d19]/30"
                value={form.data.button_label}
                onChange={(event) => form.setData('button_label', event.target.value)}
              />
            </Field>
            <Field label="Lien du bouton" name="button_url" errors={form.errors}>
              <input
                className="mt-2 w-full rounded-md border border-slate-300 px-4 py-2 text-sm focus:border-[#0f2d19] focus:ring-1 focus:ring-[#0f2d19]/30"
                value={form.data.button_url}
                onChange={(event) => form.setData('button_url', event.target.value)}
              />
            </Field>
          </div>
          <div className="grid gap-3 md:grid-cols-2">
            <Field label="Nom de l'auteur" name="author_name" errors={form.errors}>
              <input
                className="mt-2 w-full rounded-md border border-slate-300 px-4 py-2 text-sm focus:border-[#0f2d19] focus:ring-1 focus:ring-[#0f2d19]/30"
                value={form.data.author_name}
                onChange={(event) => form.setData('author_name', event.target.value)}
              />
            </Field>
            <Field label="Titre de l'auteur" name="author_title" errors={form.errors}>
              <input
                className="mt-2 w-full rounded-md border border-slate-300 px-4 py-2 text-sm focus:border-[#0f2d19] focus:ring-1 focus:ring-[#0f2d19]/30"
                value={form.data.author_title}
                onChange={(event) => form.setData('author_title', event.target.value)}
              />
            </Field>
          </div>
        </FormPanel>

        <FormPanel title="Visuel" description="Indiquez l'URL de l'image de fond.">
          <Field label="Image de fond" name="background_image" errors={form.errors}>
            <input
              className="mt-2 w-full rounded-md border border-slate-300 px-4 py-2 text-sm focus:border-[#0f2d19] focus:ring-1 focus:ring-[#0f2d19]/30"
              value={form.data.background_image}
              onChange={(event) => form.setData('background_image', event.target.value)}
            />
          </Field>
          <Field label="Image de l'auteur" name="author_image" errors={form.errors}>
            <input
              className="mt-2 w-full rounded-md border border-slate-300 px-4 py-2 text-sm focus:border-[#0f2d19] focus:ring-1 focus:ring-[#0f2d19]/30"
              value={form.data.author_image}
              onChange={(event) => form.setData('author_image', event.target.value)}
            />
          </Field>
          <div className="grid gap-3 md:grid-cols-2">
            <Field label="Importer image de fond" name="background_upload" helper="JPEG/PNG/WebP ≤ 5 Mo" errors={form.errors}>
              <input
                type="file"
                accept="image/*"
                className="mt-2 w-full rounded-md border border-dashed border-slate-400 px-4 py-2 text-sm text-slate-500 focus:border-[#0f2d19] focus:ring-1 focus:ring-[#0f2d19]/30"
                onChange={handleUploadChange('background_upload')}
              />
              {form.data.background_upload && (
                <p className="mt-1 text-xs text-slate-500">Fichier sélectionné : {form.data.background_upload.name}</p>
              )}
            </Field>
            <Field label="Importer image auteur" name="author_upload" helper="JPEG/PNG/WebP ≤ 5 Mo" errors={form.errors}>
              <input
                type="file"
                accept="image/*"
                className="mt-2 w-full rounded-md border border-dashed border-slate-400 px-4 py-2 text-sm text-slate-500 focus:border-[#0f2d19] focus:ring-1 focus:ring-[#0f2d19]/30"
                onChange={handleUploadChange('author_upload')}
              />
              {form.data.author_upload && (
                <p className="mt-1 text-xs text-slate-500">Fichier sélectionné : {form.data.author_upload.name}</p>
              )}
            </Field>
          </div>
        </FormPanel>

        <div className="flex flex-wrap items-center justify-end gap-3">
          <button
            type="submit"
            disabled={form.processing}
            className="inline-flex items-center rounded-md bg-[#0f2d19] px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-[#0d2415] disabled:cursor-not-allowed disabled:bg-slate-400"
          >
            {form.processing ? 'Enregistrement…' : 'Enregistrer'}
          </button>
        </div>
      </form>
    </section>
  );
};

const Field = ({
  label,
  name,
  helper,
  children,
  errors,
}: {
  label: string;
  name: keyof FormData;
  helper?: string;
  children: ReactNode;
  errors?: Record<string, string>;
}) => {
  const error = errors?.[name];
  return (
    <label className="block text-sm font-semibold text-slate-700">
      <span className="text-[0.65rem] uppercase tracking-[0.3em] text-slate-400">{label}</span>
      {children}
      {helper && <p className="mt-1 text-xs text-slate-400">{helper}</p>}
      {error && <p className="mt-1 text-xs font-semibold text-red-600">{error}</p>}
    </label>
  );
};

const FormPanel = ({ title, description, children }: PropsWithChildren<{ title: string; description?: string }>) => (
  <div className="space-y-4 rounded-xl border border-slate-200 bg-white p-5">
    <div>
      <p className="text-xs uppercase tracking-[0.3em] text-slate-500">{title}</p>
      {description && <p className="mt-1 text-sm text-slate-500">{description}</p>}
    </div>
    <div className="space-y-4">{children}</div>
  </div>
);

AboutEdit.layout = (page: ReactNode) => <AdminLayout>{page}</AdminLayout>;

export default AboutEdit;
