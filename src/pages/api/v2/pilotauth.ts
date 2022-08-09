import { randomUUID } from 'crypto';
import type { NextApiRequest, NextApiResponse } from 'next';
import { Secret, verify } from '../../../lib/jwt';
import prisma from '../../../lib/prisma';

type PilotAuthResponseV1 = {
  dongle_id: string;
  access_token: string;
};

type PilotAuthResponseV2 = {
  dongle_id: string;
  first_pair: boolean;
}

type PilotAuthResponse = PilotAuthResponseV1 | PilotAuthResponseV2;

/**
 * POST /v2/pilotauth
 *
 * openpilot auth
 *
 * Pair a comma EON to authenticated user's account.
 */
export default async (req: NextApiRequest, res: NextApiResponse<Api.Response<PilotAuthResponse>>) => {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    res.status(405).json({
      code: 405,
      error: 'Method Not Allowed',
      details: `This endpoint does not support ${req.method} requests.`,
    });
    return;
  }

  const {
    imei,
    imei2,
    public_key: publicKey,
    register_token,
    serial,
  } = req.query as { [key: string]: any };

  if (!imei || !serial) {
    res.status(400).json({
      code: 400,
      error: 'Bad Request',
      details: 'Missing required parameters: imei, serial',
    });
    return;
  }

  const tokenValidation = await verify(register_token, publicKey as Secret);
  if (!tokenValidation) {
    res.status(401).json({
      code: 401,
      error: 'Unauthorized',
      details: 'Invalid register token',
    });
    return;
  }

  let device = await prisma.device.findFirst({ where: { serial } });
  if (!device) {
    device = await prisma.device.create({
      data: {
        dongleId: randomUUID(),
        imei,
        serial,
        deviceType: 'freon',
        publicKey,
      },
    });
    res.status(201);
  }

  // TODO: why is access token deprecated?
  res.json({ dongle_id: device.dongleId, access_token: 'DEPRECATED-BUT-REQUIRED-FOR-07' });
};
