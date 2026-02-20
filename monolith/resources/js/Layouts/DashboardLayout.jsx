import ApplicationLogo from '@/components/ApplicationLogo';
import { Link, usePage } from '@inertiajs/react';
import { useMemo } from 'react';
import '../../css/admin.css';

const navigation = [
  {
    section: 'Console',
    links: [
      { label: 'Tableau de bord', href: '/dashboard' },
      { label: 'Profil', href: '/profile' },
    ],
  },
      {
        section: 'Contenus',
        links: [
          { label: 'Hero accueil', href: '/admin/hero' },
          { label: '� propos', href: '/admin/about' },
          { label: 'Footer', href: '/admin/footer' },
          { label: 'Contact', href: '/admin/contact' },
          { label: 'Sections accueil', href: '/admin/home-sections' },
          { label: 'Catalogue', href: '/admin/products' },
          { label: 'Services', href: '/admin/services' },
        ],
      },
];

const DashboardLayout = ({ children }) => {
  const { url, props } = usePage();
  const user = props.auth?.user;
  const flash = props.flash;
  const year = useMemo(() => new Date().getFullYear(), []);

  const isActive = (href) => {
    if (href === '/dashboard') {
      return url === href;
    }
    if (href === '/admin/products') {
      return url === href || (url.startsWith('/admin/products/') && !url.endsWith('/create'));
    }
    if (href === '/admin/services') {
      return url === href || (url.startsWith('/admin/services/') && !url.endsWith('/create'));
    }
    if (href === '/admin/footer') {
      return url === href;
    }
    if (href === '/admin/contact') {
      return url === href;
    }
    if (href === '/admin/about') {
      return url === href;
    }
    if (href === '/admin/home-sections') {
      return url === href;
    }

    return url.startsWith(href);
  };

  const flatNav = navigation.flatMap((group) => group.links);

  return (
    <div className="flex min-h-screen bg-slate-100 text-slate-900">
      <aside className="hidden w-72 flex-shrink-0 flex-col bg-[#0f2d19] text-white lg:flex">
        <div className="flex h-full flex-col px-6 py-8">
          <div className="flex items-center gap-3">
            <ApplicationLogo className="h-30 w-auto mx-auto" />
          </div>
          <div className="mt-8 flex-1 space-y-8 text-sm font-semibold">
            {navigation.map((group) => (
              <div key={group.section}>
                <p className="text-xs uppercase tracking-[0.3em] text-white/50">{group.section}</p>
                <div className="mt-3 flex flex-col gap-1">
                  {group.links.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className={`flex items-center gap-2 rounded px-4 py-2 transition ${
                        isActive(link.href)
                          ? 'bg-white/15 text-white shadow-sm'
                          : 'text-white/70 hover:bg-white/5'
                      }`}
                    >
                      <span className="inline-flex h-2 w-2 rounded-full bg-white/60" />
                      {link.label}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <div className="mt-auto rounded-2xl bg-white/10 p-4 text-xs text-white/80">
            <p className="font-semibold text-white">Support</p>
            <p className="mt-2">contact@camerounhydraulique.com</p>
            <p className="mt-1">(+237) 674 048 225</p>
          </div>
        </div>
      </aside>

      <div className="flex flex-1 flex-col">
        <header className="border-b border-slate-200 bg-white">
          <div className="mx-auto flex w-full flex-col gap-4 px-6 py-5 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.35em] text-slate-400">Console administrateur</p>
              <p className="text-xl font-semibold text-slate-900">Cameroun Hydraulique</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="text-sm font-semibold text-slate-900">{user?.name ?? 'Utilisateur'}</p>
                <p className="text-xs text-slate-500">{user?.email}</p>
              </div>
              <Link
                href="/logout"
                method="post"
                as="button"
                className="rounded-xl border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
              >
                D�connexion
              </Link>
            </div>
          </div>
          <div className="border-t border-slate-200 bg-white px-4 py-2 lg:hidden">
            <div className="flex gap-2 overflow-x-auto text-sm font-semibold text-slate-700">
              {flatNav.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`rounded-full px-3 py-1 ${
                    isActive(link.href) ? 'bg-slate-900 text-white' : 'bg-slate-100'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto">
          <div className="mx-auto w-full px-6 py-8">
            {flash?.success && (
              <div className="mb-4 rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-800">
                {flash.success}
              </div>
            )}
            {children}
          </div>
        </main>

        <footer className="border-t border-slate-200 bg-white">
          <div className="mx-auto flex w-full flex-col gap-2 px-4 py-4 text-xs text-slate-500 sm:flex-row sm:items-center sm:justify-between">
            <span>© {year} Cameroun Hydraulique — Espace privé</span>
            <span>Mis à jour en local</span>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default DashboardLayout;

