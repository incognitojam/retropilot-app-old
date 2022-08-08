import type { NextApiRequest, NextApiResponse } from 'next';

/**
 * GET /v1/devices/:dongleId/segments
 *
 * Segments
 *
 * Returns time-sorted list of segments, each of which includes basic metadata derived from the
 * openpilot logs.
 */
export default (req: NextApiRequest, res: NextApiResponse) => {
  // TODO: implement
  res.status(501).end('Not Implemented');
};
