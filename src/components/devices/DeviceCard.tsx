import { Device } from '@prisma/client';
import { Badge, Card } from 'flowbite-react';
import { NextComponentType, NextPageContext } from 'next';

type Props = {
  device: Device;
};

const DeviceCard: NextComponentType<NextPageContext, {}, Props> = ({ device }) => {
  return (
    <div className="hover:shadow-xl transition-shadow">
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
          <Badge color="success" style={{ marginLeft: 12 }}>
            Online
          </Badge>
        </div>
      </Card>
    </div>
  );
};

export default DeviceCard;
