import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../../../../lib/prisma';

/**
 * GET /v1.1/devices/:dongleId
 *
 * Device Info
 *
 * Returns an object representing a comma device.
*/
export default async (req: NextApiRequest, res: NextApiResponse<Api.Device>) => {
  // TODO: user guard and filter by account
  const device = await prisma.device.findFirst({ where: { dongleId: req.query.dongleId as string } });
  if (!device) {
    return res.status(404);
  }

  return res.json({
    dongle_id: device.dongleId,
    alias: device.nickname,
    serial: device.serial,
    is_paired: device.pairedUserId !== null,
    public_key: device.publicKey,
    prime_type: 0, // TODO: Prime type: 0: no prime, 1: standard prime, 2: prime lite
  });
};
