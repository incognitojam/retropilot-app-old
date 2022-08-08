import type { NextApiRequest, NextApiResponse } from 'next';

/**
 * GET /v1/devices/:dongleId/athena_offline_queue
 *
 * Offline queue
 *
 * Fetch messages stored for delivery once device comes online.
 */
export default (req: NextApiRequest, res: NextApiResponse) => {
  // TODO: implement
  return res.status(501);
};
