import type { NextApiRequest, NextApiResponse } from 'next';

/**
 * GET /v1.1/devices/:dongleId/stats
 *
 * Device driving statistics
 *
 * Returns aggregate driving statistics for a device.
 */
export default (req: NextApiRequest, res: NextApiResponse) => {
  // TODO: implement
  res.status(501).end('Not Implemented');
};
