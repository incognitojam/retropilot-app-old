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
import { useState } from 'react';
import PairDeviceModal from '../components/dashboard/PairDeviceModal';

type Props = {
  devices: Device[];
  locations: DashboardMapLocation[];
};

/**
 * Dashboard
 *
 * Pair and view your paired devices.
 */
const DashboardPage: Page<Props> = ({ devices, locations }) => {
  const DashboardMap = dynamic(() => import('../components/dashboard/DashboardMap'), {
    loading: () => <span>Loading...</span>,
    ssr: false,
  });

  const [pairingModal, setPairingModal] = useState(false);
  const openPairingModal = () => {
    setPairingModal(true);
  };

  return (
    <>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-5xl font-extrabold">
          🗺️ Dashboard
        </h1>

        <Button onClick={openPairingModal}>
          Pair new device
        </Button>
      </div>
      <div className="relative left-0">
        <DashboardMap locations={locations} />

        <div className="absolute top-4 bottom-4 h-fill z-10 grid gap-2 content-start">
          {devices.map((device) => (
            <DeviceCard key={device.dongleId} device={device} />
          ))}
        </div>
      </div>
      <PairDeviceModal
        show={pairingModal}
        onClose={() => setPairingModal(false)}
      />
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

  // const devices = await prisma.device.findMany({
  //   where: { pairedUserId: session.id },
  // });

  const devices = [
    createMockDevice(),
    createMockDevice(),
  ];

  const locations = devices.map(({ dongleId }) => {
    return {
      id: dongleId,
      lng: 0,
      lat: 0,
    } as DashboardMapLocation;
  });

  return {
    props: {
      devices,
      locations,
    },
  };
};

export default DashboardPage;
