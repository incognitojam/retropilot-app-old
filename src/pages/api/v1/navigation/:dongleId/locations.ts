import type { NextApiRequest, NextApiResponse } from 'next';

/**
 * GET /v1/navigation/:dongleId/locations
 *
 * Navigation - Retrieve saved locations
 *
 * Retrieve saved locations from database.
 */
const get = (req: NextApiRequest, res: NextApiResponse) => {
  // TODO: implement
  return res.status(501);
};

/**
 * PUT /v1/navigation/:dongleId/locations
 *
 * Navigation - Set saved locations
 *
 * Save new location in database.
 */
const put = (req: NextApiRequest, res: NextApiResponse) => {
  // TODO: implement
  return res.status(501);
};

/**
 * PATCH /v1/navigation/:dongleId/locations
 * DELETE /v1/navigation/:dongleId/locations
 *
 * Navigation - Update saved locations
 *
 * Update or delete existing saved location in database.
 */
const patch = (req: NextApiRequest, res: NextApiResponse) => {
  // TODO: implement
  return res.status(501);
};


// /v1/navigation/:dongleId/locations
export default (req: NextApiRequest, res: NextApiResponse) => {
  switch (req.method) {
    case 'GET':
      return get(req, res);
    case 'PUT':
      return put(req, res);
    case 'PATCH':
    case 'DELETE':
      return patch(req, res);
    default:
      return res.status(405);
  }
};
