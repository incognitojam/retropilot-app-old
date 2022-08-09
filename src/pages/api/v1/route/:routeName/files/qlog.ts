import type { NextApiRequest, NextApiResponse } from 'next';

/**
 * GET /v1/route/:routeName/files/qlog
 *
 * Raw driving data - Qlogs
 *
 * Retrieve uploaded qlogs for a route.
 */
export default (req: NextApiRequest, res: NextApiResponse<Api.ErrorResponse>) => {
  res.status(501).json({
    code: 501,
    error: 'Not Implemented',
  });
};
