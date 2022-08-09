import type { NextApiRequest, NextApiResponse } from 'next';

/**
 * POST /v1/devices/:dongleId/del_user
 *
 * Remove device read permissions from user
 *
 * Remove read permissions from a user by email. Authed user must be device owner to perform. If
 * multiple users are attached to an email address, the device removed from all users.
 */
export default (req: NextApiRequest, res: NextApiResponse<Api.ErrorResponse>) => {
  res.status(501).json({
    code: 501,
    error: 'Not Implemented',
  });
};
