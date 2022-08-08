import type { NextApiRequest, NextApiResponse } from 'next';

/**
 * GET /v1/route/:routeName/files
 *
 * Raw driving data - Files
 *
 * Retrieve uploaded files for a route. Calls to this API are rate limited to 5 per minute.
 */
export default (req: NextApiRequest, res: NextApiResponse) => {
  // TODO: implement
  return res.status(501);
};
