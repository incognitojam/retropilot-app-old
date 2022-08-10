import { Device } from '@prisma/client';
import { Badge, Card } from 'flowbite-react';
import { NextComponentType, NextPageContext } from 'next';

type Props = {
  device: Device;
};

const DeviceCard: NextComponentType<NextPageContext, {}, Props> = ({ device }) => {
  return (
    <Card>
      <div className="flex justify-between">
        <div>
          <div className="text-3xl font-bold">
            Dongle <pre className="inline">{device.dongleId}</pre>
          </div>
          <div className="text-md">
            <pre className="inline">{device.nickname}</pre>
          </div>
        </div>
        <Badge color="success">
          Updated 2 minutes ago
        </Badge>
      </div>
    </Card>
  );
};

export default DeviceCard;
