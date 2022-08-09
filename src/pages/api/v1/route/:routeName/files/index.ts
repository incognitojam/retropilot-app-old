import type { NextApiRequest, NextApiResponse } from 'next';

/**
 * GET /v1/route/:routeName/files
 *
 * Raw driving data - Files
 *
 * Retrieve uploaded files for a route. Calls to this API are rate limited to 5 per minute.
 */
export default (req: NextApiRequest, res: NextApiResponse<Api.ErrorResponse>) => {
  res.status(501).json({
    code: 501,
    error: 'Not Implemented',
  });
};
