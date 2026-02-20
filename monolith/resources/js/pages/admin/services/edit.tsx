import ServiceForm from '@/components/admin/ServiceForm';

import AdminLayout from '@/layouts/AdminLayout';

import { Head, Link } from '@inertiajs/react';

import type { ReactNode } from 'react';



type ServiceRecord = {

  id: number;

  title: string;

  slug?: string | null;

  description?: string | null;

  icon_path?: string | null;

  link_url?: string | null;

  animation_delay?: string | null;

  position: number;

  is_featured?: boolean | null;

};



type Props = {

  service: ServiceRecord;

};





const resolveIconSrc = (icon?: string | null) => {
  if (!icon) return null;
  const trimmed = icon.trim();
  if (!trimmed) return null;
  if (trimmed.startsWith('<svg')) {
    const encoded = encodeURIComponent(trimmed).replace(/'/g, '%27').replace(/"/g, '%22');
    return `data:image/svg+xml,${encoded}`;
  }

  return trimmed;
};

const ServiceEdit = ({ service }: Props) => {

  const headTitle = `Modifier ${service.title}`;

  const submitUrl = `/admin/services/${service.id}`;
  const currentIcon = resolveIconSrc(service.icon_path);



  return (

    <>

      <Head title={headTitle} />

      <section className="space-y-8">

        <header className="space-y-3 rounded-3xl border border-slate-200 bg-white px-6 py-5 shadow-sm">

          <div className="flex flex-wrap items-center justify-between gap-4">

            <div>

              <p className="text-xs uppercase tracking-[0.35em] text-emerald-600">Services</p>

              <h1 className="mt-1 text-2xl font-semibold text-slate-900">Modifier le service</h1>

              <p className="mt-1 text-sm text-slate-500">

                Met ? jour le titre, la description, le lien et l'ic?ne affich?s dans le bloc "Services We Offer".

              </p>

            </div>

            <Link

              href="/admin/services"

              className="inline-flex items-center gap-2 rounded-full border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-600 transition hover:border-slate-300 hover:text-slate-900"

            >

              <span aria-hidden>&larr;</span> Retour ? la liste

            </Link>

          </div>

          <div className="grid gap-3 text-sm text-slate-600 md:grid-cols-3">

            <div>

              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">Titre</p>

              <p className="mt-1 font-medium text-slate-900">{service.title}</p>

            </div>

            <div>

              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">Slug</p>

              <p className="mt-1 font-medium">{service.slug ?? '?'}</p>

            </div>

            <div>

              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">Position</p>

              <p className="mt-1 font-medium">{service.position}</p>

            </div>

          </div>

        </header>



        <div className="grid gap-6 lg:grid-cols-[1.2fr,0.8fr]">

          <div className="space-y-6 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">

            <ServiceForm

              submitUrl={submitUrl}

              method="put"

              submitLabel="Enregistrer les modifications"

              initialValues={{

                title: service.title,

                slug: service.slug ?? undefined,

                description: service.description ?? '',

                icon_path: service.icon_path ?? undefined,

                link_url: service.link_url ?? '',

                animation_delay: service.animation_delay ?? '',

                position: service.position ?? 1,

                is_featured: Boolean(service.is_featured),

              }}

            />

          </div>



          <aside className="space-y-4 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">

            <div>

              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">Avant/apr?s</p>

              <p className="mt-1 text-sm text-slate-500">

                Aper?u rapide du service tel qu'il appara?t sur la page d'accueil.

              </p>

            </div>

            <div className="rounded-2xl border border-slate-100 bg-slate-50 p-4">

              {currentIcon && (

                <div className="mb-3 flex items-center justify-center">

                  <img src={currentIcon} alt="Ic?ne actuelle" className="h-16 w-16 object-contain" />

                </div>

              )}

              <h3 className="text-lg font-semibold text-slate-900">{service.title}</h3>

              {service.description && <p className="mt-1 text-sm text-slate-500">{service.description}</p>}

              <p className="mt-3 text-xs uppercase tracking-[0.3em] text-slate-400">Lien actuel</p>

              <p className="text-sm text-[#0f2d19]">{service.link_url || '/contact'}</p>

            </div>

            <div className="space-y-3 rounded-2xl border border-slate-100 bg-slate-50 p-4">

              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">Conseils</p>

              <ul className="list-disc space-y-2 pl-4 text-xs text-slate-500">

                <li>Pr?f?rez les ic?nes carr?es en SVG ou PNG transparente.</li>

                <li>Gardez le titre court (2 lignes max sur mobile).</li>

                <li>Le lien peut pointer vers un produit, un formulaire ou une page interne.</li>

              </ul>

            </div>

          </aside>

        </div>

      </section>

    </>

  );

};



ServiceEdit.layout = (page: ReactNode) => <AdminLayout>{page}</AdminLayout>;



export default ServiceEdit;

