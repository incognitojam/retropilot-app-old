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
  res.status(501).end('Not Implemented');
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
  res.status(501).end('Not Implemented');
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
  res.status(501).end('Not Implemented');
};


// /v1/navigation/:dongleId/locations
export default (req: NextApiRequest, res: NextApiResponse) => {
  switch (req.method) {
    case 'GET':
      get(req, res);
      break;
    case 'PUT':
      put(req, res);
      break;
    case 'PATCH':
    case 'DELETE':
      patch(req, res);
      break;
    default:
      res.setHeader('Allow', ['GET', 'PUT', 'PATCH', 'DELETE']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};
