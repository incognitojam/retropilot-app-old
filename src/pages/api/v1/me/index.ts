import type { NextApiRequest, NextApiResponse } from 'next';

/**
 * GET /v1/me
 *
 * Account - Profile
 *
 * Returns information about the authenticated user.
 */
export default (req: NextApiRequest, res: NextApiResponse) => {
  // TODO: implement
  res.status(501).end('Not Implemented');
};
