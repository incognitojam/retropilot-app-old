import { Device } from '@prisma/client';
import { Button, Card } from 'flowbite-react';
import { GetServerSideProps } from 'next';
import { unstable_getServerSession } from 'next-auth';
import Layout from '../components/layout';
import prisma from '../lib/prisma';
import { authOptions } from './api/auth/[...nextauth]';
import { Page } from './_app';
import 'mapbox-gl/dist/mapbox-gl.css';
import dynamic from 'next/dynamic';
import { DashboardMapLocation } from '../components/dashboard/DashboardMap';

type Props = {
  devices: Device[];
};

/**
 * Dashboard
 *
 * Pair and view your paired devices.
 */
const DashboardPage: Page<Props> = ({ devices }) => {
  const DashboardMap = dynamic(() => import('../components/dashboard/DashboardMap'), {
    loading: () => <span>Loading...</span>,
    ssr: false,
  });
  const locations: DashboardMapLocation[] = [];

  return (
    <>
      <h1 className="mb-6 text-5xl font-extrabold">
        Dashboard
      </h1>
      <DashboardMap locations={locations} />
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
};

DashboardPage.getLayout = (page: React.ReactNode) => (
  <Layout title="Dashboard">{page}</Layout>
);

export const getServerSideProps: GetServerSideProps<Props> = async (context) => {
  const session = await unstable_getServerSession(context.req, context.res, authOptions);

  if (!session) {
    return {
      redirect: {
        destination: '/api/auth/signin',
        permanent: false,
      },
    };
  }

  const devices = await prisma.device.findMany({
    where: { pairedUserId: session.id },
  });

  return {
    props: {
      devices,
    },
  };
};

export default DashboardPage;
