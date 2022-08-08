import type { NextApiRequest, NextApiResponse } from 'next';

/**
 * GET /v1/navigation/:dongleId/set_destination
 *
 * Navigation - Set destination
 *
 * Set navigation destination on device. If device is offline, the destination will be saved in the
 * database to be retrieved when the device boots. Also updates navigations recents list.
 */
export default (req: NextApiRequest, res: NextApiResponse) => {
  // TODO: implement
  res.status(501).end('Not Implemented');
};
