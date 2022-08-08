import type { NextApiRequest, NextApiResponse } from 'next';

/**
 * GET /v1/me/devices
 *
 * Account - Devices
 *
 * List devices owned or readable by authenticated user.
 */
export default (req: NextApiRequest, res: NextApiResponse) => {
  // TODO: implement
  res.status(501).end('Not Implemented');
};
