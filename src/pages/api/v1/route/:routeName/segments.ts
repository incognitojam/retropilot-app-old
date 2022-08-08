import type { NextApiRequest, NextApiResponse } from 'next';

/**
 * GET /v1/route/:routeName/segments
 *
 * Routes - Route Segments
 *
 * Returns list of segments comprising a route. Authenticated user must have ownership of or read
 * access to device from which route was uploaded.
 */
export default (req: NextApiRequest, res: NextApiResponse) => {
  // TODO: implement
  res.status(501).end('Not Implemented');
};
