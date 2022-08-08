import type { NextApiRequest, NextApiResponse } from 'next';

// /v1/devices/:dongleId
export default (req: NextApiRequest, res: NextApiResponse) => {
  switch (req.method) {
    case 'GET':
      return get(req, res);
    case 'PATCH':
      return patch(req, res);
    default:
      return res.status(405);
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
  return res.redirect((req.url as string).replace('v1', 'v1.1'));
};

/**
 * PATCH /v1/devices/:dongleId
 *
 * Device - Update device properties
 *
 * Update device `alias`.
 */
const patch = (req: NextApiRequest, res: NextApiResponse) => {
  // TODO: implement
  return res.status(501);
};
