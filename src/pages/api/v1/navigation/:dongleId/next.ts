import type { NextApiRequest, NextApiResponse } from 'next';

/**
 * GET /v1/navigation/:dongleId/next
 *
 * Navigation - Retrieve next destination
 *
 * Retrieve next location from database. This was set on Set destination if the device was offline.
 * Next location is removed from database after this call, or when a new destination is set.
 */
export default (req: NextApiRequest, res: NextApiResponse<Api.ErrorResponse>) => {
  res.status(501).json({
    code: 501,
    error: 'Not Implemented',
  });
};
