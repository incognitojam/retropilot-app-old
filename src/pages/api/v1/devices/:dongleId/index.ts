import type { NextApiRequest, NextApiResponse } from 'next';

// /v1/devices/:dongleId
export default (req: NextApiRequest, res: NextApiResponse) => {
  switch (req.method) {
    case 'GET':
      get(req, res);
      break;
    case 'PATCH':
      patch(req, res);
      break;
    default:
      res.setHeader('Allow', ['GET', 'PATCH']);
      res.status(405).json({
        error: 'Method Not Allowed',
        details: `This endpoint does not support ${req.method} requests.`,
      });
  }
};

/**
 * GET /v1/devices/:dongleId
 *
 * Device - Device info
 *
 * DEPRECATED: Superceded by GET /v1.1/devices/:dongleId
 */
const get = (req: NextApiRequest, res: NextApiResponse) => {
  res.redirect((req.url as string).replace('v1', 'v1.1'));
};

/**
 * PATCH /v1/devices/:dongleId
 *
 * Device - Update device properties
 *
 * Update device `alias`.
 */
const patch = (req: NextApiRequest, res: NextApiResponse<Api.ErrorResponse>) => {
  res.status(501).json({
    code: 501,
    error: 'Not Implemented',
  });
};
