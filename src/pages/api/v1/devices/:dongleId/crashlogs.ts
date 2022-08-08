import type { NextApiRequest, NextApiResponse } from 'next';

/**
 * GET /v1/devices/:dongleId/crashlogs
 *
 * Device crash logs
 *
 * Returns most recent crashlogs uploaded from a device.
 */
export default (req: NextApiRequest, res: NextApiResponse) => {
  // TODO: implement
  res.status(501).end('Not Implemented');
};
