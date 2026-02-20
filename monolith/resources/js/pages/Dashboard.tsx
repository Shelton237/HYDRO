import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head, Link } from '@inertiajs/react';

const stats = [
    { label: 'Produits actifs', value: '24', detail: '+3 ce mois' },
    { label: 'Demandes en cours', value: '7', detail: 'Nouvelles fiches' },
    { label: 'Dernière mise à jour', value: 'Hero accueil', detail: 'il y a 2 heures' },
];

const shortcuts = [
    { title: 'Hero accueil', description: 'Titre, boutons et image de la bannière', href: '/admin/hero' },
    { title: 'Catalogue', description: 'Produits visibles sur le site', href: '/admin/products' },
    { title: 'Créer un produit', description: 'Ajouter une nouvelle référence', href: '/admin/products/create' },
    { title: 'Profil', description: 'Coordonnées et sécurité', href: '/profile' },
];

const activities = [
    { title: 'Hero mis à jour', detail: 'Texte principal actualisé', time: 'Il y a 2 h' },
    { title: 'Produit ajouté', detail: 'Pompe submersible S400', time: 'Hier' },
    { title: 'Catalogue exporté', detail: 'Téléchargement CSV', time: 'Il y a 3 jours' },
];

export default function Dashboard() {
    return (
        <DashboardLayout>
            <Head title="Dashboard" />

            <section className="space-y-10">
                <header>
                    <p className="text-xs uppercase tracking-[0.35em] text-slate-500">Synthèse</p>
                    <h1 className="mt-3 text-3xl font-semibold text-slate-900">Tableau de bord</h1>
                    <p className="mt-2 max-w-2xl text-sm text-slate-500">
                        Surveillez vos contenus publics et accédez rapidement aux outils clés du backoffice.
                    </p>
                </header>

                <div className="grid gap-4 md:grid-cols-3">
                    {stats.map((stat) => (
                        <StatCard key={stat.label} {...stat} />
                    ))}
                </div>

                <div className="grid gap-6 lg:grid-cols-3">
                    <div className="space-y-6 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm lg:col-span-2">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-xs uppercase tracking-[0.3em] text-slate-400">Actions rapides</p>
                                <p className="text-lg font-semibold text-slate-900">Gestion opérationnelle</p>
                            </div>
                            <span className="text-xs text-slate-400">Mise à jour continue</span>
                        </div>
                        <div className="grid gap-4 md:grid-cols-2">
                            {shortcuts.map((item) => (
                                <ShortcutCard key={item.title} {...item} />
                            ))}
                        </div>
                    </div>
                    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                        <p className="text-xs uppercase tracking-[0.3em] text-slate-400">Activités</p>
                        <h2 className="mt-2 text-lg font-semibold text-slate-900">Historique récent</h2>
                        <ul className="mt-6 space-y-4">
                            {activities.map((activity) => (
                                <ActivityItem key={`${activity.title}-${activity.time}`} {...activity} />
                            ))}
                        </ul>
                    </div>
                </div>
            </section>
        </DashboardLayout>
    );
}

Dashboard.layout = (page) => page;

const StatCard = ({ label, value, detail }: { label: string; value: string; detail: string }) => (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <p className="text-xs uppercase tracking-[0.3em] text-slate-400">{label}</p>
        <p className="mt-2 text-3xl font-semibold text-slate-900">{value}</p>
        <p className="mt-1 text-sm text-emerald-600">{detail}</p>
    </div>
);

const ShortcutCard = ({
    title,
    description,
    href,
}: {
    title: string;
    description: string;
    href: string;
}) => (
    <div className="flex flex-col rounded-2xl border border-slate-100 bg-slate-50/70 p-4">
        <p className="text-sm font-semibold text-slate-900">{title}</p>
        <p className="mt-1 flex-1 text-xs text-slate-500">{description}</p>
        <Link
            href={href}
            className="mt-4 inline-flex items-center justify-between rounded-xl bg-white px-3 py-2 text-xs font-semibold text-slate-700 shadow-sm transition hover:bg-slate-100"
        >
            Accéder
            <span aria-hidden>→</span>
        </Link>
    </div>
);

const ActivityItem = ({
    title,
    detail,
    time,
}: {
    title: string;
    detail: string;
    time: string;
}) => (
    <li className="rounded-2xl border border-slate-100 px-4 py-3">
        <p className="text-sm font-semibold text-slate-900">{title}</p>
        <p className="text-xs text-slate-500">{detail}</p>
        <p className="mt-1 text-xs text-slate-400">{time}</p>
    </li>
);
