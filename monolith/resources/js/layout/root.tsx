import Footer from '@/components/sections/footer';
import HeaderTwo from '@/components/headers/headerTwo';
import useAnimation from '@/hooks/useAnimation';
import { PropsWithChildren } from 'react';
import { usePage } from '@inertiajs/react';

const RootLayout = ({ children }: PropsWithChildren) => {
  useAnimation();
  const { url, props } = usePage();
  const footer = props.footer;
  const privatePrefixes = ['/dashboard', '/admin', '/profile'];
  const hideChrome = privatePrefixes.some((prefix) => url.startsWith(prefix));

  return (
    <>
      {!hideChrome && <HeaderTwo />}
      {children}
      {!hideChrome && <Footer footer={footer} />}
    </>
  );
};

export default RootLayout;
