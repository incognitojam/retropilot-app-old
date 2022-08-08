import type { NextApiRequest, NextApiResponse } from 'next';

/**
 * GET /v1/devices/:dongleId/stats
 *
 * DEPRECATED: Superceded by GET /v1.1/devices/:dongleId/stats
 */
export default (req: NextApiRequest, res: NextApiResponse) => {
  return res.redirect((req.url as string).replace('v1', 'v1.1'));
};
