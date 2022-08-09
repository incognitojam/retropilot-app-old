import Head from 'next/head';
import RetroPilotFooter from './footer';
import RetroPilotHeader from './header';

type LayoutProps = {
  children: React.ReactNode,
  title?: string,
}

const Layout = ({ children, title }: LayoutProps) => {
  const pageTitle = title ? `${title} - RetroPilot` : 'RetroPilot';
  return (
    <>
      <Head>
        <title>{pageTitle}</title>
        <meta name="description" content="RetroPilot" />
        <link rel="icon" href="/favicon.png" />
      </Head>
      <RetroPilotHeader />
      <div className="flex dark:bg-gray-900">
        <main className="order-2 mx-4 mt-4 mb-24 flex-[1_0_16rem]">
          {children}
        </main>
      </div>
      <RetroPilotFooter />
    </>
  );
};

export default Layout;
