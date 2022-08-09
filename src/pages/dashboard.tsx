import { Button, Card } from 'flowbite-react';
import { GetServerSideProps } from 'next';
import { Session, unstable_getServerSession } from 'next-auth';
import Layout from '../components/layout';
import { authOptions } from './api/auth/[...nextauth]';

type DashboardPageProps = {
  session: Session;
};

/**
 * Dashboard
 *
 * Pair and view your paired devices.
 */
export default function DashboardPage(props: DashboardPageProps): JSX.Element {
  // TODO: implement device list
  return (
    <>
      <h1 className="mb-6 text-5xl font-extrabold">
        Dashboard
      </h1>
      <section className="max-w-lg">
        <Card>
          <h2 className="text-3xl font-bold">
            Paired devices
          </h2>
          <p>
            No paired devices.
          </p>
        </Card>
      </section>
      <section className="max-w-lg mt-8">
        <Card>
          <h2 className="text-3xl font-bold">
            Pair new device
          </h2>
          <Button>
            Pair
          </Button>
        </Card>
      </section>
    </>
  );
}

DashboardPage.getLayout = (page: React.ReactNode) => (
  <Layout title="Dashboard">{page}</Layout>
);

export const getServerSideProps: GetServerSideProps<DashboardPageProps> = async (context) => {
  const session = await unstable_getServerSession(context.req, context.res, authOptions);

  if (!session) {
    return {
      redirect: {
        destination: '/api/auth/signin',
        permanent: false,
      },
    };
  }

  return {
    props: {
      session,
    },
  };
};
