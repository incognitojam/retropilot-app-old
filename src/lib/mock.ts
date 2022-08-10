import { Device } from '@prisma/client';

export const createMockDevice = () => ({
  dongleId: 'abc123',
  pairedUserId: null,
  nickname: 'My comma three',
  imei: '123456789012345',
  serial: '123456789012345',
  deviceType: 'tici',
  publicKey: '',
  storageUsage: 0,
  maxStorageUsage: null,
  ignoringUploads: false,
  createdAt: new Date(),
  updatedAt: new Date(),
  lastPingAt: new Date(),
} as Device);
