import RetroPilotFooter from './footer';
import RetroPilotHeader from './header';

type LayoutProps = {
  children: React.ReactNode,
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <>
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
