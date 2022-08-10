import { Device } from '@prisma/client';

const randomHex = (length: number): string => {
  return [...Array(length)].map(() => Math.floor(Math.random() * 16).toString(16)).join('');
};

export const createMockDevice = () => ({
  dongleId: randomHex(6),
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
