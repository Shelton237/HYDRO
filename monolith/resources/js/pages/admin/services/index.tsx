import AdminLayout from '@/Layouts/AdminLayout';
import { Head, Link, router } from '@inertiajs/react';
import type { ReactNode } from 'react';

type ServiceRecord = {
  id: number;
  title: string;
  description?: string | null;
  icon_path?: string | null;
  link_url?: string | null;
  animation_delay?: string | null;
  position: number;
  is_featured?: boolean | null;
};

type Props = {
  services: ServiceRecord[];
};

const ServicesIndex = ({ services }: Props) => {
  const renderIcon = (icon?: string | null) => {
    if (!icon) return null;
    const trimmed = icon.trim();
    const isSvg = trimmed.startsWith('<svg');

    if (isSvg) {
      const encoded = encodeURIComponent(trimmed).replace(/'/g, '%27').replace(/"/g, '%22');
      const src = `data:image/svg+xml,${encoded}`;
      return <img src={src} alt="" className="h-10 w-10 rounded-md border border-slate-200 object-contain" />;
    }

    return <img src={trimmed} alt="" className="h-10 w-10 rounded-md border border-slate-200 object-contain" />;
  };

  const handleDelete = (service: ServiceRecord) => {
    if (!confirm(`Supprimer le service "${service.title}" ?`)) {
      return;
    }

    router.delete(`/admin/services/${service.id}`);
  };

  return (
    <>
      <Head title="Services" />
      <section className="space-y-6">
        <header className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.35em] text-slate-500">Accueil</p>
            <h1 className="mt-2 text-2xl font-semibold text-slate-900">Bloc "Services We Offer"</h1>
            <p className="mt-1 text-sm text-slate-500">G?rez ici les cartes affich?es sur la page d?accueil.</p>
          </div>
          <Link
            href="/admin/services/create"
            className="inline-flex items-center rounded-full bg-[#0f2d19] px-6 py-2 text-sm font-semibold text-white transition hover:bg-[#0d2415]"
          >
            Nouveau service
          </Link>
        </header>

        <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white">
          <table className="min-w-full divide-y divide-slate-100 text-sm">
            <thead className="bg-slate-50 text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">
              <tr>
                <th className="px-4 py-3 text-left">Service</th>
                <th className="px-4 py-3 text-left">Lien</th>
                <th className="px-4 py-3 text-left">Ordre</th>
                <th className="px-4 py-3 text-left">En avant</th>
                <th className="px-4 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {services.map((service) => (
                <tr key={service.id}>
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-4">
                      {renderIcon(service.icon_path)}
                      <div>
                        <p className="font-semibold text-slate-900">{service.title}</p>
                        {service.description && (
                          <p className="text-xs text-slate-500 line-clamp-2">{service.description}</p>
                        )}
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-4 text-slate-600">{service.link_url ?? '?'}</td>
                  <td className="px-4 py-4 text-slate-600">{service.position}</td>
                  <td className="px-4 py-4">
                    {service.is_featured ? (
                      <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">Oui</span>
                    ) : (
                      <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-500">Non</span>
                    )}
                  </td>
                  <td className="px-4 py-4 text-right">
                    <div className="inline-flex items-center gap-3 text-sm font-semibold">
                      <Link href={`/admin/services/${service.id}/edit`} className="text-[#0f2d19] hover:underline">
                        Modifier
                      </Link>
                      <button
                        type="button"
                        onClick={() => handleDelete(service)}
                        className="text-red-600 hover:underline"
                      >
                        Supprimer
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {services.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-4 py-6 text-center text-sm text-slate-500">
                    Aucun service configur? pour le moment.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
};

ServicesIndex.layout = (page: ReactNode) => <AdminLayout>{page}</AdminLayout>;

export default ServicesIndex;
