import AdminLayout from '@/layouts/AdminLayout';
import { Head, useForm } from '@inertiajs/react';
import type { ChangeEvent, FormEvent, PropsWithChildren, ReactNode, RefObject } from 'react';
import { useEffect, useId, useRef, useState } from 'react';

type ContactPayload = {
  form_title?: string | null;
  form_subtitle?: string | null;
  call_label?: string | null;
  call_value?: string | null;
  email_label?: string | null;
  email_value?: string | null;
  location_label?: string | null;
  location_value?: string | null;
  map_embed_url?: string | null;
  banner_image?: string | null;
  video_image?: string | null;
};

type ContactFormData = {
  form_title: string;
  form_subtitle: string;
  call_label: string;
  call_value: string;
  email_label: string;
  email_value: string;
  location_label: string;
  location_value: string;
  map_embed_url: string;
  banner_image: string;
  video_image: string;
  banner_upload: File | null;
  video_upload: File | null;
  _method?: string;
};

type Props = {
  contact: ContactPayload;
};

const ContactEdit = ({ contact }: Props) => {
  const bannerUploadInputId = useId();
  const videoUploadInputId = useId();
  const bannerUploadInputRef = useRef<HTMLInputElement | null>(null);
  const videoUploadInputRef = useRef<HTMLInputElement | null>(null);
  const [bannerPreview, setBannerPreview] = useState<string | null>(null);
  const [videoPreview, setVideoPreview] = useState<string | null>(null);

  const form = useForm<ContactFormData>({
    form_title: contact.form_title ?? "We'd Love to Hear From!",
    form_subtitle: contact.form_subtitle ?? '',
    call_label: contact.call_label ?? 'Call Us 7/24',
    call_value: contact.call_value ?? '+208-555-0112',
    email_label: contact.email_label ?? 'Make a Quote',
    email_value: contact.email_value ?? 'Solar@gmail.com',
    location_label: contact.location_label ?? 'Location',
    location_value: contact.location_value ?? '4517 Washington ave.',
    map_embed_url: contact.map_embed_url ?? '',
    banner_image: contact.banner_image ?? '/img/breadcrumb.jpg',
    video_image: contact.video_image ?? '/img/video.png',
    banner_upload: null,
    video_upload: null,
  });

  useEffect(() => {
    if (!form.data.banner_upload) {
      setBannerPreview(null);
      return;
    }

    const objectUrl = URL.createObjectURL(form.data.banner_upload);
    setBannerPreview(objectUrl);

    return () => URL.revokeObjectURL(objectUrl);
  }, [form.data.banner_upload]);

  useEffect(() => {
    if (!form.data.video_upload) {
      setVideoPreview(null);
      return;
    }

    const objectUrl = URL.createObjectURL(form.data.video_upload);
    setVideoPreview(objectUrl);

    return () => URL.revokeObjectURL(objectUrl);
  }, [form.data.video_upload]);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    form.transform((data) => ({
      ...data,
      _method: 'put',
    }));

    form.post('/admin/contact', {
      forceFormData: true,
    });
  };

  const handleBannerUploadChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] ?? null;
    form.setData('banner_upload', file);
  };

  const handleVideoUploadChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] ?? null;
    form.setData('video_upload', file);
  };

  const resetBannerUpload = () => {
    form.setData('banner_upload', null);
    if (bannerUploadInputRef.current) {
      bannerUploadInputRef.current.value = '';
    }
  };

  const resetVideoUpload = () => {
    form.setData('video_upload', null);
    if (videoUploadInputRef.current) {
      videoUploadInputRef.current.value = '';
    }
  };

  const bannerImagePreview = bannerPreview || form.data.banner_image || '/img/breadcrumb.jpg';
  const videoImagePreview = videoPreview || form.data.video_image || '/img/video.png';

  return (
    <section className="space-y-6">
      <Head title="Section Contact" />
      <header className="border-b border-slate-200 pb-5">
        <p className="text-xs uppercase tracking-[0.35em] text-slate-500">Contenus</p>
        <h1 className="mt-3 text-2xl font-semibold text-slate-900">Contact</h1>
        <p className="mt-2 max-w-3xl text-sm text-slate-500">
          Mettez à jour les coordonnées, le bloc formulaire et l’iframe de carte.
        </p>
      </header>

      <form onSubmit={handleSubmit} className="space-y-6">
        <FormPanel title="Formulaire">
          <Field label="Titre" name="form_title" helper="Titre principal du formulaire" errors={form.errors}>
            <input
              className="mt-2 w-full rounded-md border border-slate-300 px-4 py-2 text-sm focus:border-[#0f2d19] focus:ring-1 focus:ring-[#0f2d19]/30"
              value={form.data.form_title}
              onChange={(event) => form.setData('form_title', event.target.value)}
            />
          </Field>
          <Field label="Sous-texte" name="form_subtitle" helper="Paragraphe sous le titre" errors={form.errors}>
            <textarea
              className="mt-2 w-full rounded-md border border-slate-300 px-4 py-3 text-sm focus:border-[#0f2d19] focus:ring-1 focus:ring-[#0f2d19]/30"
              rows={3}
              value={form.data.form_subtitle}
              onChange={(event) => form.setData('form_subtitle', event.target.value)}
            />
          </Field>
        </FormPanel>

        <FormPanel title="Coordonnées">
          <div className="grid gap-3 md:grid-cols-2">
            <Field label="Étiquette téléphone" name="call_label" helper="Texte affiché au-dessus du numéro">
              <input
                className="mt-2 w-full rounded-md border border-slate-300 px-4 py-2 text-sm focus:border-[#0f2d19] focus:ring-1 focus:ring-[#0f2d19]/30"
                value={form.data.call_label}
                onChange={(event) => form.setData('call_label', event.target.value)}
              />
            </Field>
            <Field label="Numéro téléphone" name="call_value">
              <input
                className="mt-2 w-full rounded-md border border-slate-300 px-4 py-2 text-sm focus:border-[#0f2d19] focus:ring-1 focus:ring-[#0f2d19]/30"
                value={form.data.call_value}
                onChange={(event) => form.setData('call_value', event.target.value)}
              />
            </Field>
            <Field label="Étiquette email" name="email_label">
              <input
                className="mt-2 w-full rounded-md border border-slate-300 px-4 py-2 text-sm focus:border-[#0f2d19] focus:ring-1 focus:ring-[#0f2d19]/30"
                value={form.data.email_label}
                onChange={(event) => form.setData('email_label', event.target.value)}
              />
            </Field>
            <Field label="Adresse email" name="email_value">
              <input
                className="mt-2 w-full rounded-md border border-slate-300 px-4 py-2 text-sm focus:border-[#0f2d19] focus:ring-1 focus:ring-[#0f2d19]/30"
                value={form.data.email_value}
                onChange={(event) => form.setData('email_value', event.target.value)}
              />
            </Field>
            <Field label="Étiquette adresse" name="location_label">
              <input
                className="mt-2 w-full rounded-md border border-slate-300 px-4 py-2 text-sm focus:border-[#0f2d19] focus:ring-1 focus:ring-[#0f2d19]/30"
                value={form.data.location_label}
                onChange={(event) => form.setData('location_label', event.target.value)}
              />
            </Field>
            <Field label="Adresse" name="location_value">
              <input
                className="mt-2 w-full rounded-md border border-slate-300 px-4 py-2 text-sm focus:border-[#0f2d19] focus:ring-1 focus:ring-[#0f2d19]/30"
                value={form.data.location_value}
                onChange={(event) => form.setData('location_value', event.target.value)}
              />
            </Field>
          </div>
        </FormPanel>

        <FormPanel title="Visuels" description="Controlez les images visibles sur la page Contact.">
          <Field
            label="Image de couverture (URL)"
            name="banner_image"
            helper="Image utilisee tout en haut de la page. Laissez vide pour garder l'image par defaut."
            errors={form.errors}
          >
            <input
              className="mt-2 w-full rounded-md border border-slate-300 px-4 py-2 text-sm focus:border-[#0f2d19] focus:ring-1 focus:ring-[#0f2d19]/30"
              value={form.data.banner_image}
              onChange={(event) => form.setData('banner_image', event.target.value)}
            />
          </Field>
          <ImageUploadBox
            title="Importer une couverture"
            inputId={bannerUploadInputId}
            inputRef={bannerUploadInputRef}
            onChange={handleBannerUploadChange}
            onReset={resetBannerUpload}
            selectedFile={form.data.banner_upload}
            error={form.errors.banner_upload}
          />
          <img
            src={bannerImagePreview}
            alt="Apercu de la couverture"
            className="h-40 w-full rounded-lg border border-slate-200 object-cover"
          />

          <Field
            label="Image du bloc coordonnees (URL)"
            name="video_image"
            helper="Illustration situee a cote du bloc coordonnees."
            errors={form.errors}
          >
            <input
              className="mt-2 w-full rounded-md border border-slate-300 px-4 py-2 text-sm focus:border-[#0f2d19] focus:ring-1 focus:ring-[#0f2d19]/30"
              value={form.data.video_image}
              onChange={(event) => form.setData('video_image', event.target.value)}
            />
          </Field>
          <ImageUploadBox
            title="Importer l'image laterale"
            inputId={videoUploadInputId}
            inputRef={videoUploadInputRef}
            onChange={handleVideoUploadChange}
            onReset={resetVideoUpload}
            selectedFile={form.data.video_upload}
            error={form.errors.video_upload}
          />
          <img
            src={videoImagePreview}
            alt="Apercu du bloc coordonnees"
            className="h-40 w-full rounded-lg border border-slate-200 object-cover"
          />
        </FormPanel>

        <FormPanel title="Carte">
          <Field label="URL iframe" name="map_embed_url" helper="Copiez l’URL src fournie par Google Maps">
            <input
              className="mt-2 w-full rounded-md border border-slate-300 px-4 py-2 text-sm focus:border-[#0f2d19] focus:ring-1 focus:ring-[#0f2d19]/30"
              value={form.data.map_embed_url}
              onChange={(event) => form.setData('map_embed_url', event.target.value)}
            />
          </Field>
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
  name: keyof ContactFormData;
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

const ImageUploadBox = ({
  title,
  inputId,
  inputRef,
  onChange,
  onReset,
  selectedFile,
  error,
}: {
  title: string;
  inputId: string;
  inputRef: RefObject<HTMLInputElement>;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onReset: () => void;
  selectedFile: File | null;
  error?: string;
}) => (
  <div className="rounded-lg border border-dashed border-slate-300 bg-slate-50 p-5">
    <div className="flex flex-wrap items-center justify-between gap-3">
      <div>
        <p className="text-sm font-semibold text-slate-900">{title}</p>
        <p className="text-xs text-slate-500">Formats JPG/PNG/WebP - 5 Mo maximum</p>
      </div>
      <div className="flex items-center gap-2">
        <label
          htmlFor={inputId}
          className="inline-flex cursor-pointer items-center rounded-md border border-[#0f2d19] px-4 py-2 text-sm font-semibold text-[#0f2d19] transition hover:bg-[#0f2d19]/5"
        >
          Importer
        </label>
        {selectedFile && (
          <button
            type="button"
            onClick={onReset}
            className="text-xs font-semibold text-slate-500 underline-offset-2 hover:text-slate-700 hover:underline"
          >
            Supprimer
          </button>
        )}
      </div>
    </div>
    <input id={inputId} type="file" accept="image/*" className="sr-only" ref={inputRef} onChange={onChange} />
    <p className="mt-3 text-xs text-slate-500">
      {selectedFile ? `Fichier selectionne : ${selectedFile.name}` : 'Aucun fichier selectionne.'}
    </p>
    {error && <p className="mt-1 text-xs font-semibold text-red-600">{error}</p>}
  </div>
);

ContactEdit.layout = (page: ReactNode) => <AdminLayout>{page}</AdminLayout>;

export default ContactEdit;
