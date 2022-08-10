import type { NextApiRequest, NextApiResponse } from 'next';
import { sha256 } from 'js-sha256';
import config from '../../../../lib/config';
import prisma from '../../../../lib/prisma';

type UploadUrlResponse = {
  url: string;
};

/**
 * GET /v1.4/:dongleId/upload_url
 *
 * Upload URL
 *
 * Request a URL to which an openpilot file can be uploaded via PUT request. This endpoint only
 * accepts tokens signed with a device private key. (openpilot 0.6.3 and newer.)
 */
export default async (req: NextApiRequest, res: NextApiResponse<Api.Response<UploadUrlResponse>>) => {
  if (req.method !== 'GET') {
    res.setHeader('Allow', ['GET']);
    res.status(405).json({
      code: 405,
      error: 'Method Not Allowed',
      details: `This endpoint does not support ${req.method} requests.`,
    });
    return;
  }

  const dongleId = req.query.dongleId as string;
  let path = req.query.path as string;

  const device = await prisma.device.findFirst({ where: { dongleId } });
  if (!device) {
    res.status(404).json({
      code: 404,
      error: 'Not Found',
      details: 'Device not found',
    });
    return;
  }

  const ts = Date.now();
  const dongleHash: string = sha256.hmac.create(process.env.APP_SALT as string).update(dongleId as string).hex();
  let uploadDirectory: string = `${dongleId}/${dongleHash}/`;
  let uploadFilename: string;
  let uploadToken: string;

  if (path.indexOf('boot/') === 0 || path.indexOf('crash/') === 0 || path.indexOf('bootlog.bz2') > 0) {
    if (path && path.indexOf('bootlog.bz2') > 0) { // pre-op 0.8 way of uploading bootlogs
      // file 2020-09-30--08-09-13--0/bootlog.bz2 to something like: boot/2021-05-11--03-03-38.bz2
      let chunks = path.split('--');
      path = `boot/${chunks[0]}--${chunks[1]}.bz2`;
    }

    // TODO, allow multiple types
    const uploadFileType = path.indexOf('boot/') === 0 ? 'boot' : 'crash';

    uploadDirectory += `${uploadFileType}`;
    uploadFilename = path.replace('/', '-');
  } else {
    // "2021-04-12--01-44-25--0/qlog.bz2" for example
    const [
      ,
      driveIdentifier,
      ,
      ,
      ,
      ,
      ,
      ,
      segment,
      filename,
    ] = <string[]>path.split(/((\d{4})-(\d{2})-(\d{2})--(\d{2})-(\d{2})-(\d{2}))--(\d+)\/(\w+\.bz2)/);

    const VALID_FILES = ['fcamera.hevc', 'qcamera.ts', 'dcamera.hevc', 'rlog.bz2', 'qlog.bz2', 'ecamera.hevc'];
    if (VALID_FILES.indexOf(filename) === -1 || Number.isNaN(segment)) {
      console.error(filename, segment, VALID_FILES.indexOf(filename) === -1, Number.isNaN(segment));
      res.status(400).json({
        code: 400,
        error: 'Bad Request',
      });
      return;
    }

    const driveHash: string = sha256.hmac.create(process.env.APP_SALT as string).update(driveIdentifier).hex();

    uploadDirectory += `${driveHash}/${driveIdentifier}/${segment}`;
    uploadFilename = filename;

    const existingDrive = await prisma.drive.findFirst({ where: { dongleId, identifier: driveIdentifier } });

    if (existingDrive) {
      /* eslint-disable camelcase */
      await prisma.drive.update({
        where: { dongleId_identifier: {dongleId, identifier: driveIdentifier} },
        data: {
          segmentCount: Math.max(existingDrive.segmentCount ?? 0, parseInt(segment)),
          uploadCompletedAt: null,
          processedAt: null,
          lastUploadAt: new Date(),
        },
      });
      /* eslint-enable camelcase */
    } else {
      await prisma.drive.create({
        data: {
          dongleId,
          identifier: driveIdentifier,
          segmentCount: parseInt(segment),
          lastUploadAt: new Date(),
        },
      });
    }

    const existingSegment = await prisma.driveSegment.findFirst({
      where: { dongleId, segmentNum: parseInt(segment), driveIdentifier },
    });

    if (!existingSegment) {
      await prisma.driveSegment.create({
        data: {
          dongleId,
          driveIdentifier,
          segmentNum: parseInt(segment),
        },
      });
    }
  }

  uploadToken = sha256.hmac.create(process.env.APP_SALT as string).update(dongleId + uploadFilename + ts).hex();

  res.json({
    url: `${config.baseUrl}/api/?filename=${uploadFilename}&dir=${uploadDirectory}&dongleId=${dongleId}&ts=${ts}&token=${uploadToken}`,
  });
};
