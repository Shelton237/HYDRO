import Footer from '@/components/sections/footer';
import HeaderTwo from '@/components/headers/headerTwo';
import useAnimation from '@/hooks/useAnimation';
import { PropsWithChildren } from 'react';
import { usePage } from '@inertiajs/react';

const LayoutTwo = ({ children }: PropsWithChildren) => {
  useAnimation();
  const { props } = usePage();
  const footer = props.footer;

  return (
    <>
      <HeaderTwo />
      {children}
      <Footer footer={footer} />
    </>
  );
};

export default LayoutTwo;
