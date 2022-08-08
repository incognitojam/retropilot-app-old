import { randomUUID } from 'crypto';
import type { NextApiRequest, NextApiResponse } from 'next';
import { Secret, verify } from '../../../../lib/jwt';
import prisma from '../../../../lib/prisma';

/**
 * POST /v2/pilotauth
 *
 * openpilot auth
 *
 * Pair a comma EON to authenticated user's account.
 */
export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'POST') {
    return res.status(405);
  }

  const {
    imei,
    imei2,
    public_key: publicKey,
    register_token,
    serial,
  } = req.query as { [key: string]: any };

  const tokenValidation = await verify(register_token, publicKey as Secret);

  if (!tokenValidation || !imei || !serial) {
    return res.status(400).send('Invalid JWT.');
  }

  const existingDevice = await prisma.device.findFirst({ where: { serial } });

  if (existingDevice) {
    return res.status(200).json({ first_pair: false, dongleId: existingDevice.dongleId });
  } else {
    const device = await prisma.device.create({
      data: {
        dongleId: randomUUID(),
        imei,
        serial,
        deviceType: 'freon',
        publicKey,
      },
    });

    return res.status(200).json({ dongle_id: device.dongleId, access_token: 'DEPRECATED-BUT-REQUIRED-FOR-07' });
  }
};
