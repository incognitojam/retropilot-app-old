import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../../../lib/prisma';

/**
 * GET /v1.1/devices/:dongleId
 *
 * Device Info
 *
 * Returns an object representing a comma device.
*/
export default async (req: NextApiRequest, res: NextApiResponse<Api.Response<Api.Device>>) => {
  // TODO: user guard and filter by account
  const device = await prisma.device.findFirst({ where: { dongleId: req.query.dongleId as string } });
  if (!device) {
    res.status(404).json({
      code: 404,
      error: 'Not Found',
      details: 'Device not found',
    });
    return;
  }

  res.json({
    dongle_id: device.dongleId,
    alias: device.nickname,
    serial: device.serial,
    is_paired: device.pairedUserId !== null,
    public_key: device.publicKey,
    prime_type: Api.PrimeType.None,
  });
};
