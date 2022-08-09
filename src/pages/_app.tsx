import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { ReactNode } from 'react';
import { SessionProvider } from 'next-auth/react';
import { NextPage } from 'next';

type GetLayout = (page: ReactNode) => ReactNode;

export type Page<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: GetLayout;
};

type Props<P = {}> = AppProps<P> & {
  Component: Page<P>;
};

const defaultGetLayout: GetLayout = (page: ReactNode): ReactNode => page;

const App = ({ Component, pageProps }: Props): JSX.Element => {
  const getLayout = Component.getLayout ?? defaultGetLayout;

  return (
    <SessionProvider>
      {getLayout(<Component {...pageProps} />)}
    </SessionProvider>
  );
};

export default App;
