import { Device } from '@prisma/client';
import { Page } from '../_app';
import { GetServerSideProps } from 'next';
import { unstable_getServerSession } from 'next-auth';
import { authOptions } from '../api/auth/[...nextauth]';
import prisma from '../../lib/prisma';


type Params = {
  dongleId: string;
};

type Props = {
  device?: Device;
  notAuthorised?: boolean;
};

const DevicePage: Page<Props> = ({ device, notAuthorised }) => {
  if (notAuthorised || !device) {
    return (
      <div>
        Not authorised
      </div>
    );
  }

  return (
    <div>
      Hello, world!
    </div>
  );
};

export const getServerSideProps: GetServerSideProps<Props> = async (context) => {
  const { dongleId } = context.params as Params;
  if (!dongleId) {
    return {
      notFound: true,
    };
  }

  const session = await unstable_getServerSession(context.req, context.res, authOptions);
  if (!session) {
    return {
      redirect: {
        destination: '/api/auth/signin',
        permanent: false,
      },
    };
  }

  const device = await prisma.device.findUnique({
    where: { dongleId },
  });
  if (!device) {
    return {
      notFound: true,
    };
  }
  if (device.pairedUserId != session.id) {
    // TODO: redirect 403?
    return {
      redirect: {
        destination: '/api/auth/signin',
        permanent: false,
      },
    };
  }

  return {
    props: {
      device,
    },
  };
};

export default DevicePage;
