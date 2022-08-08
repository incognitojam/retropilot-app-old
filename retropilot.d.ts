// A dongle ID is an 16-character alphanumeric device identifier. Each comma device has a unique dongle ID.
type DongleID = string;

/**
 * A route is a sequence of segments recorded between car ignition and power-down.
 *
 * Route names are of the form `dongle_id|YYYY-MM-DD--HH-MM-SS`.
 * For example, `0375fdf7b1ce594d|2019-05-21--23-17-14`.
 */
type RouteName = `${DongleID}|${number}-${number}-${number}--${number}-${number}-${number}`;

/**
 * A segment is one minute of driving. openpilot rotates log and camera files at this interval
 * Segments are numbered in a 0-indexed fashion.
 *
 * Segment names are of the form `dongle_id|YYYY-MM-DD--HH-MM-SS--N` where N is the segment number.
 * For example, `0375fdf7b1ce594d|2019-05-21--23-17-14--0`.
 */
type SegmentName = `${Route}--${number}`;

namespace Api {
  type ErrorResponse = {
    error: string;
    message: string;
    statusCode: number;
  };

  type Response<T> = T | ErrorResponse;

  enum PrimeType {
    None = 0,
    Magenta = 1,
    Lite = 2,
    Blue = 3,
    MagentaNew = 4,
  }

  interface Device {
    dongle_id: DongleID;
    // Device nickname
    alias: string;
    // Device serial
    serial: string;
    // Device has an owner
    is_paired: boolean;
    // 2048-bit public RSA key
    public_key: string;
    // Prime type: 0 - no prime, 1 - standard prime, 2 - prime lite
    prime_type: PrimeType;
  }

  interface DrivingStatisticsPeriod {
    // Total miles driven in time period
    distance: number;
    // Total minutes driven in time period
    minutes: number;
    // Count of routes in time period
    routes: number;
  }

  interface DrivingStatistics {
    all: DrivingStatisticsPeriod;
    week: DrivingStatisticsPeriod;
  }
}
