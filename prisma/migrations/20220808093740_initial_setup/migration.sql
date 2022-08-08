-- CreateTable
CREATE TABLE "Account" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "provider" TEXT NOT NULL,
    "providerAccountId" TEXT NOT NULL,
    "refresh_token" TEXT,
    "access_token" TEXT,
    "expires_at" INTEGER,
    "token_type" TEXT,
    "scope" TEXT,
    "id_token" TEXT,
    "session_state" TEXT,

    CONSTRAINT "Account_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Session" (
    "id" TEXT NOT NULL,
    "sessionToken" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Session_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "emailVerifiedAt" TIMESTAMP(3),
    "banned" BOOLEAN NOT NULL DEFAULT false,
    "admin" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "VerificationToken" (
    "identifier" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL
);

-- CreateTable
CREATE TABLE "Device" (
    "dongleId" VARCHAR(36) NOT NULL,
    "pairedUserId" TEXT,
    "nickname" VARCHAR(20),
    "imei" TEXT,
    "serial" TEXT,
    "deviceType" TEXT,
    "publicKey" TEXT,
    "storageUsage" INTEGER,
    "maxStorageUsage" INTEGER,
    "ignoringUploads" BOOLEAN,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "lastPingAt" TIMESTAMP(3) NOT NULL
);

-- CreateTable
CREATE TABLE "DriveSegment" (
    "id" TEXT NOT NULL,
    "segmentNum" INTEGER NOT NULL,
    "driveIdentifier" VARCHAR(20) NOT NULL,
    "dongleId" VARCHAR(36) NOT NULL,
    "durationSeconds" DOUBLE PRECISION,
    "distanceMeters" INTEGER,
    "filesizeBytes" INTEGER,
    "timestamp" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "lastUploadAt" TIMESTAMP(3),
    "processAttemptCount" SMALLINT NOT NULL DEFAULT 0,
    "processedAt" TIMESTAMP(3),

    CONSTRAINT "DriveSegment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Drive" (
    "dongleId" VARCHAR(36) NOT NULL,
    "identifier" VARCHAR(20) NOT NULL,
    "segmentCount" INTEGER,
    "durationSeconds" DOUBLE PRECISION,
    "distanceMeters" DOUBLE PRECISION,
    "filesizeBytes" INTEGER,
    "metadata" TEXT,
    "timestamp" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "lastUploadAt" TIMESTAMP(3),
    "uploadCompletedAt" TIMESTAMP(3),
    "processedAt" TIMESTAMP(3),
    "preservedAt" TIMESTAMP(3),
    "archivedAt" TIMESTAMP(3),
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "Drive_pkey" PRIMARY KEY ("dongleId","identifier")
);

-- CreateIndex
CREATE UNIQUE INDEX "Account_provider_providerAccountId_key" ON "Account"("provider", "providerAccountId");

-- CreateIndex
CREATE UNIQUE INDEX "Session_sessionToken_key" ON "Session"("sessionToken");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "VerificationToken_token_key" ON "VerificationToken"("token");

-- CreateIndex
CREATE UNIQUE INDEX "VerificationToken_identifier_token_key" ON "VerificationToken"("identifier", "token");

-- CreateIndex
CREATE UNIQUE INDEX "Device_dongleId_key" ON "Device"("dongleId");

-- CreateIndex
CREATE UNIQUE INDEX "DriveSegment_dongleId_driveIdentifier_segmentNum_key" ON "DriveSegment"("dongleId", "driveIdentifier", "segmentNum");

-- AddForeignKey
ALTER TABLE "Account" ADD CONSTRAINT "Account_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Session" ADD CONSTRAINT "Session_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Device" ADD CONSTRAINT "Device_pairedUserId_fkey" FOREIGN KEY ("pairedUserId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DriveSegment" ADD CONSTRAINT "DriveSegment_driveIdentifier_dongleId_fkey" FOREIGN KEY ("driveIdentifier", "dongleId") REFERENCES "Drive"("identifier", "dongleId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DriveSegment" ADD CONSTRAINT "DriveSegment_dongleId_fkey" FOREIGN KEY ("dongleId") REFERENCES "Device"("dongleId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Drive" ADD CONSTRAINT "Drive_dongleId_fkey" FOREIGN KEY ("dongleId") REFERENCES "Device"("dongleId") ON DELETE RESTRICT ON UPDATE CASCADE;
