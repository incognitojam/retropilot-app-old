import type { NextApiRequest, NextApiResponse } from 'next';

/**
 * GET /v2/leaderboard
 *
 * Leaderboard - List top leaders
 *
 * Returns overall and last-week comma point leaders.
 */
export default (req: NextApiRequest, res: NextApiResponse<Api.ErrorResponse>) => {
  res.status(501).json({
    code: 501,
    error: 'Not Implemented',
  });
};
