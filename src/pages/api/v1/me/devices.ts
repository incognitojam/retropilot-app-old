import type { NextApiRequest, NextApiResponse } from 'next';

/**
 * GET /v1/me/devices
 *
 * Account - Devices
 *
 * List devices owned or readable by authenticated user.
 */
export default (req: NextApiRequest, res: NextApiResponse<Api.ErrorResponse>) => {
  res.status(501).json({
    code: 501,
    error: 'Not Implemented',
  });
};
