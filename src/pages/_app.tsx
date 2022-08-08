import '../styles/globals.css';
import type { AppContext, AppInitialProps, AppLayoutProps } from 'next/app';
import { NextComponentType } from 'next';
import { ReactNode } from 'react';

export default function MyApp({ Component, pageProps }: AppLayoutProps): NextComponentType<AppContext, AppInitialProps, AppLayoutProps> {
  // Use the layout defined at the page level, if available
  const getLayout = Component.getLayout || ((page: ReactNode) => page);

  return getLayout(<Component {...pageProps} />);
}
