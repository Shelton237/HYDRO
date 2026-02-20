import ServiceForm from '@/components/admin/ServiceForm';
import AdminLayout from '@/Layouts/AdminLayout';
import { Head, Link } from '@inertiajs/react';
import type { ReactNode } from 'react';

const ServiceCreate = () => {
  return (
    <>
      <Head title="Cr?er un service" />
      <section className="space-y-6">
        <header className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.35em] text-slate-500">Services</p>
            <h1 className="mt-2 text-2xl font-semibold text-slate-900">Nouveau service</h1>
            <p className="mt-1 text-sm text-slate-500">D?finissez ici le contenu visible sur la page d?accueil.</p>
          </div>
          <Link href="/admin/services" className="text-sm font-semibold text-slate-600 hover:text-slate-900 hover:underline">
            Retour ? la liste
          </Link>
        </header>

        <div className="rounded-3xl border border-slate-200 bg-white p-6">
          <ServiceForm submitUrl="/admin/services" />
        </div>
      </section>
    </>
  );
};

ServiceCreate.layout = (page: ReactNode) => <AdminLayout>{page}</AdminLayout>;

export default ServiceCreate;
