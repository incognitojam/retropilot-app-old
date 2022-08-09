import type { NextApiRequest, NextApiResponse } from 'next';

/**
 * POST /v1/devices/:dongleId/unpair
 *
 * Unpair device
 *
 * Unpair a device. Authed user must be device owner to perform.
 */
export default (req: NextApiRequest, res: NextApiResponse<Api.ErrorResponse>) => {
  res.status(501).json({
    code: 501,
    error: 'Not Implemented',
  });
};
