import type { NextApiRequest, NextApiResponse } from 'next';

/**
 * GET /v1/devices/:dongleId/users
 *
 * Device users
 *
 * List users with access to a device.
 */
export default (req: NextApiRequest, res: NextApiResponse) => {
  // TODO: implement
  res.status(501).end('Not Implemented');
};
