import '@/assets/css/all.min.css';
import '@/assets/css/animate.css';
import '@/assets/scss/main.scss';
import RootLayout from '@/layout/root';
import './bootstrap';
import { createInertiaApp } from '@inertiajs/react';
import 'react-modal-video/scss/modal-video.scss';
import type { ReactNode } from 'react';
import { createRoot } from 'react-dom/client';

const appName = import.meta.env.VITE_APP_NAME || 'Laravel';
const pages = {
  ...import.meta.glob('./pages/**/*.tsx'),
  ...import.meta.glob('./pages/**/*.jsx'),
};

createInertiaApp({
  title: (title) => (title ? `${title} | ${appName}` : appName),
  resolve: async (name) => {
    const importPage =
      pages[`./pages/${name}.tsx`] ??
      pages[`./pages/${name}.jsx`] ??
      pages[`./Pages/${name}.tsx`] ??
      pages[`./Pages/${name}.jsx`];

    if (!importPage) {
      throw new Error(`Page "${name}" introuvable.`);
    }

    const module: any = await importPage();
    module.default.layout =
      module.default.layout ||
      ((page: ReactNode) => <RootLayout>{page}</RootLayout>);

    return module;
  },
  setup({ el, App, props }) {
    createRoot(el).render(<App {...props} />);
  },
});
