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
import DeviceCard from '../components/dashboard/DeviceCard';
import { createMockDevice } from '../lib/mock';

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

  const device = createMockDevice();

  return (
    <>
      <h1 className="mb-6 text-5xl font-extrabold">
        🗺️ Dashboard
      </h1>
      <div className="relative left-0">
        <DashboardMap locations={locations} />

        <div className="absolute top-4 bottom-4 z-10 grid justify-between">
          <div className="grid gap-2 align-start">
            <DeviceCard device={device} />
            <DeviceCard device={device} />
            <DeviceCard device={device} />
          </div>

          <div className="self-end">
            <Card>
              <h2 className="text-2xl font-bold">
                Pair new device
              </h2>
              <Button>
                Pair
              </Button>
            </Card>
          </div>
        </div>
      </div>
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
