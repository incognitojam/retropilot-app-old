import { useEffect, useRef, useState } from 'react';
import { Device } from '@prisma/client';
import { Button, Card } from 'flowbite-react';
import { GetServerSideProps } from 'next';
import { unstable_getServerSession } from 'next-auth';
import mapboxgl from 'mapbox-gl';
import Layout from '../components/layout';
import prisma from '../lib/prisma';
import { authOptions } from './api/auth/[...nextauth]';
import { Page } from './_app';
import 'mapbox-gl/dist/mapbox-gl.css';


mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN!;

type Props = {
  devices: Device[];
};

/**
 * Dashboard
 *
 * Pair and view your paired devices.
 */
const DashboardPage: Page<Props> = ({ devices }) => {
  const mapContainer = useRef<HTMLDivElement | null>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [lng, setLng] = useState(-71.057);
  const [lat, setLat] = useState(42.355);
  const [zoom, setZoom] = useState(9);

  useEffect(() => {
    if (map.current || !mapContainer.current) {
      return;
    }

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: { lng, lat },
      zoom,
    });
  });

  useEffect(() => {
    if (!map.current) {
      return;
    }
    map.current.on('move', () => {
      setLng(map.current!.getCenter().lng);
      setLat(map.current!.getCenter().lat);
      setZoom(map.current!.getZoom());
    });
  });

  return (
    <>
      <h1 className="mb-6 text-5xl font-extrabold">
        Dashboard
      </h1>
      <div>
        <div className="map-sidebar">
          Longitude: {lng} | Latitude {lat} | Zoom: {zoom}
        </div>
        <div className="map-container">
          <div ref={mapContainer} className="map" />
        </div>
      </div>
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
