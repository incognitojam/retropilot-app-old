import type { NextApiRequest, NextApiResponse } from 'next';

/**
 * GET /v2/leaderboard
 *
 * Leaderboard - List top leaders
 *
 * Returns overall and last-week comma point leaders.
 */
export default (req: NextApiRequest, res: NextApiResponse) => {
  // TODO: implement
  res.status(501).end('Not Implemented');
};
