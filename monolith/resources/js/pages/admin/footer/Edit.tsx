import AdminLayout from '@/layouts/AdminLayout';
import { Head, useForm } from '@inertiajs/react';
import {
  defaultQuickLinks,
  defaultRecentPosts,
  defaultServices,
  FooterContent,
  FooterLink,
  FooterPost,
  FooterService,
} from '@/data/footer';
import type { ChangeEvent, FormEvent, PropsWithChildren, ReactNode } from 'react';

type Props = {
  footer: FooterContent;
};

type FormData = {
  contact_phone: string;
  contact_whatsapp: string;
  contact_email: string;
  contact_address: string;
  footer_description: string;
  quick_links: FooterLink[];
  services: FooterService[];
  recent_posts: FooterPost[];
  facebook_url: string;
  twitter_url: string;
  linkedin_url: string;
  youtube_url: string;
  copyright_text: string;
};

const FooterEdit = ({ footer }: Props) => {
  const form = useForm<FormData>({
    contact_phone: footer.contact_phone ?? '',
    contact_whatsapp: footer.contact_whatsapp ?? '',
    contact_email: footer.contact_email ?? '',
    contact_address: footer.contact_address ?? '',
    footer_description: footer.footer_description ?? '',
    quick_links: footer.quick_links?.length ? footer.quick_links : defaultQuickLinks,
    services: footer.services?.length ? footer.services : defaultServices,
    recent_posts: footer.recent_posts?.length ? footer.recent_posts : defaultRecentPosts,
    facebook_url: footer.facebook_url ?? '',
    twitter_url: footer.twitter_url ?? '',
    linkedin_url: footer.linkedin_url ?? '',
    youtube_url: footer.youtube_url ?? '',
    copyright_text: footer.copyright_text ?? '',
  });

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    form.put('/admin/footer');
  };

  const handleListChange =
    (field: 'quick_links' | 'services' | 'recent_posts', index: number, key: string) =>
    (event: ChangeEvent<HTMLInputElement>) => {
      const next = [...(form.data[field] ?? [])];
      next[index] = {
        ...(next[index] ?? {}),
        [key]: event.target.value,
      };
      form.setData(field, next as any);
    };

  const handleAddEntry = (field: 'quick_links' | 'services' | 'recent_posts', template: Record<string, string>) => () => {
    const next = [...(form.data[field] ?? []), template];
    form.setData(field, next as any);
  };

  const handleRemoveEntry = (field: 'quick_links' | 'services' | 'recent_posts', index: number) => () => {
    const next = [...(form.data[field] ?? [])];
    next.splice(index, 1);
    form.setData(field, next as any);
  };

  const quickLinks = form.data.quick_links ?? defaultQuickLinks;
  const services = form.data.services ?? defaultServices;
  const recentPosts = form.data.recent_posts ?? defaultRecentPosts;

  return (
    <section className="space-y-6">
      <Head title="Section Footer" />
      <header className="border-b border-slate-200 pb-5">
        <p className="text-xs uppercase tracking-[0.35em] text-slate-500">Contenus</p>
        <h1 className="mt-3 text-2xl font-semibold text-slate-900">Footer</h1>
        <p className="mt-2 max-w-3xl text-sm text-slate-500">
          Gérez les coordonnées, liens rapides, services et articles récents affichés dans le pied de page.
        </p>
      </header>

      <form onSubmit={handleSubmit} className="space-y-6">
        <FormPanel title="Coordonnées" description="Mettez à jour les moyens de contact présentés en haut du footer.">
          <div className="grid gap-3 md:grid-cols-2">
            <Field label="Téléphone" name="contact_phone" errors={form.errors}>
              <input
                className="mt-2 w-full rounded-md border border-slate-300 px-4 py-2 text-sm focus:border-[#0f2d19] focus:ring-1 focus:ring-[#0f2d19]/30"
                value={form.data.contact_phone}
                onChange={(event) => form.setData('contact_phone', event.target.value)}
              />
            </Field>
            <Field label="WhatsApp" name="contact_whatsapp" errors={form.errors}>
              <input
                className="mt-2 w-full rounded-md border border-slate-300 px-4 py-2 text-sm focus:border-[#0f2d19] focus:ring-1 focus:ring-[#0f2d19]/30"
                value={form.data.contact_whatsapp}
                onChange={(event) => form.setData('contact_whatsapp', event.target.value)}
              />
            </Field>
            <Field label="Email" name="contact_email" errors={form.errors}>
              <input
                className="mt-2 w-full rounded-md border border-slate-300 px-4 py-2 text-sm focus:border-[#0f2d19] focus:ring-1 focus:ring-[#0f2d19]/30"
                value={form.data.contact_email}
                onChange={(event) => form.setData('contact_email', event.target.value)}
              />
            </Field>
            <Field label="Adresse" name="contact_address" errors={form.errors}>
              <input
                className="mt-2 w-full rounded-md border border-slate-300 px-4 py-2 text-sm focus:border-[#0f2d19] focus:ring-1 focus:ring-[#0f2d19]/30"
                value={form.data.contact_address}
                onChange={(event) => form.setData('contact_address', event.target.value)}
              />
            </Field>
          </div>
        </FormPanel>

        <FormPanel title="Description générale">
          <Field label="Texte" name="footer_description" errors={form.errors}>
            <textarea
              className="mt-2 w-full rounded-md border border-slate-300 px-4 py-3 text-sm focus:border-[#0f2d19] focus:ring-1 focus:ring-[#0f2d19]/30"
              rows={4}
              value={form.data.footer_description}
              onChange={(event) => form.setData('footer_description', event.target.value)}
            />
          </Field>
        </FormPanel>

        <FormPanel title="Liens rapides">
          {quickLinks.map((link, index) => (
            <div className="grid gap-3 md:grid-cols-[1fr,1fr,auto]" key={index}>
              <Field label={`Libellé ${index + 1}`} name="quick_links" errors={form.errors}>
                <input
                  className="mt-2 w-full rounded-md border border-slate-300 px-4 py-2 text-sm focus:border-[#0f2d19] focus:ring-1 focus:ring-[#0f2d19]/30"
                  value={link.text}
                  onChange={handleListChange('quick_links', index, 'text')}
                />
              </Field>
              <Field label={`Lien ${index + 1}`} name="quick_links" errors={form.errors}>
                <input
                  className="mt-2 w-full rounded-md border border-slate-300 px-4 py-2 text-sm focus:border-[#0f2d19] focus:ring-1 focus:ring-[#0f2d19]/30"
                  value={link.link}
                  onChange={handleListChange('quick_links', index, 'link')}
                />
              </Field>
              <button
                type="button"
                className="mt-6 text-xs font-semibold text-slate-500 underline-offset-2 hover:text-slate-700"
                onClick={handleRemoveEntry('quick_links', index)}
              >
                Supprimer
              </button>
            </div>
          ))}
          <button
            type="button"
            className="text-xs font-semibold text-[#0f2d19] underline-offset-2 hover:underline"
            onClick={handleAddEntry('quick_links', { text: '', link: '' })}
          >
            Ajouter un lien rapide
          </button>
        </FormPanel>

        <FormPanel title="Services">
          {services.map((service, index) => (
            <div className="grid gap-3 md:grid-cols-[1fr,1fr,auto]" key={index}>
              <Field label={`Titre ${index + 1}`} name="services" errors={form.errors}>
                <input
                  className="mt-2 w-full rounded-md border border-slate-300 px-4 py-2 text-sm focus:border-[#0f2d19] focus:ring-1 focus:ring-[#0f2d19]/30"
                  value={service.text}
                  onChange={handleListChange('services', index, 'text')}
                />
              </Field>
              <Field label={`Lien ${index + 1}`} name="services" errors={form.errors}>
                <input
                  className="mt-2 w-full rounded-md border border-slate-300 px-4 py-2 text-sm focus:border-[#0f2d19] focus:ring-1 focus:ring-[#0f2d19]/30"
                  value={service.link}
                  onChange={handleListChange('services', index, 'link')}
                />
              </Field>
              <button
                type="button"
                className="mt-6 text-xs font-semibold text-slate-500 underline-offset-2 hover:text-slate-700"
                onClick={handleRemoveEntry('services', index)}
              >
                Supprimer
              </button>
            </div>
          ))}
          <button
            type="button"
            className="text-xs font-semibold text-[#0f2d19] underline-offset-2 hover:underline"
            onClick={handleAddEntry('services', { text: '', link: '' })}
          >
            Ajouter un service
          </button>
        </FormPanel>

        <FormPanel title="Articles récents">
          {recentPosts.map((post, index) => (
            <div className="grid gap-3 md:grid-cols-[repeat(4,1fr),auto]" key={index}>
              <Field label="Image" name="recent_posts" errors={form.errors}>
                <input
                  className="mt-2 w-full rounded-md border border-slate-300 px-4 py-2 text-sm focus:border-[#0f2d19] focus:ring-1 focus:ring-[#0f2d19]/30"
                  value={post.image}
                  onChange={handleListChange('recent_posts', index, 'image')}
                />
              </Field>
              <Field label="Date" name="recent_posts" errors={form.errors}>
                <input
                  className="mt-2 w-full rounded-md border border-slate-300 px-4 py-2 text-sm focus:border-[#0f2d19] focus:ring-1 focus:ring-[#0f2d19]/30"
                  value={post.date}
                  onChange={handleListChange('recent_posts', index, 'date')}
                />
              </Field>
              <Field label="Titre" name="recent_posts" errors={form.errors}>
                <input
                  className="mt-2 w-full rounded-md border border-slate-300 px-4 py-2 text-sm focus:border-[#0f2d19] focus:ring-1 focus:ring-[#0f2d19]/30"
                  value={post.title}
                  onChange={handleListChange('recent_posts', index, 'title')}
                />
              </Field>
              <Field label="Lien" name="recent_posts" errors={form.errors}>
                <input
                  className="mt-2 w-full rounded-md border border-slate-300 px-4 py-2 text-sm focus:border-[#0f2d19] focus:ring-1 focus:ring-[#0f2d19]/30"
                  value={post.link}
                  onChange={handleListChange('recent_posts', index, 'link')}
                />
              </Field>
              <button
                type="button"
                className="mt-6 text-xs font-semibold text-slate-500 underline-offset-2 hover:text-slate-700"
                onClick={handleRemoveEntry('recent_posts', index)}
              >
                Supprimer
              </button>
            </div>
          ))}
          <button
            type="button"
            className="text-xs font-semibold text-[#0f2d19] underline-offset-2 hover:underline"
            onClick={handleAddEntry('recent_posts', { image: '', date: '', title: '', link: '' })}
          >
            Ajouter un article
          </button>
        </FormPanel>

        <FormPanel title="Réseaux sociaux">
          <div className="grid gap-3 md:grid-cols-2">
            <Field label="Facebook" name="facebook_url" errors={form.errors}>
              <input
                className="mt-2 w-full rounded-md border border-slate-300 px-4 py-2 text-sm focus:border-[#0f2d19] focus:ring-1 focus:ring-[#0f2d19]/30"
                value={form.data.facebook_url}
                onChange={(event) => form.setData('facebook_url', event.target.value)}
              />
            </Field>
            <Field label="Twitter / X" name="twitter_url" errors={form.errors}>
              <input
                className="mt-2 w-full rounded-md border border-slate-300 px-4 py-2 text-sm focus:border-[#0f2d19] focus:ring-1 focus:ring-[#0f2d19]/30"
                value={form.data.twitter_url}
                onChange={(event) => form.setData('twitter_url', event.target.value)}
              />
            </Field>
            <Field label="LinkedIn" name="linkedin_url" errors={form.errors}>
              <input
                className="mt-2 w-full rounded-md border border-slate-300 px-4 py-2 text-sm focus:border-[#0f2d19] focus:ring-1 focus:ring-[#0f2d19]/30"
                value={form.data.linkedin_url}
                onChange={(event) => form.setData('linkedin_url', event.target.value)}
              />
            </Field>
            <Field label="YouTube" name="youtube_url" errors={form.errors}>
              <input
                className="mt-2 w-full rounded-md border border-slate-300 px-4 py-2 text-sm focus:border-[#0f2d19] focus:ring-1 focus:ring-[#0f2d19]/30"
                value={form.data.youtube_url}
                onChange={(event) => form.setData('youtube_url', event.target.value)}
              />
            </Field>
          </div>
        </FormPanel>

        <FormPanel title="Mentions">
          <Field label="Texte copyright" name="copyright_text" errors={form.errors}>
            <input
              className="mt-2 w-full rounded-md border border-slate-300 px-4 py-2 text-sm focus:border-[#0f2d19] focus:ring-1 focus:ring-[#0f2d19]/30"
              value={form.data.copyright_text}
              onChange={(event) => form.setData('copyright_text', event.target.value)}
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

FooterEdit.layout = (page: ReactNode) => <AdminLayout>{page}</AdminLayout>;

export default FooterEdit;
