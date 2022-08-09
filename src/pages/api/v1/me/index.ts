import type { NextApiRequest, NextApiResponse } from 'next';

/**
 * GET /v1/me
 *
 * Account - Profile
 *
 * Returns information about the authenticated user.
 */
export default (req: NextApiRequest, res: NextApiResponse<Api.ErrorResponse>) => {
  res.status(501).json({
    code: 501,
    error: 'Not Implemented',
  });
};
