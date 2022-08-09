import '../styles/globals.css';
import type { AppLayoutProps } from 'next/app';
import Head from 'next/head';
import { ReactNode } from 'react';
import { SessionProvider } from 'next-auth/react';

export default function MyApp({ Component, pageProps }: AppLayoutProps) {
  // Use the layout defined at the page level, if available
  const getLayout = Component.getLayout || ((page: ReactNode) => page);

  return (
    <>
      <SessionProvider>
        {getLayout(<Component {...pageProps} />)}
      </SessionProvider>
    </>
  );
}
