import type { NextApiRequest, NextApiResponse } from 'next';

/**
 * GET /v1/route/:routeName/files/qlog
 *
 * Raw driving data - Qlogs
 *
 * Retrieve uploaded qlogs for a route.
 */
export default (req: NextApiRequest, res: NextApiResponse) => {
  // TODO: implement
  return res.status(501);
};
