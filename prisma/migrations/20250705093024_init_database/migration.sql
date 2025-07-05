-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('ADMIN', 'USER');

-- CreateTable
CREATE TABLE "User" (
    "user_id" SERIAL NOT NULL,
    "first_name" TEXT,
    "last_name" TEXT,
    "national_id" TEXT,
    "birth_date" TIMESTAMP(3),
    "address" TEXT,
    "phone_number" TEXT,
    "email" TEXT,
    "hn_number" TEXT,
    "line_user_id" TEXT,
    "role" "UserRole" NOT NULL DEFAULT 'USER',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("user_id")
);

-- CreateTable
CREATE TABLE "Diary" (
    "diary_id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "diary_date" TIMESTAMP(3) NOT NULL,
    "symptoms" TEXT,
    "pain_level" INTEGER,
    "breakfast_description" TEXT,
    "lunch_description" TEXT,
    "dinner_description" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Diary_pkey" PRIMARY KEY ("diary_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_national_id_key" ON "User"("national_id");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_hn_number_key" ON "User"("hn_number");

-- CreateIndex
CREATE UNIQUE INDEX "User_line_user_id_key" ON "User"("line_user_id");

-- CreateIndex
CREATE INDEX "User_national_id_idx" ON "User"("national_id");

-- CreateIndex
CREATE INDEX "User_hn_number_idx" ON "User"("hn_number");

-- CreateIndex
CREATE INDEX "User_line_user_id_idx" ON "User"("line_user_id");

-- CreateIndex
CREATE INDEX "User_email_idx" ON "User"("email");

-- CreateIndex
CREATE INDEX "User_role_idx" ON "User"("role");

-- CreateIndex
CREATE INDEX "Diary_user_id_idx" ON "Diary"("user_id");

-- CreateIndex
CREATE INDEX "Diary_diary_date_idx" ON "Diary"("diary_date");

-- CreateIndex
CREATE UNIQUE INDEX "Diary_user_id_diary_date_key" ON "Diary"("user_id", "diary_date");

-- AddForeignKey
ALTER TABLE "Diary" ADD CONSTRAINT "Diary_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("user_id") ON DELETE CASCADE ON UPDATE CASCADE;
