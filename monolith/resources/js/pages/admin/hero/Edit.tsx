import AdminLayout from '@/Layouts/AdminLayout';
import { Head, useForm } from '@inertiajs/react';
import type { ChangeEvent, FormEvent, ReactNode } from 'react';
import { useEffect, useId, useRef, useState } from 'react';

type Hero = {
  id: number;
  kicker?: string | null;
  title: string;
  description?: string | null;
  primary_label?: string | null;
  primary_url?: string | null;
  secondary_label?: string | null;
  secondary_url?: string | null;
  background_image?: string | null;
};

type Props = {
  hero: Hero;
};

type FormData = {
  kicker: string;
  title: string;
  description: string;
  primary_label: string;
  primary_url: string;
  secondary_label: string;
  secondary_url: string;
  background_image: string;
  background_upload: File | null;
  _method?: string;
};

const HeroEdit = ({ hero }: Props) => {
  const uploadInputId = useId();
  const defaultBackground = hero.background_image || '/img/hero/hero-4.jpg';
  const [uploadPreview, setUploadPreview] = useState<string | null>(null);
  const uploadInputRef = useRef<HTMLInputElement | null>(null);
  const form = useForm<FormData>({
    kicker: hero.kicker ?? '',
    title: hero.title ?? '',
    description: hero.description ?? '',
    primary_label: hero.primary_label ?? '',
    primary_url: hero.primary_url ?? '',
    secondary_label: hero.secondary_label ?? '',
    secondary_url: hero.secondary_url ?? '',
    background_image: hero.background_image ?? '',
    background_upload: null,
  });

  const previousBackgroundRef = useRef(form.data.background_image ?? '');
  const hasLocalUploadRef = useRef(false);

  useEffect(() => {
    const file = form.data.background_upload;

    if (!file) {
      setUploadPreview(null);

      if (hasLocalUploadRef.current) {
        form.setData('background_image', previousBackgroundRef.current ?? '');
      }

      hasLocalUploadRef.current = false;
      return;
    }

    if (!hasLocalUploadRef.current) {
      previousBackgroundRef.current = form.data.background_image ?? '';
    }

    const objectUrl = URL.createObjectURL(file);
    setUploadPreview(objectUrl);
    form.setData('background_image', objectUrl);
    hasLocalUploadRef.current = true;

    return () => URL.revokeObjectURL(objectUrl);
  }, [form.data.background_upload]);

  const backgroundPreview = uploadPreview || form.data.background_image || defaultBackground;

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    form.transform((data) => ({
      ...data,
      _method: 'put',
    }));

    form.post('/admin/hero', {
      forceFormData: true,
      preserveScroll: true,
      preserveState: false,
      onSuccess: () => {
        resetUpload();
      },
    });
  };

  const handleUploadChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] ?? null;
    form.setData('background_upload', file);
  };

  const resetUpload = () => {
    form.setData('background_upload', null);
    if (uploadInputRef.current) {
      uploadInputRef.current.value = '';
    }
  };

  const Field = ({
    label,
    name,
    helper,
    children,
  }: {
    label: string;
    name: keyof FormData;
    helper?: string;
    children: ReactNode;
  }) => (
    <label className="block text-sm font-semibold text-slate-700">
      <span className="text-[0.65rem] uppercase tracking-[0.3em] text-slate-400">{label}</span>
      {children}
      {helper && <p className="mt-1 text-xs text-slate-400">{helper}</p>}
      {form.errors[name] && <p className="mt-1 text-xs font-medium text-red-600">{form.errors[name]}</p>}
    </label>
  );

  return (
    <section className="space-y-6">
      <Head title="Section hero" />
      <header className="border-b border-slate-200 pb-5">
        <p className="text-xs uppercase tracking-[0.35em] text-slate-500">Accueil</p>
        <h1 className="mt-3 text-2xl font-semibold text-slate-900">Section hero</h1>
        <p className="mt-2 max-w-3xl text-sm text-slate-500">
          Ajustez le message d’introduction, les liens d’action et l’image affichés sur la page d’accueil publique.
        </p>
      </header>

      <div className="grid gap-2 lg:grid-cols-[1.6fr,1fr]">
        <form onSubmit={handleSubmit} className="space-y-6">
          <FormPanel
            title="Contenu principal"
            description="Structurez le message clé affiché au-dessus du pli sur la page d’accueil."
          >
            <div className="grid gap-2 lg:grid-cols-[0.8fr,1fr]">
              <Field label="Préfixe (kicker)" name="kicker" helper="Petit texte pour introduire le titre.">
                <input
                  className="mt-2 w-full rounded-md border border-slate-300 px-4 py-2.5 text-sm focus:border-[#0f2d19] focus:ring-1 focus:ring-[#0f2d19]/30"
                  value={form.data.kicker}
                  onChange={(e) => form.setData('kicker', e.target.value)}
                />
              </Field>
              <Field label="Titre principal" name="title" helper="Texte obligatoire, visible immédiatement.">
                <input
                  required
                  className="mt-2 w-full rounded-md border border-slate-300 px-4 py-2.5 text-base font-semibold text-slate-900 focus:border-[#0f2d19] focus:ring-1 focus:ring-[#0f2d19]/30"
                  value={form.data.title}
                  onChange={(e) => form.setData('title', e.target.value)}
                />
              </Field>
            </div>
            <Field label="Description" name="description" helper="2 à 3 lignes recommandées pour maximiser la lisibilité.">
              <textarea
                className="mt-2 w-full rounded-md border border-slate-300 px-4 py-3 text-sm focus:border-[#0f2d19] focus:ring-1 focus:ring-[#0f2d19]/30"
                rows={4}
                value={form.data.description}
                onChange={(e) => form.setData('description', e.target.value)}
              />
            </Field>
          </FormPanel>

          <FormPanel
            title="Appels à l’action"
            description="Définissez les boutons et leur destination pour guider les visiteurs."
          >
            <div className="grid gap-2 md:grid-cols-2">
              <Field label="Libellé bouton principal" name="primary_label">
                <input
                  className="mt-2 w-full rounded-md border border-slate-300 px-4 py-2.5 text-sm focus:border-[#0f2d19] focus:ring-1 focus:ring-[#0f2d19]/30"
                  value={form.data.primary_label}
                  onChange={(e) => form.setData('primary_label', e.target.value)}
                />
              </Field>
              <Field label="Lien bouton principal" name="primary_url" helper="Ex: /contact ou URL absolue.">
                <input
                  className="mt-2 w-full rounded-md border border-slate-300 px-4 py-2.5 text-sm focus:border-[#0f2d19] focus:ring-1 focus:ring-[#0f2d19]/30"
                  value={form.data.primary_url}
                  onChange={(e) => form.setData('primary_url', e.target.value)}
                  placeholder="/contact"
                />
              </Field>
              <Field label="Libellé bouton secondaire" name="secondary_label">
                <input
                  className="mt-2 w-full rounded-md border border-slate-300 px-4 py-2.5 text-sm focus:border-[#0f2d19] focus:ring-1 focus:ring-[#0f2d19]/30"
                  value={form.data.secondary_label}
                  onChange={(e) => form.setData('secondary_label', e.target.value)}
                />
              </Field>
              <Field label="Lien bouton secondaire" name="secondary_url">
                <input
                  className="mt-2 w-full rounded-md border border-slate-300 px-4 py-2.5 text-sm focus:border-[#0f2d19] focus:ring-1 focus:ring-[#0f2d19]/30"
                  value={form.data.secondary_url}
                  onChange={(e) => form.setData('secondary_url', e.target.value)}
                />
              </Field>
            </div>
          </FormPanel>

          <FormPanel
            title="Visuel de fond"
            description="Choisissez une image cohérente avec votre charte graphique."
          >
            <Field label="Image de fond (URL)" name="background_image" helper="Utilisez une URL interne (ex: /img/hero.jpg) ou externe.">
              <input
                className="mt-2 w-full rounded-md border border-slate-300 px-4 py-2.5 text-sm focus:border-[#0f2d19] focus:ring-1 focus:ring-[#0f2d19]/30"
                value={form.data.background_image}
                onChange={(e) => form.setData('background_image', e.target.value)}
                placeholder="/img/hero/hero-4.jpg"
              />
            </Field>
            <div className="rounded-lg border border-dashed border-slate-300 bg-slate-50 p-5">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <p className="text-sm font-semibold text-slate-900">Importer un visuel</p>
                  <p className="text-xs text-slate-500">Formats JPG/PNG/WebP â€¢ 5 Mo maximum</p>
                </div>
                <div className="flex items-center gap-2">
                  <label
                    htmlFor={uploadInputId}
                    className="inline-flex cursor-pointer items-center rounded-md border border-[#0f2d19] px-4 py-2 text-sm font-semibold text-[#0f2d19] transition hover:bg-[#0f2d19]/5"
                  >
                    Importer
                  </label>
                  {form.data.background_upload && (
                    <button
                      type="button"
                      onClick={resetUpload}
                      className="text-xs font-semibold text-slate-500 underline-offset-2 hover:text-slate-700 hover:underline"
                    >
                      Supprimer
                    </button>
                  )}
                </div>
              </div>
              <input
                id={uploadInputId}
                type="file"
                accept="image/*"
                className="sr-only"
                ref={uploadInputRef}
                onChange={handleUploadChange}
              />
              <p className="mt-3 text-xs text-slate-500">
                {form.data.background_upload
                  ? `Fichier sélectionné : ${form.data.background_upload.name}`
                  : 'Aucun fichier sélectionné.'}
              </p>
              {form.errors.background_upload && (
                <p className="mt-1 text-xs font-semibold text-red-600">{form.errors.background_upload}</p>
              )}
            </div>
          </FormPanel>

          <div className="flex flex-wrap items-center justify-end gap-3 pt-2">
            <button
              type="submit"
              disabled={form.processing}
              className="inline-flex items-center rounded-md bg-[#0f2d19] px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-[#0d2415] disabled:cursor-not-allowed disabled:bg-slate-400"
            >
              {form.processing ? 'Enregistrement…' : 'Enregistrer les modifications'}
            </button>
          </div>
        </form>

        <div className="space-y-4 rounded-xl border border-slate-200 p-5">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">Prévisualisation</p>
          <div className="rounded-lg bg-white">
            <div
              className="rounded-lg border border-slate-200 p-5"
              style={{
                backgroundImage: `linear-gradient(120deg, rgba(255,255,255,0.9), rgba(255,255,255,0.9)), url(${backgroundPreview})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                minHeight: '320px',
              }}
            >
              <div className="flex h-full flex-col justify-between gap-4">
                <div className="space-y-3">
                  {form.data.kicker && (
                    <p className="text-xs uppercase tracking-[0.35em] text-slate-600">{form.data.kicker}</p>
                  )}
                  <h3 className="text-2xl font-semibold text-slate-900">
                    {form.data.title || 'Titre du hero'}
                  </h3>
                  <p className="text-sm text-slate-600">
                    {form.data.description || 'Aper?u du texte descriptif de la banni?re.'}
                  </p>
                </div>
                <div className="flex flex-wrap gap-3">
                  {form.data.primary_label && (
                    <span className="rounded-md bg-[#0f2d19] px-4 py-2 text-xs font-semibold text-white">
                      {form.data.primary_label}
                    </span>
                  )}
                  {form.data.secondary_label && (
                    <span className="rounded-md border border-slate-400 px-4 py-2 text-xs font-semibold text-slate-700">
                      {form.data.secondary_label}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
          <p className="text-xs text-slate-500">
            Source : {form.data.background_upload ? form.data.background_upload.name : form.data.background_image || 'Image par d?faut'}
          </p>
        </div>
      </div>
    </section>
  );
};

const FormPanel = ({ title, description, children }: { title: string; description?: string; children: ReactNode }) => (
  <div className="space-y-4 rounded-xl border border-slate-200 bg-white p-5">
    <div>
      <p className="text-xs uppercase tracking-[0.3em] text-slate-500">{title}</p>
      {description && <p className="mt-1 text-sm text-slate-500">{description}</p>}
    </div>
    <div className="space-y-4">{children}</div>
  </div>
);

HeroEdit.layout = (page: ReactNode) => <AdminLayout>{page}</AdminLayout>;

export default HeroEdit;
