import { randomUUID } from 'crypto';
import type { NextApiRequest, NextApiResponse } from 'next';
import { Secret, verify } from '../../../lib/jwt';
import prisma from '../../../lib/prisma';

/**
 * POST /v2/pilotauth
 *
 * openpilot auth
 *
 * Pair a comma EON to authenticated user's account.
 */
export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    res.status(405).end('Method Not Allowed');
    return;
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
    res.status(400).end('Bad Request');
    return;
  }

  const existingDevice = await prisma.device.findFirst({ where: { serial } });
  if (existingDevice) {
    res.json({ first_pair: false, dongle_id: existingDevice.dongleId });
    return;
  }

  const device = await prisma.device.create({
    data: {
      dongleId: randomUUID(),
      imei,
      serial,
      deviceType: 'freon',
      publicKey,
    },
  });

  res.status(201).json({ dongle_id: device.dongleId, access_token: 'DEPRECATED-BUT-REQUIRED-FOR-07' });
};
