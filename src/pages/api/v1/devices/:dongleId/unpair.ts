import type { NextApiRequest, NextApiResponse } from 'next';

/**
 * POST /v1/devices/:dongleId/unpair
 *
 * Unpair device
 *
 * Unpair a device. Authed user must be device owner to perform.
 */
export default (req: NextApiRequest, res: NextApiResponse) => {
  // TODO: implement
  return res.status(501);
};
