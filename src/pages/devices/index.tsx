import { useRef } from 'react';
import { Device } from '@prisma/client';
import { Button } from 'flowbite-react';
import { GetServerSideProps } from 'next';
import { unstable_getServerSession } from 'next-auth';
import dynamic from 'next/dynamic';
import Layout from '../../components/layout';
import prisma from '../../lib/prisma';
import { authOptions } from '../api/auth/[...nextauth]';
import { Page } from '../_app';
import 'mapbox-gl/dist/mapbox-gl.css';
import { DashboardMapLocation } from '../../components/devices/DashboardMap';
import DeviceCard from '../../components/devices/DeviceCard';
import { createMockDevice } from '../../lib/mock';
import PairDeviceModal from '../../components/devices/PairDeviceModal';

type Props = {
  devices: Device[];
  locations: DashboardMapLocation[];
};

/**
 * Devices Dashboard
 *
 * Pair and view your paired devices.
 */
const DevicesDashboardPage: Page<Props> = ({ devices, locations }) => {
  const DashboardMap = dynamic(() => import('../../components/devices/DashboardMap'), {
    loading: () => <span>Loading...</span>,
    ssr: false,
  });

  const pairingModal = useRef(false);
  const openPairingModal = () => pairingModal.current = true;
  const closePairingModal = () => pairingModal.current = false;

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
        show={pairingModal.current}
        onClose={closePairingModal}
      />
    </>
  );
};

DevicesDashboardPage.getLayout = (page: React.ReactNode) => (
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
      label: `Device ${dongleId}`,
      lng: -0.1276 + Math.random() * 0.1,
      lat: 51.5072 + Math.random() * 0.1,
    } as DashboardMapLocation;
  });

  return {
    props: {
      devices,
      locations,
    },
  };
};

export default DevicesDashboardPage;
