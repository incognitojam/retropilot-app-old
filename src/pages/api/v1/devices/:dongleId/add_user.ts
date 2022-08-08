import type { NextApiRequest, NextApiResponse } from 'next';

/**
 * POST /v1/devices/:dongleId/add_user
 *
 * Grant device read permissions to user
 *
 * Grant read permissions to a user by email. Authed user must be device owner to perform. If
 * multiple users are attached to an email address, the device is shared with all users.
 */
export default (req: NextApiRequest, res: NextApiResponse) => {
  // TODO: implement
  return res.status(501);
};
